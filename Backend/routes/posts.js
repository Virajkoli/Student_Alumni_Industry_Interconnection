const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { auth } = require("../middleware/auth");

// Database connection
const pool = new Pool({
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "scaips_dev",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/posts";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    // Allow images and videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed!"), false);
    }
  },
});

// Helper function to determine user type and ID from token
function getUserTypeAndId(user) {
  switch (user.role) {
    case "student":
      return { column: "student_id", value: user.id };
    case "college":
      return { column: "college_id", value: user.id };
    case "industry":
      return { column: "industry_id", value: user.id };
    case "alumni":
      return { column: "alumni_id", value: user.id };
    case "startup":
      return { column: "startup_id", value: user.id };
    default:
      throw new Error("Invalid user role");
  }
}

// Helper function to get user details based on type
async function getUserDetails(userType, userId) {
  let query;
  let tableName;

  switch (userType) {
    case "student":
      tableName = "students";
      query = `
        SELECT id, first_name, last_name, 
               CONCAT(first_name, ' ', last_name) as full_name,
               email, profile_pic
        FROM students WHERE id = $1
      `;
      break;
    case "college":
      tableName = "college";
      query = `
        SELECT id, name as full_name, email, avatar, 'college' as role
        FROM college WHERE id = $1
      `;
      break;
    case "industry":
      tableName = "industry";
      query = `
        SELECT id, company_name as full_name, email, avatar, 'industry' as role
        FROM industry WHERE id = $1
      `;
      break;
    case "alumni":
      tableName = "alumni";
      query = `
        SELECT id, first_name, last_name,
               CONCAT(first_name, ' ', last_name) as full_name,
               email, avatar, 'alumni' as role
        FROM alumni WHERE id = $1
      `;
      break;
    case "startup":
      tableName = "startup";
      query = `
        SELECT id, company_name as full_name, email, avatar, 'startup' as role
        FROM startup WHERE id = $1
      `;
      break;
    default:
      throw new Error("Invalid user type");
  }

  const result = await pool.query(query, [userId]);
  return result.rows[0];
}

// Create a new post
router.post("/", auth, upload.array("media", 5), async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { content, pollOptions } = req.body;
    const userInfo = getUserTypeAndId(req.user);

    if (!content && (!req.files || req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Post must have content or media",
      });
    }

    // Insert post
    const postQuery = `
      INSERT INTO posts (content, ${userInfo.column})
      VALUES ($1, $2)
      RETURNING post_id, created_at
    `;

    const postResult = await client.query(postQuery, [
      content || "",
      userInfo.value,
    ]);
    const postId = postResult.rows[0].post_id;

    // Insert media if present
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image/")
          ? "image"
          : "video";
        const mediaUrl = `/uploads/posts/${file.filename}`;

        await client.query(
          "INSERT INTO post_media (post_id, media_type, media_url) VALUES ($1, $2, $3)",
          [postId, mediaType, mediaUrl]
        );
      }
    }

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Post created successfully",
      data: {
        postId,
        createdAt: postResult.rows[0].created_at,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  } finally {
    client.release();
  }
});

