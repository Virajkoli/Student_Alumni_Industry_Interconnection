const prisma = require('../config/prisma');

/**
 * Startup Profile Service
 * Service for startup profile management and related operations
 * Note: Startup-specific profile section tables don't exist yet in the schema
 * This service handles basic startup profile operations and can be extended
 */

class StartupProfileService {
  
  // =============================================
  // BASIC STARTUP PROFILE
  // =============================================
  
  async getStartupProfile(startupId) {
    try {
      const startup = await prisma.startup.findUnique({
        where: { id: startupId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          startupName: true,
          startupStage: true,
          fundingStatus: true,
          teamSize: true,
          description: true,
          location: true,
          website: true,
          contactNo: true,
          logoUrl: true,
          backgroundUrl: true,
          profilePicture: true,
          isActive: true,
          isEmailVerified: true,
          lastLogin: true,
          loginCount: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return startup;
    } catch (error) {
      throw new Error(`Failed to get startup profile: ${error.message}`);
    }
  }

  async updateStartupProfile(startupId, profileData) {
    try {
      const {
        firstName, lastName, startupName, startupStage, fundingStatus,
        teamSize, description, location, website, contactNo,
        logoUrl, backgroundUrl, profilePicture
      } = profileData;
      
      const startup = await prisma.startup.update({
        where: { id: startupId },
        data: {
          firstName,
          lastName,
          startupName,
          startupStage,
          fundingStatus,
          teamSize,
          description,
          location,
          website,
          contactNo,
          logoUrl,
          backgroundUrl,
          profilePicture,
          updatedAt: new Date()
        }
      });
      return startup;
    } catch (error) {
      throw new Error(`Failed to update startup profile: ${error.message}`);
    }
  }

  // =============================================
  // STARTUP STATISTICS AND ANALYTICS
  // =============================================
  
  async getStartupStatistics(startupId) {
    try {
      const startup = await prisma.startup.findUnique({
        where: { id: startupId }
      });
      
      if (!startup) {
        throw new Error('Startup profile not found');
      }
      
      // Get posts created by this startup
      const totalPosts = await prisma.post.count({
        where: { startup_id: startupId }
      });
      
      // Get recent posts (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentPosts = await prisma.post.count({
        where: {
          startup_id: startupId,
          createdAt: { gte: thirtyDaysAgo }
        }
      });
      
      // Calculate profile completion
      const profileFields = [
        'firstName', 'lastName', 'startupName', 'startupStage',
        'fundingStatus', 'teamSize', 'description', 'location',
        'website', 'contactNo', 'logoUrl'
      ];
      
      const completedFields = profileFields.filter(field => 
        startup[field] !== null && startup[field] !== ''
      ).length;
      
      const profileCompletion = Math.round((completedFields / profileFields.length) * 100);
      
      return {
        totalPosts,
        recentPosts,
        profileCompletion,
        loginCount: startup.loginCount || 0,
        lastLogin: startup.lastLogin,
        memberSince: startup.createdAt,
        isEmailVerified: startup.isEmailVerified,
        startupStage: startup.startupStage,
        fundingStatus: startup.fundingStatus,
        teamSize: startup.teamSize
      };
    } catch (error) {
      throw new Error(`Failed to get startup statistics: ${error.message}`);
    }
  }

  // =============================================
  // STARTUP POSTS MANAGEMENT
  // =============================================
  
  async getStartupPosts(startupId, limit = 20, offset = 0) {
    try {
      const posts = await prisma.post.findMany({
        where: { startup_id: startupId },
        select: {
          post_id: true,
          content: true,
          createdAt: true,
          student_id: true,
          college_id: true,
          industry_id: true,
          alumni_id: true,
          startup_id: true
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      });
      
      const totalPosts = await prisma.post.count({
        where: { startup_id: startupId }
      });
      
      return {
        posts,
        totalPosts,
        pagination: {
          limit,
          offset,
          hasMore: (offset + limit) < totalPosts
        }
      };
    } catch (error) {
      throw new Error(`Failed to get startup posts: ${error.message}`);
    }
  }

  // =============================================
  // STARTUP NETWORKING (Related data)
  // =============================================
  
  async getRelatedStudents(startupId, interestedField = null, limit = 20) {
    try {
      const startup = await prisma.startup.findUnique({
        where: { id: startupId }
      });
      
      if (!startup) {
        throw new Error('Startup profile not found');
      }
      
      // Find students who might be interested in startups or entrepreneurship
      const whereClause = {
        isActive: true,
        OR: [
          { interestedField: { contains: 'entrepreneur', mode: 'insensitive' } },
          { interestedField: { contains: 'startup', mode: 'insensitive' } },
          { interestedField: { contains: 'business', mode: 'insensitive' } }
        ]
      };
      
      // Add specific field filter if provided
      if (interestedField) {
        whereClause.OR.push({ 
          interestedField: { 
            contains: interestedField,
            mode: 'insensitive'
          }
        });
      }
      
      // Add location-based matching
      if (startup.location) {
        whereClause.OR.push({
          collegeName: {
            contains: startup.location,
            mode: 'insensitive'
          }
        });
      }
      
      const students = await prisma.student.findMany({
        where: whereClause,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          collegeName: true,
          interestedField: true,
          profilePicture: true,
          createdAt: true
        },
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      
      return students;
    } catch (error) {
      throw new Error(`Failed to get related students: ${error.message}`);
    }
  }

  // =============================================
  // STARTUP DISCOVERY AND MATCHING
  // =============================================
  
  async getSimilarStartups(startupId, limit = 10) {
    try {
      const startup = await prisma.startup.findUnique({
        where: { id: startupId }
      });
      
      if (!startup) {
        throw new Error('Startup profile not found');
      }
      
      const whereClause = {
        isActive: true,
        id: { not: startupId }, // Exclude current startup
        OR: []
      };
      
      // Match by startup stage
      if (startup.startupStage) {
        whereClause.OR.push({ startupStage: startup.startupStage });
      }
      
      // Match by location
      if (startup.location) {
        whereClause.OR.push({
          location: { contains: startup.location, mode: 'insensitive' }
        });
      }
      
      // Match by funding status
      if (startup.fundingStatus) {
        whereClause.OR.push({ fundingStatus: startup.fundingStatus });
      }
      
      // If no criteria, return recent startups
      if (whereClause.OR.length === 0) {
        delete whereClause.OR;
      }
      
      const similarStartups = await prisma.startup.findMany({
        where: whereClause,
        select: {
          id: true,
          startupName: true,
          startupStage: true,
          fundingStatus: true,
          teamSize: true,
          location: true,
          description: true,
          logoUrl: true,
          website: true,
          isEmailVerified: true,
          createdAt: true
        },
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      
      return similarStartups;
    } catch (error) {
      throw new Error(`Failed to get similar startups: ${error.message}`);
    }
  }

  // =============================================
  // FUTURE EXTENSIBILITY - PLACEHOLDER METHODS
  // =============================================
  // These methods are prepared for when startup profile section tables are added
  
  async getStartupAbout(startupId) {
    // Placeholder for startup_about table when implemented
    return { message: 'Startup about section not yet implemented in database schema' };
  }

  async getStartupTeam(startupId) {
    // Placeholder for startup_team table when implemented
    return { message: 'Startup team section not yet implemented in database schema' };
  }

  async getStartupProducts(startupId) {
    // Placeholder for startup_products table when implemented
    return { message: 'Startup products section not yet implemented in database schema' };
  }

  async getStartupMilestones(startupId) {
    // Placeholder for startup_milestones table when implemented
    return { message: 'Startup milestones section not yet implemented in database schema' };
  }

  async getFundingHistory(startupId) {
    // Placeholder for startup_funding table when implemented
    return { message: 'Startup funding history section not yet implemented in database schema' };
  }

  async getStartupInvestors(startupId) {
    // Placeholder for startup_investors table when implemented
    return { message: 'Startup investors section not yet implemented in database schema' };
  }

  async getStartupMetrics(startupId) {
    // Placeholder for startup_metrics table when implemented
    return { message: 'Startup metrics section not yet implemented in database schema' };
  }

  async getStartupPartners(startupId) {
    // Placeholder for startup_partners table when implemented
    return { message: 'Startup partners section not yet implemented in database schema' };
  }

  // =============================================
  // COMPLETE STARTUP PROFILE
  // =============================================
  
  async getCompleteStartupProfile(startupId) {
    try {
      const [
        basicProfile,
        statistics,
        recentPosts,
        relatedStudents,
        similarStartups
      ] = await Promise.all([
        this.getStartupProfile(startupId),
        this.getStartupStatistics(startupId),
        this.getStartupPosts(startupId, 5, 0), // Get first 5 posts
        this.getRelatedStudents(startupId, null, 10), // Get 10 related students
        this.getSimilarStartups(startupId, 5) // Get 5 similar startups
      ]);
      
      return {
        profile: basicProfile,
        statistics,
        recentPosts: recentPosts.posts,
        relatedStudents,
        similarStartups,
        // Placeholder sections for future implementation
        about: await this.getStartupAbout(startupId),
        team: await this.getStartupTeam(startupId),
        products: await this.getStartupProducts(startupId),
        milestones: await this.getStartupMilestones(startupId),
        fundingHistory: await this.getFundingHistory(startupId),
        investors: await this.getStartupInvestors(startupId),
        metrics: await this.getStartupMetrics(startupId),
        partners: await this.getStartupPartners(startupId)
      };
    } catch (error) {
      throw new Error(`Failed to get complete startup profile: ${error.message}`);
    }
  }

  // =============================================
  // SEARCH AND DISCOVERY
  // =============================================
  
  async searchStartups(searchQuery, filters = {}) {
    try {
      const {
        startupStage,
        fundingStatus,
        location,
        teamSize,
        isActive = true,
        limit = 20,
        offset = 0
      } = filters;
      
      const whereClause = {
        isActive,
        AND: []
      };
      
      // Text search across startup name, description
      if (searchQuery) {
        whereClause.AND.push({
          OR: [
            { startupName: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } }
          ]
        });
      }
      
      // Filter by startup stage
      if (startupStage) {
        whereClause.AND.push({ startupStage });
      }
      
      // Filter by funding status
      if (fundingStatus) {
        whereClause.AND.push({ fundingStatus });
      }
      
      // Filter by location
      if (location) {
        whereClause.AND.push({
          location: { contains: location, mode: 'insensitive' }
        });
      }
      
      // Filter by team size
      if (teamSize) {
        whereClause.AND.push({ teamSize });
      }
      
      // Remove empty AND array
      if (whereClause.AND.length === 0) {
        delete whereClause.AND;
      }
      
      const startups = await prisma.startup.findMany({
        where: whereClause,
        select: {
          id: true,
          startupName: true,
          startupStage: true,
          fundingStatus: true,
          teamSize: true,
          location: true,
          description: true,
          logoUrl: true,
          website: true,
          isEmailVerified: true,
          createdAt: true
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      });
      
      const totalCount = await prisma.startup.count({ where: whereClause });
      
      return {
        startups,
        totalCount,
        pagination: {
          limit,
          offset,
          hasMore: (offset + limit) < totalCount
        }
      };
    } catch (error) {
      throw new Error(`Failed to search startups: ${error.message}`);
    }
  }

  // =============================================
  // UTILITY METHODS
  // =============================================
  
  async getStartupProfileSummary(startupId) {
    try {
      const [
        basicProfile,
        statistics
      ] = await Promise.all([
        this.getStartupProfile(startupId),
        this.getStartupStatistics(startupId)
      ]);
      
      return {
        startupName: basicProfile?.startupName,
        startupStage: basicProfile?.startupStage,
        fundingStatus: basicProfile?.fundingStatus,
        teamSize: basicProfile?.teamSize,
        location: basicProfile?.location,
        profileCompletion: statistics.profileCompletion,
        totalPosts: statistics.totalPosts,
        isVerified: statistics.isEmailVerified,
        memberSince: statistics.memberSince,
        lastLogin: statistics.lastLogin
      };
    } catch (error) {
      throw new Error(`Failed to get startup profile summary: ${error.message}`);
    }
  }

  // =============================================
  // FUNDING AND INVESTMENT TRACKING
  // =============================================
  
  async getStartupsByFundingStage(fundingStage, limit = 20) {
    try {
      const startups = await prisma.startup.findMany({
        where: {
          isActive: true,
          fundingStatus: fundingStage
        },
        select: {
          id: true,
          startupName: true,
          startupStage: true,
          fundingStatus: true,
          teamSize: true,
          location: true,
          description: true,
          logoUrl: true,
          website: true,
          createdAt: true
        },
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      
      return startups;
    } catch (error) {
      throw new Error(`Failed to get startups by funding stage: ${error.message}`);
    }
  }
}

module.exports = new StartupProfileService();
