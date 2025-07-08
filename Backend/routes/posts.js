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
    // Allow only specific image and video formats
    const allowedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only .jpg, .jpeg, .png, .webp, .mp4, .webm files are allowed!"
        ),
        false
      );
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
        // Use absolute URL with BASE_URL from environment
        const mediaUrl = `${
          process.env.BASE_URL || "http://localhost:5000"
        }/uploads/posts/${file.filename}`;

        await client.query(
          "INSERT INTO post_media (post_id, media_type, media_url) VALUES ($1, $2, $3)",
          [postId, mediaType, mediaUrl]
        );
      }
    }

    // Insert poll options if present
    if (pollOptions) {
      let parsedPollOptions;

      // Handle both JSON string and array formats
      if (typeof pollOptions === "string") {
        try {
          parsedPollOptions = JSON.parse(pollOptions);
        } catch (parseError) {
          console.warn("Invalid poll options JSON:", pollOptions);
          parsedPollOptions = [];
        }
      } else if (Array.isArray(pollOptions)) {
        parsedPollOptions = pollOptions;
      } else {
        parsedPollOptions = [];
      }

      if (Array.isArray(parsedPollOptions) && parsedPollOptions.length > 0) {
        for (const option of parsedPollOptions) {
          if (option && typeof option === "string" && option.trim()) {
            await client.query(
              "INSERT INTO post_polls (post_id, option_text) VALUES ($1, $2)",
              [postId, option.trim()]
            );
          }
        }
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
        COUNT(*) OVER() as total_count,
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
        COALESCE(
          ARRAY_AGG(
            CASE WHEN pp.poll_id IS NOT NULL THEN
              json_build_object(
                'poll_id', pp.poll_id,
                'option_text', pp.option_text
              )
            END
          ) FILTER (WHERE pp.poll_id IS NOT NULL),
          '{}'
        ) as poll_options,
        COUNT(DISTINCT pr.reaction_id) as reaction_count,
        COUNT(DISTINCT pc.comment_id) as comment_count,
        COUNT(DISTINCT ps.share_id) as share_count
      FROM posts p
      LEFT JOIN post_media pm ON p.post_id = pm.post_id
      LEFT JOIN post_polls pp ON p.post_id = pp.post_id
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

    // First check if posts table exists
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'posts'
      );
    `;

    const tableExists = await pool.query(tableExistsQuery);

    if (!tableExists.rows[0].exists) {
      return res.json({
        success: true,
        data: [],
        message: "Posts table not found. Please run database migrations.",
      });
    }

    const postsQuery = `
      SELECT 
        p.post_id,
        p.content,
        p.created_at,
        COUNT(*) OVER() as total_count,
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
        COALESCE(
          ARRAY_AGG(
            CASE WHEN pp.poll_id IS NOT NULL THEN
              json_build_object(
                'poll_id', pp.poll_id,
                'option_text', pp.option_text
              )
            END
          ) FILTER (WHERE pp.poll_id IS NOT NULL),
          '{}'
        ) as poll_options,
        COUNT(DISTINCT pr.reaction_id) as reaction_count,
        COUNT(DISTINCT pc.comment_id) as comment_count,
        COUNT(DISTINCT ps.share_id) as share_count
      FROM posts p
      LEFT JOIN post_media pm ON p.post_id = pm.post_id
      LEFT JOIN post_polls pp ON p.post_id = pp.post_id
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

    // Add user details to each post (since these are all from the same user)
    const userDetails = await getUserDetails(req.user.role, req.user.id);

    const postsWithUserDetails = result.rows.map((post) => ({
      ...post,
      user: userDetails,
      userType: req.user.role,
    }));

    res.json({
      success: true,
      data: postsWithUserDetails,
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);

    // If the error is about missing tables, return empty array
    if (
      error.message.includes("relation") &&
      error.message.includes("does not exist")
    ) {
      return res.json({
        success: true,
        data: [],
        message: "Posts tables not found. Please run database migrations.",
      });
    }

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

    // Validate reaction type
    const validReactionTypes = ["like", "love", "share", "wow", "sad"];
    if (!validReactionTypes.includes(reactionType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reaction type",
      });
    }

    // Check if post exists
    const postExists = await pool.query(
      "SELECT post_id FROM posts WHERE post_id = $1",
      [postId]
    );

    if (postExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user already reacted to this post and update/insert accordingly
    // TODO: Replace with UPSERT once unique constraints are added via migration
    const existingReaction = await pool.query(
      `SELECT reaction_id FROM post_reactions WHERE post_id = $1 AND ${userInfo.column} = $2`,
      [postId, userInfo.value]
    );

    let result;
    if (existingReaction.rows.length > 0) {
      // Update existing reaction
      result = await pool.query(
        `UPDATE post_reactions SET reaction_type = $1, created_at = CURRENT_TIMESTAMP 
         WHERE reaction_id = $2 RETURNING reaction_id, reaction_type`,
        [reactionType, existingReaction.rows[0].reaction_id]
      );
    } else {
      // Create new reaction
      result = await pool.query(
        `INSERT INTO post_reactions (post_id, reaction_type, ${userInfo.column}) 
         VALUES ($1, $2, $3) RETURNING reaction_id, reaction_type`,
        [postId, reactionType, userInfo.value]
      );
    }

    res.json({
      success: true,
      message: "Reaction updated successfully",
      data: {
        reactionId: result.rows[0].reaction_id,
        reactionType: result.rows[0].reaction_type,
      },
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

// Remove reaction from a post
router.delete("/:postId/react", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userInfo = getUserTypeAndId(req.user);

    const deleteResult = await pool.query(
      `DELETE FROM post_reactions WHERE post_id = $1 AND ${userInfo.column} = $2 RETURNING reaction_id`,
      [postId, userInfo.value]
    );

    if (deleteResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reaction found to remove",
      });
    }

    res.json({
      success: true,
      message: "Reaction removed successfully",
    });
  } catch (error) {
    console.error("Error removing reaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove reaction",
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
      try {
        // Handle both absolute and relative URLs
        let filePath;
        if (media.media_url.startsWith("http")) {
          // Extract filename from absolute URL
          const urlParts = media.media_url.split("/");
          const filename = urlParts[urlParts.length - 1];
          filePath = path.join(__dirname, "..", "uploads", "posts", filename);
        } else {
          // Handle relative path
          filePath = path.join(__dirname, "..", media.media_url);
        }

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted media file: ${filePath}`);
        } else {
          console.warn(`Media file not found: ${filePath}`);
        }
      } catch (fileError) {
        console.error(
          `Error deleting media file ${media.media_url}:`,
          fileError
        );
        // Don't fail the entire operation if file deletion fails
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

// Add a comment to a post
router.post("/:postId/comment", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userInfo = getUserTypeAndId(req.user);

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required",
      });
    }

    // Check if post exists
    const postExists = await pool.query(
      "SELECT post_id FROM posts WHERE post_id = $1",
      [postId]
    );

    if (postExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Insert comment
    const commentQuery = `
      INSERT INTO post_comments (post_id, content, ${userInfo.column})
      VALUES ($1, $2, $3)
      RETURNING comment_id, content, created_at
    `;

    const result = await pool.query(commentQuery, [
      postId,
      content.trim(),
      userInfo.value,
    ]);

    // Get user details for the comment
    const userDetails = await getUserDetails(req.user.role, req.user.id);

    res.json({
      success: true,
      message: "Comment added successfully",
      data: {
        ...result.rows[0],
        user: userDetails,
        userType: req.user.role,
      },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
});

// Get comments for a post
router.get("/:postId/comments", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    // Check if post exists
    const postExists = await pool.query(
      "SELECT post_id FROM posts WHERE post_id = $1",
      [postId]
    );

    if (postExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const commentsQuery = `
      SELECT 
        pc.comment_id,
        pc.content,
        pc.created_at,
        pc.student_id,
        pc.college_id,
        pc.industry_id,
        pc.alumni_id,
        pc.startup_id,
        COUNT(*) OVER() as total_count
      FROM post_comments pc
      WHERE pc.post_id = $1
      ORDER BY pc.created_at ASC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(commentsQuery, [postId, limit, offset]);

    // Get user details for each comment
    const commentsWithUserDetails = await Promise.all(
      result.rows.map(async (comment) => {
        let userDetails = null;
        let userType = null;
        let userId = null;

        // Determine which user type created this comment
        if (comment.student_id) {
          userType = "student";
          userId = comment.student_id;
        } else if (comment.college_id) {
          userType = "college";
          userId = comment.college_id;
        } else if (comment.industry_id) {
          userType = "industry";
          userId = comment.industry_id;
        } else if (comment.alumni_id) {
          userType = "alumni";
          userId = comment.alumni_id;
        } else if (comment.startup_id) {
          userType = "startup";
          userId = comment.startup_id;
        }

        if (userType && userId) {
          userDetails = await getUserDetails(userType, userId);
        }

        return {
          ...comment,
          user: userDetails,
          userType,
        };
      })
    );

    res.json({
      success: true,
      data: commentsWithUserDetails,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
});

// Delete a comment
router.delete("/:postId/comment/:commentId", auth, async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userInfo = getUserTypeAndId(req.user);

    // Check if comment belongs to the user
    const commentCheck = await pool.query(
      `SELECT comment_id FROM post_comments WHERE comment_id = $1 AND post_id = $2 AND ${userInfo.column} = $3`,
      [commentId, postId, userInfo.value]
    );

    if (commentCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own comments",
      });
    }

    // Delete comment
    await pool.query("DELETE FROM post_comments WHERE comment_id = $1", [
      commentId,
    ]);

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete comment",
      error: error.message,
    });
  }
});