// Get posts feed (all posts or specific user's posts)
router.get("/", auth, async (req, res) => {
  try {
    const { userId, userType, limit = 20, offset = 0 } = req.query;

    let whereClause = "";
    let queryParams = [limit, offset];

    if (userId && userType) {
      const userInfo = getUserTypeAndId({ role: userType, id: userId });
      whereClause = `WHERE p.${userInfo.column} = $3`;
      queryParams.push(userInfo.value);
    }

    const postsQuery = `
      SELECT 
        p.post_id,
        p.content,
        p.created_at,
        p.student_id,
        p.college_id,
        p.industry_id,
        p.alumni_id,
        p.startup_id,
        COALESCE(
          ARRAY_AGG(
            CASE WHEN pm.media_id IS NOT NULL THEN
              json_build_object(
                'media_id', pm.media_id,
                'media_type', pm.media_type,
                'media_url', pm.media_url
              )
            END
          ) FILTER (WHERE pm.media_id IS NOT NULL),
          '{}'
        ) as media,
        COUNT(DISTINCT pr.reaction_id) as reaction_count,
        COUNT(DISTINCT pc.comment_id) as comment_count,
        COUNT(DISTINCT ps.share_id) as share_count
      FROM posts p
      LEFT JOIN post_media pm ON p.post_id = pm.post_id
      LEFT JOIN post_reactions pr ON p.post_id = pr.post_id
      LEFT JOIN post_comments pc ON p.post_id = pc.post_id
      LEFT JOIN post_shares ps ON p.post_id = ps.post_id
      ${whereClause}
      GROUP BY p.post_id
      ORDER BY p.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const postsResult = await pool.query(postsQuery, queryParams);

    // Get user details for each post
    const postsWithUserDetails = await Promise.all(
      postsResult.rows.map(async (post) => {
        let userDetails = null;
        let userType = null;
        let userId = null;

        // Determine which user type created this post
        if (post.student_id) {
          userType = "student";
          userId = post.student_id;
        } else if (post.college_id) {
          userType = "college";
          userId = post.college_id;
        } else if (post.industry_id) {
          userType = "industry";
          userId = post.industry_id;
        } else if (post.alumni_id) {
          userType = "alumni";
          userId = post.alumni_id;
        } else if (post.startup_id) {
          userType = "startup";
          userId = post.startup_id;
        }

        if (userType && userId) {
          userDetails = await getUserDetails(userType, userId);
        }

        return {
          ...post,
          user: userDetails,
          userType,
        };
      })
    );

    res.json({
      success: true,
      data: postsWithUserDetails,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

// Get current user's posts
router.get("/my-posts", auth, async (req, res) => {
  try {
    const userInfo = getUserTypeAndId(req.user);
    const { limit = 20, offset = 0 } = req.query;

    const postsQuery = `
      SELECT 
        p.post_id,
        p.content,
        p.created_at,
        COALESCE(
          ARRAY_AGG(
            CASE WHEN pm.media_id IS NOT NULL THEN
              json_build_object(
                'media_id', pm.media_id,
                'media_type', pm.media_type,
                'media_url', pm.media_url
              )
            END
          ) FILTER (WHERE pm.media_id IS NOT NULL),
          '{}'
        ) as media,
        COUNT(DISTINCT pr.reaction_id) as reaction_count,
        COUNT(DISTINCT pc.comment_id) as comment_count,
        COUNT(DISTINCT ps.share_id) as share_count
      FROM posts p
      LEFT JOIN post_media pm ON p.post_id = pm.post_id
      LEFT JOIN post_reactions pr ON p.post_id = pr.post_id
      LEFT JOIN post_comments pc ON p.post_id = pc.post_id
      LEFT JOIN post_shares ps ON p.post_id = ps.post_id
      WHERE p.${userInfo.column} = $1
      GROUP BY p.post_id
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(postsQuery, [
      userInfo.value,
      limit,
      offset,
    ]);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user posts",
      error: error.message,
    });
  }
});

// React to a post
router.post("/:postId/react", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { reactionType } = req.body; // 'like', 'love', 'share', 'wow', 'sad'
    const userInfo = getUserTypeAndId(req.user);

    // Check if user already reacted to this post
    const existingReaction = await pool.query(
      `SELECT reaction_id FROM post_reactions WHERE post_id = $1 AND ${userInfo.column} = $2`,
      [postId, userInfo.value]
    );

    if (existingReaction.rows.length > 0) {
      // Update existing reaction
      await pool.query(
        "UPDATE post_reactions SET reaction_type = $1 WHERE reaction_id = $2",
        [reactionType, existingReaction.rows[0].reaction_id]
      );
    } else {
      // Create new reaction
      await pool.query(
        `INSERT INTO post_reactions (post_id, reaction_type, ${userInfo.column}) VALUES ($1, $2, $3)`,
        [postId, reactionType, userInfo.value]
      );
    }

    res.json({
      success: true,
      message: "Reaction updated successfully",
    });
  } catch (error) {
    console.error("Error reacting to post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to react to post",
      error: error.message,
    });
  }
});

// Delete a post
router.delete("/:postId", auth, async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { postId } = req.params;
    const userInfo = getUserTypeAndId(req.user);

    // Check if post belongs to the user
    const postCheck = await client.query(
      `SELECT post_id FROM posts WHERE post_id = $1 AND ${userInfo.column} = $2`,
      [postId, userInfo.value]
    );

    if (postCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    // Get media files to delete
    const mediaResult = await client.query(
      "SELECT media_url FROM post_media WHERE post_id = $1",
      [postId]
    );

    // Delete post (cascade will handle related tables)
    await client.query("DELETE FROM posts WHERE post_id = $1", [postId]);

    // Delete media files from filesystem
    for (const media of mediaResult.rows) {
      const filePath = path.join(__dirname, "..", media.media_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  } finally {
    client.release();
  }
});

module.exports = router;
