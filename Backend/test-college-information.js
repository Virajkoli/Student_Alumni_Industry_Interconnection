const { testConnection, syncDatabase, College, CollegeCampus } = require('./config/database');

async function testCollegeInformationAPI() {
  try {
    console.log('🔧 Testing College Information API...');
    
    // Test database connection
    const connectionTest = await testConnection();
    if (!connectionTest) {
      throw new Error('Database connection failed');
    }

    // Sync database to create tables
    await syncDatabase();

    // Test creating a sample college
    const sampleCollege = await College.create({
      name: 'Test College',
      email: 'test@college.edu',
      password: 'password123',
      description: 'A test college for development',
      location: 'Mumbai, Maharashtra, India',
      established: 1995,
      website: 'https://testcollege.edu',
      about: 'A premier institution dedicated to excellence in education, research, and innovation.',
      verified: true,
      verifiedDate: new Date('2020-01-15'),
    });

    console.log('✅ Sample college created:', sampleCollege.id);

    // Test creating sample campuses
    const campuses = [
      {
        college_id: sampleCollege.id,
        name: 'Main Campus',
        type: 'Main Campus',
        address: 'Mumbai, Maharashtra - 400001, India',
        student_count: '10,000+',
        latitude: 19.0760,
        longitude: 72.8777,
        dean: 'Dr. Rajesh Sharma',
        image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=150&fit=crop',
        contact_number: '+91 22 2673 0000',
        email: 'main@testcollege.edu',
        custom_fields: {
          'Library': '24/7 Access',
          'Sports Complex': 'Available',
        },
      },
      {
        college_id: sampleCollege.id,
        name: 'Engineering Campus',
        type: 'Specialized Campus',
        address: 'Navi Mumbai, Maharashtra - 400050, India',
        student_count: '3,500+',
        latitude: 19.1197,
        longitude: 72.9056,
        dean: 'Dr. Priya Patel',
        image_url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&h=150&fit=crop',
        contact_number: '+91 22 2576 7000',
        email: 'engineering@testcollege.edu',
        custom_fields: {
          'Research Labs': '15 Labs',
          'Workshops': 'Modern Equipment',
        },
      },
    ];

    for (const campus of campuses) {
      const createdCampus = await CollegeCampus.create(campus);
      console.log(`✅ Campus created: ${createdCampus.name} (ID: ${createdCampus.id})`);
    }

    // Test retrieving college with campuses
    const collegeWithCampuses = await College.findByPk(sampleCollege.id, {
      include: [
        {
          model: CollegeCampus,
          as: 'campuses',
        },
      ],
    });

    console.log('✅ College with campuses retrieved:', {
      id: collegeWithCampuses.id,
      name: collegeWithCampuses.name,
      campusCount: collegeWithCampuses.campuses.length,
    });

    console.log('🎉 All tests passed! College Information API is ready.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testCollegeInformationAPI();
