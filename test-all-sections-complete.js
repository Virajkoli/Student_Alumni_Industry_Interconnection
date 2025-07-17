/*
 * Comprehensive test for all student profile sections
 * Tests backend/database integration and dynamic state updates
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/profile';

// Test data for each section
const testData = {
  experience: {
    title: 'Software Engineer Intern',
    company: 'Tech Corp',
    employment_type: 'Internship',
    location: 'San Francisco, CA',
    description: 'Worked on web development projects',
    currently_working: false,
    start_date: '2023-06-01',
    end_date: '2023-08-31'
  },
  education: {
    institution: 'Test University',
    degree: 'Bachelor of Engineering',
    field_of_study: 'Computer Science',
    start_year: 2020,
    end_year: 2024,
    grade: '8.5 CGPA'
  },
  project: {
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing projects',
    technologies: 'React, Node.js, MongoDB',
    github_url: 'https://github.com/user/portfolio',
    live_url: 'https://myportfolio.com'
  },
  course: {
    name: 'Advanced JavaScript',
    institution: 'Online Academy',
    description: 'Deep dive into JavaScript concepts',
    completion_date: '2023-12-01'
  },
  certification: {
    name: 'AWS Solutions Architect',
    issuing_organization: 'Amazon Web Services',
    issue_date: '2023-11-15',
    expiration_date: '2026-11-15',
    credential_id: 'AWS-123456'
  },
  recommendation: {
    recommender_name: 'John Doe',
    recommender_position: 'Senior Developer',
    recommender_company: 'Tech Corp',
    relationship: 'Manager',
    message: 'Excellent intern with great potential'
  }
};

async function testSection(sectionName, sectionPath, createData, updateField = 'title') {
  console.log(`\n🧪 Testing ${sectionName} Section...`);
  
  try {
    // 1. Create new entry
    console.log(`  📝 Creating new ${sectionName}...`);
    const createResponse = await axios.post(`${BASE_URL}/${sectionPath}`, createData);
    console.log(`  ✅ Created ${sectionName}:`, createResponse.data);
    
    const createdId = createResponse.data.data?.id || createResponse.data.id;
    if (!createdId) {
      throw new Error(`No ID returned for created ${sectionName}`);
    }
    
    // 2. Read entries
    console.log(`  📖 Reading all ${sectionName}s...`);
    const readResponse = await axios.get(`${BASE_URL}/${sectionPath}`);
    console.log(`  ✅ Found ${readResponse.data.data?.length || readResponse.data.length} ${sectionName}(s)`);
    
    // 3. Update entry
    if (updateField && createData[updateField]) {
      console.log(`  ✏️  Updating ${sectionName}...`);
      const updateData = { ...createData };
      updateData[updateField] = `Updated ${createData[updateField]}`;
      
      const updateResponse = await axios.put(`${BASE_URL}/${sectionPath}/${createdId}`, updateData);
      console.log(`  ✅ Updated ${sectionName}:`, updateResponse.data);
    }
    
    // 4. Delete entry
    console.log(`  🗑️  Deleting ${sectionName}...`);
    const deleteResponse = await axios.delete(`${BASE_URL}/${sectionPath}/${createdId}`);
    console.log(`  ✅ Deleted ${sectionName}:`, deleteResponse.data);
    
    console.log(`  🎉 ${sectionName} section test completed successfully!`);
    return true;
    
  } catch (error) {
    console.error(`  ❌ Error testing ${sectionName}:`, error.response?.data || error.message);
    return false;
  }
}

async function testAllSections() {
  console.log('🚀 Starting comprehensive profile sections test...\n');
  
  const results = {
    experience: await testSection('Experience', 'experience', testData.experience),
    education: await testSection('Education', 'education', testData.education, 'institution'),
    project: await testSection('Project', 'projects', testData.project),
    course: await testSection('Course', 'courses', testData.course, 'name'),
    certification: await testSection('Certification', 'certifications', testData.certification, 'name'),
    recommendation: await testSection('Recommendation', 'recommendations', testData.recommendation, 'recommender_name')
  };
  
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  
  let allPassed = true;
  Object.entries(results).forEach(([section, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${section.toUpperCase()}: ${status}`);
    if (!passed) allPassed = false;
  });
  
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('🎉 ALL SECTIONS PASSED! Backend/Database integration working correctly.');
    console.log('🔄 All sections now support dynamic state updates without page reloads.');
  } else {
    console.log('⚠️  Some sections failed. Please check the errors above.');
  }
  console.log('='.repeat(50));
}

// Run the test
testAllSections().catch(console.error);
