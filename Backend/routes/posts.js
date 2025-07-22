const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadPostMedia } = require("../config/cloudinary");
const prisma = require("../config/prisma");

// Helper function to add interaction data to posts
const addInteractionData = async (posts, currentUserId, currentUserRole) => {
  return Promise.all(
    posts.map(async (post) => {
      // Count reactions
      const reactionCount = await prisma.post_reactions.count({
        where: { post_id: post.post_id },
      });

      // Count comments
      const commentCount = await prisma.post_comments.count({
        where: { post_id: post.post_id },
      });

      // Count shares
      const shareCount = await prisma.post_shares.count({
        where: { post_id: post.post_id },
      });

      // Check if current user has liked this post
      const userReaction = await prisma.post_reactions.findFirst({
        where: {
          post_id: post.post_id,
          [`${currentUserRole.toLowerCase()}_id`]: currentUserId,
        },
      });

      return {
        ...post,
        reaction_count: reactionCount,
        comment_count: commentCount,
        share_count: shareCount,
        liked: !!userReaction,
        user_reaction_type: userReaction?.reaction_type || null,
      };
    })
  );
};

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
    const { userId, role } = req.user;

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

    // Enhance posts with author information
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        let authorInfo = null;

        // Get author info based on role and ID
        try {
          switch (post.authorType.toLowerCase()) {
            case "student":
              authorInfo = await prisma.student.findUnique({
                where: { id: post.authorId },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName = `${authorInfo.firstName || ""} ${
                  authorInfo.lastName || ""
                }`.trim();
                authorInfo.userType = "student";
              }
              break;
            case "college":
              authorInfo = await prisma.college.findUnique({
                where: { id: post.authorId },
                select: {
                  id: true,
                  name: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName = authorInfo.name;
                authorInfo.userType = "college";
              }
              break;
            case "industry":
              authorInfo = await prisma.industry.findUnique({
                where: { id: post.authorId },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  companyName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName =
                  authorInfo.companyName ||
                  `${authorInfo.firstName || ""} ${
                    authorInfo.lastName || ""
                  }`.trim();
                authorInfo.userType = "industry";
              }
              break;
            case "startup":
              authorInfo = await prisma.startup.findUnique({
                where: { id: post.authorId },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  startupName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName =
                  authorInfo.startupName ||
                  `${authorInfo.firstName || ""} ${
                    authorInfo.lastName || ""
                  }`.trim();
                authorInfo.userType = "startup";
              }
              break;
          }
        } catch (error) {
          console.error(
            `Error fetching author info for post ${post.post_id}:`,
            error
          );
        }

        return {
          ...post,
          author: authorInfo,
        };
      })
    );

    // Add interaction data (likes, comments, shares, user's like status)
    const postsWithInteractions = await addInteractionData(
      enhancedPosts,
      userId,
      role
    );

    res.status(200).json({
      success: true,
      data: postsWithInteractions,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: postsWithInteractions.length,
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

    // Enhance posts with author information (current user)
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        let authorInfo = null;

        // Get current user's info based on role
        try {
          switch (role.toLowerCase()) {
            case "student":
              authorInfo = await prisma.student.findUnique({
                where: { id: userId },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName = `${authorInfo.firstName || ""} ${
                  authorInfo.lastName || ""
                }`.trim();
                authorInfo.userType = "student";
              }
              break;
            case "college":
              authorInfo = await prisma.college.findUnique({
                where: { id: userId },
                select: {
                  id: true,
                  name: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName = authorInfo.name;
                authorInfo.userType = "college";
              }
              break;
            case "industry":
              authorInfo = await prisma.industry.findUnique({
                where: { id: userId },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  companyName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName =
                  authorInfo.companyName ||
                  `${authorInfo.firstName || ""} ${
                    authorInfo.lastName || ""
                  }`.trim();
                authorInfo.userType = "industry";
              }
              break;
            case "startup":
              authorInfo = await prisma.startup.findUnique({
                where: { id: userId },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  startupName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName =
                  authorInfo.startupName ||
                  `${authorInfo.firstName || ""} ${
                    authorInfo.lastName || ""
                  }`.trim();
                authorInfo.userType = "startup";
              }
              break;
          }
        } catch (error) {
          console.error(`Error fetching current user info:`, error);
        }

        return {
          ...post,
          author: authorInfo,
        };
      })
    );

    // Add interaction data
    const postsWithInteractions = await addInteractionData(
      enhancedPosts,
      userId,
      role
    );

    res.status(200).json({
      success: true,
      data: postsWithInteractions,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: postsWithInteractions.length,
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

// Get posts by user ID and role
router.get("/user/:userId/:role", authMiddleware, async (req, res) => {
  try {
    const { userId, role } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    // Validate role
    const validRoles = ["STUDENT", "COLLEGE", "INDUSTRY", "STARTUP", "ALUMNI"];
    if (!validRoles.includes(role.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: parseInt(userId),
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

    // Enhance posts with author information
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        let authorInfo = null;

        // Get author info based on role and ID
        try {
          switch (role.toLowerCase()) {
            case "student":
              authorInfo = await prisma.student.findUnique({
                where: { id: parseInt(userId) },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName = `${authorInfo.firstName || ""} ${
                  authorInfo.lastName || ""
                }`.trim();
                authorInfo.userType = "student";
              }
              break;
            case "college":
              authorInfo = await prisma.college.findUnique({
                where: { id: parseInt(userId) },
                select: {
                  id: true,
                  name: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName = authorInfo.name;
                authorInfo.userType = "college";
              }
              break;
            case "industry":
              authorInfo = await prisma.industry.findUnique({
                where: { id: parseInt(userId) },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  companyName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName =
                  authorInfo.companyName ||
                  `${authorInfo.firstName || ""} ${
                    authorInfo.lastName || ""
                  }`.trim();
                authorInfo.userType = "industry";
              }
              break;
            case "startup":
              authorInfo = await prisma.startup.findUnique({
                where: { id: parseInt(userId) },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  startupName: true,
                  profilePicture: true,
                  email: true,
                },
              });
              if (authorInfo) {
                authorInfo.fullName =
                  authorInfo.startupName ||
                  `${authorInfo.firstName || ""} ${
                    authorInfo.lastName || ""
                  }`.trim();
                authorInfo.userType = "startup";
              }
              break;
          }
        } catch (error) {
          console.error(
            `Error fetching author info for user ${userId}:`,
            error
          );
        }

        return {
          ...post,
          author: authorInfo,
        };
      })
    );

    // Add interaction data for the requesting user
    const { userId: requestingUserId, role: requestingUserRole } = req.user;
    const postsWithInteractions = await addInteractionData(
      enhancedPosts,
      requestingUserId,
      requestingUserRole
    );

    res.status(200).json({
      success: true,
      data: postsWithInteractions,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: postsWithInteractions.length,
      },
    });
  } catch (error) {
    console.error("Get user posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user posts",
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
    });

    // Enhance reactions with author information
    const enhancedReactions = await Promise.all(
      reactions.map(async (reaction) => {
        let authorInfo = null;

        // Determine which user type and get their info
        if (reaction.student_id) {
          authorInfo = await prisma.student.findUnique({
            where: { id: reaction.student_id },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName = `${authorInfo.firstName || ""} ${
              authorInfo.lastName || ""
            }`.trim();
            authorInfo.userType = "student";
          }
        } else if (reaction.college_id) {
          authorInfo = await prisma.college.findUnique({
            where: { id: reaction.college_id },
            select: { id: true, name: true, profilePicture: true },
          });
          if (authorInfo) {
            authorInfo.fullName = authorInfo.name;
            authorInfo.userType = "college";
          }
        } else if (reaction.industry_id) {
          authorInfo = await prisma.industry.findUnique({
            where: { id: reaction.industry_id },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              companyName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName =
              authorInfo.companyName ||
              `${authorInfo.firstName || ""} ${
                authorInfo.lastName || ""
              }`.trim();
            authorInfo.userType = "industry";
          }
        } else if (reaction.startup_id) {
          authorInfo = await prisma.startup.findUnique({
            where: { id: reaction.startup_id },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              startupName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName =
              authorInfo.startupName ||
              `${authorInfo.firstName || ""} ${
                authorInfo.lastName || ""
              }`.trim();
            authorInfo.userType = "startup";
          }
        } else if (reaction.alumni_id) {
          authorInfo = await prisma.alumni.findUnique({
            where: { id: reaction.alumni_id },
          });
          if (authorInfo) {
            authorInfo.fullName = "Alumni User";
            authorInfo.userType = "alumni";
          }
        }

        return {
          ...reaction,
          author: authorInfo,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: enhancedReactions,
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
    });

    // Enhance comments with author information
    const enhancedComments = await Promise.all(
      comments.map(async (comment) => {
        let authorInfo = null;

        // Determine which user type and get their info
        if (comment.student_id) {
          authorInfo = await prisma.student.findUnique({
            where: { id: comment.student_id },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName = `${authorInfo.firstName || ""} ${
              authorInfo.lastName || ""
            }`.trim();
            authorInfo.userType = "student";
          }
        } else if (comment.college_id) {
          authorInfo = await prisma.college.findUnique({
            where: { id: comment.college_id },
            select: { id: true, name: true, profilePicture: true },
          });
          if (authorInfo) {
            authorInfo.fullName = authorInfo.name;
            authorInfo.userType = "college";
          }
        } else if (comment.industry_id) {
          authorInfo = await prisma.industry.findUnique({
            where: { id: comment.industry_id },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              companyName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName =
              authorInfo.companyName ||
              `${authorInfo.firstName || ""} ${
                authorInfo.lastName || ""
              }`.trim();
            authorInfo.userType = "industry";
          }
        } else if (comment.startup_id) {
          authorInfo = await prisma.startup.findUnique({
            where: { id: comment.startup_id },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              startupName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName =
              authorInfo.startupName ||
              `${authorInfo.firstName || ""} ${
                authorInfo.lastName || ""
              }`.trim();
            authorInfo.userType = "startup";
          }
        } else if (comment.alumni_id) {
          authorInfo = await prisma.alumni.findUnique({
            where: { id: comment.alumni_id },
          });
          if (authorInfo) {
            authorInfo.fullName = "Alumni User";
            authorInfo.userType = "alumni";
          }
        }

        return {
          ...comment,
          author: authorInfo,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: enhancedComments,
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

    // Get author info for the new comment
    let authorInfo = null;
    try {
      switch (role.toLowerCase()) {
        case "student":
          authorInfo = await prisma.student.findUnique({
            where: { id: userId },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName = `${authorInfo.firstName || ""} ${
              authorInfo.lastName || ""
            }`.trim();
            authorInfo.userType = "student";
          }
          break;
        case "college":
          authorInfo = await prisma.college.findUnique({
            where: { id: userId },
            select: { id: true, name: true, profilePicture: true },
          });
          if (authorInfo) {
            authorInfo.fullName = authorInfo.name;
            authorInfo.userType = "college";
          }
          break;
        case "industry":
          authorInfo = await prisma.industry.findUnique({
            where: { id: userId },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              companyName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName =
              authorInfo.companyName ||
              `${authorInfo.firstName || ""} ${
                authorInfo.lastName || ""
              }`.trim();
            authorInfo.userType = "industry";
          }
          break;
        case "startup":
          authorInfo = await prisma.startup.findUnique({
            where: { id: userId },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              startupName: true,
              profilePicture: true,
            },
          });
          if (authorInfo) {
            authorInfo.fullName =
              authorInfo.startupName ||
              `${authorInfo.firstName || ""} ${
                authorInfo.lastName || ""
              }`.trim();
            authorInfo.userType = "startup";
          }
          break;
      }
    } catch (error) {
      console.error("Error fetching comment author info:", error);
    }

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: {
        ...newComment,
        author: authorInfo,
      },
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

router.delete(
  "/:postId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
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
  }
);

module.exports = router;
