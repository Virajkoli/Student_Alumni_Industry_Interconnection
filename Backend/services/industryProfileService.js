const prisma = require('../config/prisma');

/**
 * Industry Profile Service
 * Service for industry profile management and related operations
 * Note: Industry-specific profile section tables don't exist yet in the schema
 * This service handles basic industry profile operations and can be extended
 */

class IndustryProfileService {
  
  // =============================================
  // BASIC INDUSTRY PROFILE
  // =============================================
  
  async getIndustryProfile(industryId) {
    try {
      const industry = await prisma.industry.findUnique({
        where: { id: industryId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          companyName: true,
          industryType: true,
          companySize: true,
          designation: true,
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
      return industry;
    } catch (error) {
      throw new Error(`Failed to get industry profile: ${error.message}`);
    }
  }

  async updateIndustryProfile(industryId, profileData) {
    try {
      const {
        firstName, lastName, companyName, industryType, companySize,
        designation, description, location, website, contactNo,
        logoUrl, backgroundUrl, profilePicture
      } = profileData;
      
      const industry = await prisma.industry.update({
        where: { id: industryId },
        data: {
          firstName,
          lastName,
          companyName,
          industryType,
          companySize,
          designation,
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
      return industry;
    } catch (error) {
      throw new Error(`Failed to update industry profile: ${error.message}`);
    }
  }

  // =============================================
  // INDUSTRY STATISTICS AND ANALYTICS
  // =============================================
  
  async getIndustryStatistics(industryId) {
    try {
      const industry = await prisma.industry.findUnique({
        where: { id: industryId }
      });
      
      if (!industry) {
        throw new Error('Industry profile not found');
      }
      
      // Get posts created by this industry profile
      const totalPosts = await prisma.post.count({
        where: { industry_id: industryId }
      });
      
      // Get recent posts (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentPosts = await prisma.post.count({
        where: {
          industry_id: industryId,
          createdAt: { gte: thirtyDaysAgo }
        }
      });
      
      // Calculate profile completion
      const profileFields = [
        'firstName', 'lastName', 'companyName', 'industryType',
        'companySize', 'designation', 'description', 'location',
        'website', 'contactNo', 'logoUrl'
      ];
      
      const completedFields = profileFields.filter(field => 
        industry[field] !== null && industry[field] !== ''
      ).length;
      
      const profileCompletion = Math.round((completedFields / profileFields.length) * 100);
      
      return {
        totalPosts,
        recentPosts,
        profileCompletion,
        loginCount: industry.loginCount || 0,
        lastLogin: industry.lastLogin,
        memberSince: industry.createdAt,
        isEmailVerified: industry.isEmailVerified
      };
    } catch (error) {
      throw new Error(`Failed to get industry statistics: ${error.message}`);
    }
  }

  // =============================================
  // INDUSTRY POSTS MANAGEMENT
  // =============================================
  
  async getIndustryPosts(industryId, limit = 20, offset = 0) {
    try {
      const posts = await prisma.post.findMany({
        where: { industry_id: industryId },
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
        where: { industry_id: industryId }
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
      throw new Error(`Failed to get industry posts: ${error.message}`);
    }
  }

  // =============================================
  // INDUSTRY NETWORKING (Related data)
  // =============================================
  
  async getRelatedStudents(industryId, interestedField = null, limit = 20) {
    try {
      const industry = await prisma.industry.findUnique({
        where: { id: industryId }
      });
      
      if (!industry) {
        throw new Error('Industry profile not found');
      }
      
      // Find students interested in this industry type or location
      const whereClause = {
        isActive: true,
        OR: []
      };
      
      // Match by interested field
      if (interestedField) {
        whereClause.OR.push({ interestedField: interestedField });
      } else if (industry.industryType) {
        whereClause.OR.push({ 
          interestedField: { 
            contains: industry.industryType,
            mode: 'insensitive'
          }
        });
      }
      
      // Match by location
      if (industry.location) {
        whereClause.OR.push({
          collegeName: {
            contains: industry.location,
            mode: 'insensitive'
          }
        });
      }
      
      // If no specific criteria, get recent active students
      if (whereClause.OR.length === 0) {
        delete whereClause.OR;
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
  // FUTURE EXTENSIBILITY - PLACEHOLDER METHODS
  // =============================================
  // These methods are prepared for when industry profile section tables are added
  
  async getIndustryAbout(industryId) {
    // Placeholder for industry_about table when implemented
    return { message: 'Industry about section not yet implemented in database schema' };
  }

  async getCompanyProjects(industryId) {
    // Placeholder for industry_projects table when implemented
    return { message: 'Industry projects section not yet implemented in database schema' };
  }

  async getCompanyServices(industryId) {
    // Placeholder for industry_services table when implemented
    return { message: 'Industry services section not yet implemented in database schema' };
  }

  async getCompanyTeam(industryId) {
    // Placeholder for industry_team table when implemented
    return { message: 'Industry team section not yet implemented in database schema' };
  }

  async getCompanyAchievements(industryId) {
    // Placeholder for industry_achievements table when implemented
    return { message: 'Industry achievements section not yet implemented in database schema' };
  }

  async getCompanyCertifications(industryId) {
    // Placeholder for industry_certifications table when implemented
    return { message: 'Industry certifications section not yet implemented in database schema' };
  }

  async getJobOpenings(industryId) {
    // Placeholder for industry_jobs table when implemented
    return { message: 'Industry job openings section not yet implemented in database schema' };
  }

  async getInternshipPrograms(industryId) {
    // Placeholder for industry_internships table when implemented
    return { message: 'Industry internship programs section not yet implemented in database schema' };
  }

  // =============================================
  // COMPLETE INDUSTRY PROFILE
  // =============================================
  
  async getCompleteIndustryProfile(industryId) {
    try {
      const [
        basicProfile,
        statistics,
        recentPosts,
        relatedStudents
      ] = await Promise.all([
        this.getIndustryProfile(industryId),
        this.getIndustryStatistics(industryId),
        this.getIndustryPosts(industryId, 5, 0), // Get first 5 posts
        this.getRelatedStudents(industryId, null, 10) // Get 10 related students
      ]);
      
      return {
        profile: basicProfile,
        statistics,
        recentPosts: recentPosts.posts,
        relatedStudents,
        // Placeholder sections for future implementation
        about: await this.getIndustryAbout(industryId),
        projects: await this.getCompanyProjects(industryId),
        services: await this.getCompanyServices(industryId),
        team: await this.getCompanyTeam(industryId),
        achievements: await this.getCompanyAchievements(industryId),
        certifications: await this.getCompanyCertifications(industryId),
        jobOpenings: await this.getJobOpenings(industryId),
        internshipPrograms: await this.getInternshipPrograms(industryId)
      };
    } catch (error) {
      throw new Error(`Failed to get complete industry profile: ${error.message}`);
    }
  }

  // =============================================
  // SEARCH AND DISCOVERY
  // =============================================
  
  async searchIndustries(searchQuery, filters = {}) {
    try {
      const {
        industryType,
        location,
        companySize,
        isActive = true,
        limit = 20,
        offset = 0
      } = filters;
      
      const whereClause = {
        isActive,
        AND: []
      };
      
      // Text search across company name, description, and industry type
      if (searchQuery) {
        whereClause.AND.push({
          OR: [
            { companyName: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
            { industryType: { contains: searchQuery, mode: 'insensitive' } }
          ]
        });
      }
      
      // Filter by industry type
      if (industryType) {
        whereClause.AND.push({
          industryType: { contains: industryType, mode: 'insensitive' }
        });
      }
      
      // Filter by location
      if (location) {
        whereClause.AND.push({
          location: { contains: location, mode: 'insensitive' }
        });
      }
      
      // Filter by company size
      if (companySize) {
        whereClause.AND.push({ companySize });
      }
      
      // Remove empty AND array
      if (whereClause.AND.length === 0) {
        delete whereClause.AND;
      }
      
      const industries = await prisma.industry.findMany({
        where: whereClause,
        select: {
          id: true,
          companyName: true,
          industryType: true,
          companySize: true,
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
      
      const totalCount = await prisma.industry.count({ where: whereClause });
      
      return {
        industries,
        totalCount,
        pagination: {
          limit,
          offset,
          hasMore: (offset + limit) < totalCount
        }
      };
    } catch (error) {
      throw new Error(`Failed to search industries: ${error.message}`);
    }
  }

  // =============================================
  // UTILITY METHODS
  // =============================================
  
  async getIndustryProfileSummary(industryId) {
    try {
      const [
        basicProfile,
        statistics
      ] = await Promise.all([
        this.getIndustryProfile(industryId),
        this.getIndustryStatistics(industryId)
      ]);
      
      return {
        companyName: basicProfile?.companyName,
        industryType: basicProfile?.industryType,
        location: basicProfile?.location,
        profileCompletion: statistics.profileCompletion,
        totalPosts: statistics.totalPosts,
        isVerified: statistics.isEmailVerified,
        memberSince: statistics.memberSince,
        lastLogin: statistics.lastLogin
      };
    } catch (error) {
      throw new Error(`Failed to get industry profile summary: ${error.message}`);
    }
  }
}

module.exports = new IndustryProfileService();