// Get a specific post by ID
router.get("/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;

    const postQuery = `
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
        COALESCE(
          ARRAY_AGG(
            CASE WHEN pp.poll_id IS NOT NULL THEN
              json_build_object(
                'poll_id', pp.poll_id,
                'option_text', pp.option_text
              )
            END
          ) FILTER (WHERE pp.poll_id IS NOT NULL),
          '{}'
        ) as poll_options,
        COUNT(DISTINCT pr.reaction_id) as reaction_count,
        COUNT(DISTINCT pc.comment_id) as comment_count,
        COUNT(DISTINCT ps.share_id) as share_count
      FROM posts p
      LEFT JOIN post_media pm ON p.post_id = pm.post_id
      LEFT JOIN post_polls pp ON p.post_id = pp.post_id
      LEFT JOIN post_reactions pr ON p.post_id = pr.post_id
      LEFT JOIN post_comments pc ON p.post_id = pc.post_id
      LEFT JOIN post_shares ps ON p.post_id = ps.post_id
      WHERE p.post_id = $1
      GROUP BY p.post_id
    `;

    const result = await pool.query(postQuery, [postId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const post = result.rows[0];
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

    res.json({
      success: true,
      data: {
        ...post,
        user: userDetails,
        userType,
      },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
      error: error.message,
    });
  }
});

module.exports = router;
