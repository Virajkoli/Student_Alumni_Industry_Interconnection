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

      // Create Post First
      const newPost = await prisma.post.create({
        data: {
          content: content.trim(),
          title: title || null,
          authorId: userId,
          authorType: role.toUpperCase(),
        },
      });

      // Add Media if any
      if (req.files && req.files.length > 0) {
        const mediaData = req.files.map((file) => ({
          post_id: newPost.post_id,
          media_url: file.path, // ✅ No braces
          media_type: "image", // ✅ You can add logic for file type here
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
    const { reactionType } = req.body;

    // For now, just return a placeholder response
    res.status(200).json({
      success: true,
      message: "Reaction feature will be implemented with full post system",
      data: {
        postId: parseInt(id),
        reactionType,
      },
    });
  } catch (error) {
    console.error("React to post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to react to post",
      error: error.message,
    });
  }
});

module.exports = router;
