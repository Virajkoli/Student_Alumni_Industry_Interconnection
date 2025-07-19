const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadPostMedia } = require("../config/cloudinary");
const prisma = require("../config/prisma");

// Create a new post
router.post(
  "/",
  authMiddleware,
  uploadPostMedia.array("media", 10),
  async (req, res) => {
    try {
      const { userId, role } = req.user;
      const { content, title } = req.body;

      if (!content || !content.trim()) {
        return res
          .status(400)
          .json({ success: false, message: "Content is required" });
      }

      // Prepare data object with common fields
      const postData = {
        content: content.trim(),
        title: title || null,
        authorId: userId,
        authorType: role.toUpperCase(),
      };

      // Add respective foreign key based on role
      switch (role.toLowerCase()) {
        case "student":
          postData.student_id = userId;
          break;
        case "alumni":
          postData.alumni_id = userId;
          break;
        case "college":
          postData.college_id = userId;
          break;
        case "industry":
          postData.industry_id = userId;
          break;
        case "startup":
          postData.startup_id = userId;
          break;
      }

      // Create Post
      const newPost = await prisma.post.create({
        data: postData,
      });

      // Handle Media if present
      if (req.files && req.files.length > 0) {
        const mediaData = req.files.map((file) => ({
          post_id: newPost.post_id,
          media_url: file.path,
          media_type: "image", // You can improve this by checking file.mimetype
        }));

        await prisma.post_media.createMany({ data: mediaData });
      }

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newPost,
      });
    } catch (error) {
      console.error("Create post error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create post",
        error: error.message,
      });
    }
  }
);

// Get all posts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const posts = await prisma.post.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post_media: true, // ✅ Include related media
        post_reactions: true,
        post_comments: true,
        post_shares: true,
      },
    });

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: posts.length,
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get posts",
      error: error.message,
    });
  }
});

// Get current user's posts
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { limit = 10, offset = 0 } = req.query;

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        authorType: role.toUpperCase(),
      },
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post_media: true, // ✅ Include related media
        post_reactions: true,
        post_comments: true,
        post_shares: true,
      },
    });

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: posts.length,
      },
    });
  } catch (error) {
    console.error("Get my posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get your posts",
      error: error.message,
    });
  }
});

// Get a specific post
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        post_media: true, // ✅ Include related media
        post_reactions: true,
        post_comments: true,
        post_shares: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get post",
      error: error.message,
    });
  }
});

// Update a post
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    const { content, title } = req.body;

    // Check if post exists and belongs to user
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (
      existingPost.authorId !== userId ||
      existingPost.authorType !== role.toUpperCase()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own posts",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        content: content || existingPost.content,
        title: title !== undefined ? title : existingPost.title,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
});

// Delete a post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    // Check if post exists and belongs to user
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (
      existingPost.authorId !== userId ||
      existingPost.authorType !== role.toUpperCase()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
});

// React to a post (placeholder for future implementation)
router.post("/:id/react", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    const { reactionType = "like" } = req.body;

    // Check if already reacted
    const existingReaction = await prisma.post_reactions.findFirst({
      where: {
        post_id: parseInt(id),
        reaction_type: reactionType,
        [`${role.toLowerCase()}_id`]: userId,
      },
    });

    if (existingReaction) {
      // Unlike (Delete Reaction)
      await prisma.post_reactions.delete({
        where: { reaction_id: existingReaction.reaction_id },
      });

      return res.status(200).json({
        success: true,
        message: "Reaction removed",
        action: "unliked",
      });
    } else {
      // Add Reaction
      const reactionData = {
        post_id: parseInt(id),
        reaction_type: reactionType,
        [`${role.toLowerCase()}_id`]: userId,
      };

      await prisma.post_reactions.create({ data: reactionData });

      return res.status(201).json({
        success: true,
        message: "Reaction added",
        action: "liked",
      });
    }
  } catch (error) {
    console.error("React to post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to react to post",
      error: error.message,
    });
  }
});

router.get("/:id/reactions", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const reactions = await prisma.post_reactions.findMany({
      where: { post_id: parseInt(id) },
      include: {
        alumni: true,
        // Add other relations if needed (student, industry, etc.)
      },
    });

    res.status(200).json({
      success: true,
      data: reactions,
    });
  } catch (error) {
    console.error("Get post reactions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get post reactions",
      error: error.message,
    });
  }
});

router.get("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const comments = await prisma.post_comments.findMany({
      where: { post_id: parseInt(id) },
      orderBy: { created_at: "desc" },
      take: parseInt(limit),
      skip: parseInt(offset),
      include: {
        alumni: true,
        // Include other relations if needed (student, industry, etc.)
      },
    });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get comments",
      error: error.message,
    });
  }
});


router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    const { commentText, mediaUrl = null } = req.body;

    if (!commentText || !commentText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const commentData = {
      post_id: parseInt(id),
      comment_text: commentText.trim(),
      media_url: mediaUrl,
      [`${role.toLowerCase()}_id`]: userId,
    };

    const newComment = await prisma.post_comments.create({ data: commentData });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
});

router.delete("/:postId/comments/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, role } = req.user;

    const comment = await prisma.post_comments.findUnique({
      where: { comment_id: parseInt(commentId) },
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment[`${role.toLowerCase()}_id`] !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own comments",
      });
    }

    await prisma.post_comments.delete({
      where: { comment_id: parseInt(commentId) },
    });

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete comment",
      error: error.message,
    });
  }
});


module.exports = router;
