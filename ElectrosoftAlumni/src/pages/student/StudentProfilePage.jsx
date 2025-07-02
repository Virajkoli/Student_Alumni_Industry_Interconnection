// src/pages/Profile.js
// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="page">
//       <h1>Profile</h1>
//       <p>This is your profile page.</p>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from 'react';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   // Profile picture URL
//   const profilePicUrl = "https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg";

//   // State for education modal
//   const [showEducationModal, setShowEducationModal] = useState(false);
//   const [educationData, setEducationData] = useState({
//     school: 'Government Polytechnic',
//     degree: 'Diploma',
//     field: 'Computer Engineering',
//     grade: '',
//     activities: '',
//     description: '',
//     startMonth: '',
//     startYear: '',
//     endMonth: '',
//     endYear: '',
//     notifyNetwork: true
//   });

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEducationData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setEducationData(prev => ({ ...prev, [name]: checked }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowEducationModal(false);
//     // Save education data here
//   };

//   return (
//     <div className="profile-container">
//       {/* Header Section */}
//       <div className="profile-header">
//         <div className="cover-photo"></div>
//         <div className="profile-info">
//           <div className="profile-pic">
//             <img
//               src={profilePicUrl}
//               alt="Priya P"
//               className="profile-image"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/150'; // Fallback image
//               }}
//             />
//           </div>
//           <div className="profile-details">
//             <h1>Priya P</h1>
//             <p className="headline">Computer Engineering</p>
//             <p className="location">Jalgaon, Maharashtra, India • Contact info</p>
//             <button className="open-to-btn">Open to</button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="profile-nav">
//         <button className="active">About</button>
//         <button>Activity</button>
//         <button>Experience</button>
//         <button onClick={() => setShowEducationModal(true)}>Education</button>
//         <button>Skills</button>
//         <button>Recommendations</button>
//       </nav>

//       {/* Main Content */}
//       <div className="profile-content">
//         {/* Left Column */}
//         <div className="left-column">
//           {/* About Section */}
//           <div className="card about-section">
//             <h2>About</h2>
//             <p>Aboard/industrial organization</p>
//             <button className="show-btn">Show more</button>
//           </div>

//           {/* Education Section */}
//           <div className="card education-section" onClick={() => setShowEducationModal(true)} style={{ cursor: 'pointer' }}>
//             <h2>Education</h2>
//             <div className="education-item">
//               <h3>{educationData.school}</h3>
//               <p>{educationData.degree} in {educationData.field}</p>
//               <p>Jalgaon, Maharashtra, India</p>
//             </div>
//           </div>

//           {/* Skills Section */}
//           <div className="card skills-section">
//             <h2>Skills</h2>
//             <div className="skills-list">
//               <span className="skill-tag">Web Development</span>
//               <span className="skill-tag">JavaScript</span>
//               <span className="skill-tag">React</span>
//               <span className="skill-tag">HTML/CSS</span>
//             </div>
//           </div>

//           {/* Languages Section */}
//           <div className="card languages-section">
//             <h2>Languages</h2>
//             <p>English</p>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="right-column">
//           {/* Open To Section */}
//           <div className="card open-to-section">
//             <div className="section-header">
//               <h3>Open to</h3>
//               <button className="edit-btn">Edit</button>
//             </div>
//             <p>Web Developer roles</p>
//             <div className="action-buttons">
//               <button className="action-btn">Add profile section</button>
//               <button className="action-btn">Enhance profile</button>
//             </div>
//           </div>

//           {/* Analytics Section */}
//           <div className="card analytics-section">
//             <div className="section-header">
//               <h3>Analytics</h3>
//               <span className="private">Private to you</span>
//             </div>
//             <p>80 profile views</p>
//             <p>Discover who's viewed your profile</p>
//           </div>

//           {/* Resources Section */}
//           <div className="card resources-section">
//             <h3>Resources</h3>
//             <p>Tell non-profits you're interested in getting involved with your time and skills</p>
//             <button className="get-started-btn">Get started</button>
//           </div>

//           {/* Premium Section */}
//           <div className="card premium-section">
//             <h3>Invest in your future</h3>
//             <p>Enjoy 50% off 2 months of LinkedIn Premium!</p>
//             <button className="premium-btn">Get 50% off today</button>
//           </div>
//         </div>
//       </div>

//       {/* Education Modal */}
//       {showEducationModal && (
//         <div className="modal-overlay">
//           <div className="education-modal">
//             <div className="modal-header">
//               <h2>Add education</h2>
//               <button className="close-btn" onClick={() => setShowEducationModal(false)}>
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="form-section">
//                 <div className="checkbox-group">
//                   <input
//                     type="checkbox"
//                     id="notifyNetwork"
//                     name="notifyNetwork"
//                     checked={educationData.notifyNetwork}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="notifyNetwork">
//                     Turn on to notify your network of key profile changes (such as new education) and work anniversaries.
//                     <span className="learn-more"> Learn more about sharing profile changes.</span>
//                   </label>
//                 </div>
//                 <p className="required-note">* Indicates required</p>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="school">School*</label>
//                   <input
//                     type="text"
//                     id="school"
//                     name="school"
//                     value={educationData.school}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Government Polytechnic"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="degree">Degree</label>
//                   <input
//                     type="text"
//                     id="degree"
//                     name="degree"
//                     value={educationData.degree}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Diploma"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="field">Field of study</label>
//                   <input
//                     type="text"
//                     id="field"
//                     name="field"
//                     value={educationData.field}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Computer Engineering"
//                   />
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start date</label>
//                     <div className="date-inputs">
//                       <select
//                         name="startMonth"
//                         value={educationData.startMonth}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="startYear"
//                         value={educationData.startYear}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>End date (or expected)</label>
//                     <div className="date-inputs">
//                       <select
//                         name="endMonth"
//                         value={educationData.endMonth}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="endYear"
//                         value={educationData.endYear}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Grade</h3>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="grade"
//                     value={educationData.grade}
//                     onChange={handleInputChange}
//                     placeholder="Ex: 8.5 CGPA"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Activities and societies</label>
//                   <textarea
//                     name="activities"
//                     value={educationData.activities}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Coding Club, Sports Team"
//                   />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Description</h3>
//                 <p className="hint-text">We recommend adding your top 5 used in this experience. They'll also appear in your Skills section.</p>
//                 <div className="form-group">
//                   <textarea
//                     name="description"
//                     value={educationData.description}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <button type="button" className="add-skill-btn">
//                   + Add skill
//                 </button>
//               </div>

//               <div className="modal-actions">
//                 <button type="button" className="cancel-btn" onClick={() => setShowEducationModal(false)}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState } from 'react';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   // Profile picture URL
//   const profilePicUrl = "https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg";

//   // State for education modal
//   const [showEducationModal, setShowEducationModal] = useState(false);
//   const [educationData, setEducationData] = useState({
//     school: 'Government Polytechnic',
//     degree: 'Diploma',
//     field: 'Computer Engineering',
//     grade: '',
//     activities: '',
//     description: '',
//     startMonth: '',
//     startYear: '',
//     endMonth: '',
//     endYear: '',
//     notifyNetwork: true
//   });

//   // State for experience modal
//   const [showExperienceModal, setShowExperienceModal] = useState(false);
//   const [experienceData, setExperienceData] = useState({
//     title: '',
//     company: '',
//     employmentType: 'Full-time',
//     currentlyWorking: false,
//     startMonth: '',
//     startYear: '',
//     endMonth: '',
//     endYear: '',
//     location: '',
//     description: '',
//     notifyNetwork: true
//   });

//   // State for skill modal
//   const [showSkillModal, setShowSkillModal] = useState(false);
//   const [skillInput, setSkillInput] = useState('');
//   const [skills, setSkills] = useState(['Web Development', 'JavaScript', 'React', 'HTML/CSS']);

//   // State for project modal
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       title: 'E-commerce Website',
//       description: 'Developed a full-stack e-commerce platform with React and Node.js',
//       date: 'May 2024',
//       url: 'https://github.com/username/ecommerce'
//     }
//   ]);
//   const [newProject, setNewProject] = useState({
//     title: '',
//     description: '',
//     date: '',
//     url: ''
//   });

//   // State for course modal
//   const [showCourseModal, setShowCourseModal] = useState(false);
//   const [courses, setCourses] = useState([
//     {
//       id: 1,
//       name: 'Advanced React',
//       institution: 'Udemy',
//       completionDate: 'April 2024'
//     }
//   ]);
//   const [newCourse, setNewCourse] = useState({
//     name: '',
//     institution: '',
//     completionDate: ''
//   });

//   // State for certification modal
//   const [showCertificationModal, setShowCertificationModal] = useState(false);
//   const [certifications, setCertifications] = useState([
//     {
//       id: 1,
//       name: 'AWS Certified Developer',
//       issuer: 'Amazon Web Services',
//       date: 'March 2024',
//       credentialId: 'AWS123456'
//     }
//   ]);
//   const [newCertification, setNewCertification] = useState({
//     name: '',
//     issuer: '',
//     date: '',
//     credentialId: ''
//   });

//   // State for recommendation modal
//   const [showRecommendationModal, setShowRecommendationModal] = useState(false);
//   const [recommendations, setRecommendations] = useState([
//     {
//       id: 1,
//       text: 'Priya is an excellent developer with strong problem-solving skills.',
//       name: 'Rajesh Kumar',
//       position: 'Senior Developer at Tech Solutions',
//       relation: 'Worked together on multiple projects',
//       date: 'June 2024'
//     }
//   ]);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

//   // Suggested skills based on profile
//   const suggestedSkills = [
//     { category: 'Frontend', skills: ['React.js', 'Git', 'AngularJS', 'Databases', 'Software Development'] },
//     { category: 'Programming', skills: ['Data Structures', 'C#', 'Object-Oriented Programming (OOP)'] },
//     { category: 'Web', skills: ['Responsive Web Design', 'Web Development'] }
//   ];

//   // Common input change handler
//   const handleInputChange = (e, setter) => {
//     const { name, value, type, checked } = e.target;
//     setter(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleEducationSubmit = (e) => {
//     e.preventDefault();
//     console.log("Education data saved:", educationData);
//     setShowEducationModal(false);
//   };

//   const handleExperienceSubmit = (e) => {
//     e.preventDefault();
//     console.log("Experience data saved:", experienceData);
//     setShowExperienceModal(false);
//   };

//   const handleSkillSubmit = (e) => {
//     e.preventDefault();
//     if (skillInput.trim() && !skills.includes(skillInput)) {
//       setSkills([...skills, skillInput]);
//     }
//     setShowSkillModal(false);
//     setSkillInput('');
//   };

//   const handleProjectSubmit = (e) => {
//     e.preventDefault();
//     setProjects([...projects, {
//       ...newProject,
//       id: projects.length + 1
//     }]);
//     setNewProject({
//       title: '',
//       description: '',
//       date: '',
//       url: ''
//     });
//     setShowProjectModal(false);
//   };

//   const handleCourseSubmit = (e) => {
//     e.preventDefault();
//     setCourses([...courses, {
//       ...newCourse,
//       id: courses.length + 1
//     }]);
//     setNewCourse({
//       name: '',
//       institution: '',
//       completionDate: ''
//     });
//     setShowCourseModal(false);
//   };

//   const handleCertificationSubmit = (e) => {
//     e.preventDefault();
//     setCertifications([...certifications, {
//       ...newCertification,
//       id: certifications.length + 1
//     }]);
//     setNewCertification({
//       name: '',
//       issuer: '',
//       date: '',
//       credentialId: ''
//     });
//     setShowCertificationModal(false);
//   };

//   return (
//     <div className="profile-container">
//       {/* Header Section */}
//       <div className="profile-header">
//         <div className="cover-photo"></div>
//         <div className="profile-info">
//           <div className="profile-pic">
//             <img
//               src={profilePicUrl}
//               alt="Profile"
//               className="profile-image"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/150';
//               }}
//             />
//           </div>
//           <div className="profile-details">
//             <h1>Priya P</h1>
//             <p className="headline">Computer Engineering</p>
//             <p className="location">Jalgaon, Maharashtra, India • Contact info</p>
//             <button className="open-to-btn">Open to</button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="profile-nav">
//         <button className="active">About</button>
//         <button>Activity</button>
//         <button onClick={() => {
//           setExperienceData({
//             title: '',
//             company: '',
//             employmentType: 'Full-time',
//             currentlyWorking: false,
//             startMonth: '',
//             startYear: '',
//             endMonth: '',
//             endYear: '',
//             location: '',
//             description: '',
//             notifyNetwork: true
//           });
//           setShowExperienceModal(true);
//         }}>Experience</button>
//         <button onClick={() => setShowEducationModal(true)}>Education</button>
//         <button onClick={() => setShowSkillModal(true)}>Skills</button>
//         <button>Recommendations</button>
//       </nav>

//       {/* Main Content */}
//       <div className="profile-content">
//         {/* Left Column */}
//         <div className="left-column">
//           {/* About Section */}
//           <div className="card about-section">
//             <h2>About</h2>
//             <p>Aboard/industrial organization</p>
//             <button className="show-btn">Show more</button>
//           </div>

//           {/* Experience Section */}
//           <div
//             className="card experience-section"
//             onClick={() => {
//               setExperienceData({
//                 title: 'Web Developer',
//                 company: 'Passion Software Solutions',
//                 employmentType: 'Internship',
//                 currentlyWorking: false,
//                 startMonth: 'June',
//                 startYear: '2024',
//                 endMonth: '',
//                 endYear: '',
//                 location: 'Jalgaon, Maharashtra, India',
//                 description: 'During my 6-week internship at Passion Software, I had the opportunity to contribute to various web development projects.',
//                 notifyNetwork: true
//               });
//               setShowExperienceModal(true);
//             }}
//           >
//             <h2>Experience</h2>
//             <div className="experience-item">
//               <h3>Web Developer</h3>
//               <p>Passion Software Solutions • Internship</p>
//               <p>June 2024 - Present</p>
//               <p>Jalgaon, Maharashtra, India</p>
//             </div>
//           </div>

//           {/* Education Section */}
//           <div
//             className="card education-section"
//             onClick={() => setShowEducationModal(true)}
//           >
//             <h2>Education</h2>
//             <div className="education-item">
//               <h3>{educationData.school}</h3>
//               <p>{educationData.degree} in {educationData.field}</p>
//               <p>Jalgaon, Maharashtra, India</p>
//             </div>
//           </div>

//           {/* Projects Section */}
//           <div className="card projects-section">
//             <div className="section-header">
//               <h2>Projects</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowProjectModal(true)}
//               >
//                 Add Project
//               </button>
//             </div>

//             {projects.length > 0 ? (
//               projects.map(project => (
//                 <div key={project.id} className="project-item">
//                   <h3>{project.title}</h3>
//                   <p className="project-date">{project.date}</p>
//                   <p className="project-description">{project.description}</p>
//                   {project.url && (
//                     <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
//                       View Project
//                     </a>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No projects added yet.</p>
//             )}
//           </div>

//           {/* Skills Section */}
//           <div
//             className="card skills-section"
//             onClick={() => setShowSkillModal(true)}
//           >
//             <div className="section-header">
//               <h2>Skills</h2>
//               <button className="edit-btn">Edit</button>
//             </div>
//             <div className="skills-list">
//               {skills.map((skill, index) => (
//                 <span key={index} className="skill-tag">{skill}</span>
//               ))}
//             </div>
//           </div>

//           {/* Courses Section */}
//           <div className="card courses-section">
//             <div className="section-header">
//               <h2>Courses</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowCourseModal(true)}
//               >
//                 Add Course
//               </button>
//             </div>

//             {courses.length > 0 ? (
//               <ul className="courses-list">
//                 {courses.map(course => (
//                   <li key={course.id} className="course-item">
//                     <h3>{course.name}</h3>
//                     <p>{course.institution} • {course.completionDate}</p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No courses added yet.</p>
//             )}
//           </div>

//           {/* Certifications Section */}
//           <div className="card certifications-section">
//             <div className="section-header">
//               <h2>Licenses & Certifications</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowCertificationModal(true)}
//               >
//                 Add Certification
//               </button>
//             </div>

//             {certifications.length > 0 ? (
//               certifications.map(cert => (
//                 <div key={cert.id} className="certification-item">
//                   <h3>{cert.name}</h3>
//                   <p>{cert.issuer} • Issued {cert.date}</p>
//                   {cert.credentialId && (
//                     <p className="certification-id">Credential ID: {cert.credentialId}</p>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No certifications added yet.</p>
//             )}
//           </div>

//           {/* Languages Section */}
//           <div className="card languages-section">
//             <h2>Languages</h2>
//             <p>English</p>
//           </div>

//           {/* Recommendations Section */}
//           <div className="card recommendations-section">
//             <div className="section-header">
//               <h2>Recommendations</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowRecommendationModal(true)}
//               >
//                 Ask for a recommendation
//               </button>
//             </div>

//             {recommendations.length > 0 ? (
//               recommendations.map(rec => (
//                 <div key={rec.id} className="recommendation-item">
//                   <div className="recommendation-text">"{rec.text}"</div>
//                   <div className="recommendation-author">
//                     <strong>{rec.name}</strong> - {rec.position}
//                   </div>
//                   <div className="recommendation-details">
//                     {rec.relation} • {rec.date}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No recommendations yet. Ask colleagues to write you a recommendation!</p>
//             )}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="right-column">
//           {/* Open To Section */}
//           <div className="card open-to-section">
//             <div className="section-header">
//               <h3>Open to</h3>
//               <button className="edit-btn">Edit</button>
//             </div>
//             <p>Web Developer roles</p>
//             <div className="action-buttons">
//               <button className="action-btn">Add profile section</button>
//               <button className="action-btn">Enhance profile</button>
//             </div>
//           </div>

//           {/* Analytics Section */}
//           <div className="card analytics-section">
//             <div className="section-header">
//               <h3>Analytics</h3>
//               <span className="private">Private to you</span>
//             </div>
//             <p>80 profile views</p>
//             <p>Discover who's viewed your profile</p>
//           </div>

//           {/* Resources Section */}
//           <div className="card resources-section">
//             <h3>Resources</h3>
//             <p>Tell non-profits you're interested in getting involved with your time and skills</p>
//             <button className="get-started-btn">Get started</button>
//           </div>

//           {/* Premium Section */}
//           <div className="card premium-section">
//             <h3>Invest in your future</h3>
//             <p>Enjoy 50% off 2 months of LinkedIn Premium!</p>
//             <button className="premium-btn">Get 50% off today</button>
//           </div>
//         </div>
//       </div>

//       {/* Education Modal */}
//       {showEducationModal && (
//         <div className="modal-overlay">
//           <div className="education-modal">
//             <div className="modal-header">
//               <h2>Add education</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowEducationModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleEducationSubmit}>
//               <div className="form-section">
//                 <div className="checkbox-group">
//                   <input
//                     type="checkbox"
//                     id="notifyNetwork"
//                     name="notifyNetwork"
//                     checked={educationData.notifyNetwork}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                   />
//                   <label htmlFor="notifyNetwork">
//                     Turn on to notify your network of key profile changes (such as new education) and work anniversaries.
//                     <span className="learn-more"> Learn more about sharing profile changes.</span>
//                   </label>
//                 </div>
//                 <p className="required-note">* Indicates required</p>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="school">School*</label>
//                   <input
//                     type="text"
//                     id="school"
//                     name="school"
//                     value={educationData.school}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Government Polytechnic"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="degree">Degree</label>
//                   <input
//                     type="text"
//                     id="degree"
//                     name="degree"
//                     value={educationData.degree}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Diploma"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="field">Field of study</label>
//                   <input
//                     type="text"
//                     id="field"
//                     name="field"
//                     value={educationData.field}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Computer Engineering"
//                   />
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start date</label>
//                     <div className="date-inputs">
//                       <select
//                         name="startMonth"
//                         value={educationData.startMonth}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="startYear"
//                         value={educationData.startYear}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>End date (or expected)</label>
//                     <div className="date-inputs">
//                       <select
//                         name="endMonth"
//                         value={educationData.endMonth}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="endYear"
//                         value={educationData.endYear}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Grade</h3>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="grade"
//                     value={educationData.grade}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: 8.5 CGPA"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Activities and societies</label>
//                   <textarea
//                     name="activities"
//                     value={educationData.activities}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Coding Club, Sports Team"
//                   />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Description</h3>
//                 <p className="hint-text">We recommend adding your top 5 used in this experience. They'll also appear in your Skills section.</p>
//                 <div className="form-group">
//                   <textarea
//                     name="description"
//                     value={educationData.description}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                   />
//                 </div>
//                 <button type="button" className="add-skill-btn">
//                   + Add skill
//                 </button>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowEducationModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Experience Modal */}
//       {showExperienceModal && (
//         <div className="modal-overlay">
//           <div className="experience-modal">
//             <div className="modal-header">
//               <h2>Add experience</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowExperienceModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleExperienceSubmit}>
//               <div className="form-section">
//                 <div className="checkbox-group">
//                   <input
//                     type="checkbox"
//                     id="exp-notifyNetwork"
//                     name="notifyNetwork"
//                     checked={experienceData.notifyNetwork}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                   />
//                   <label htmlFor="exp-notifyNetwork">
//                     Turn on to notify your network of key profile changes (such as new job) and work anniversaries.
//                     <span className="learn-more"> Learn more about sharing profile changes.</span>
//                   </label>
//                 </div>
//                 <p className="required-note">* Indicates required</p>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="title">Title*</label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={experienceData.title}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Ex: Web Developer"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="company">Company*</label>
//                   <input
//                     type="text"
//                     id="company"
//                     name="company"
//                     value={experienceData.company}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Ex: Passion Software Solutions"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="employmentType">Employment type</label>
//                   <select
//                     id="employmentType"
//                     name="employmentType"
//                     value={experienceData.employmentType}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                   >
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Internship">Internship</option>
//                     <option value="Contract">Contract</option>
//                   </select>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start date*</label>
//                     <div className="date-inputs">
//                       <select
//                         name="startMonth"
//                         value={experienceData.startMonth}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="startYear"
//                         value={experienceData.startYear}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>End date (or expected)</label>
//                     <div className="date-inputs">
//                       <select
//                         name="endMonth"
//                         value={experienceData.endMonth}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                         disabled={experienceData.currentlyWorking}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="endYear"
//                         value={experienceData.endYear}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                         disabled={experienceData.currentlyWorking}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="currentlyWorking"
//                         checked={experienceData.currentlyWorking}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                       />
//                       I currently work here
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="location">Location</label>
//                   <input
//                     type="text"
//                     id="location"
//                     name="location"
//                     value={experienceData.location}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Ex: Jalgaon, Maharashtra, India"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="exp-description">Description</label>
//                   <textarea
//                     id="exp-description"
//                     name="description"
//                     value={experienceData.description}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Describe your responsibilities and achievements"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowExperienceModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Skill Modal */}
//       {showSkillModal && (
//         <div className="modal-overlay">
//           <div className="skill-modal">
//             <div className="modal-header">
//               <h2>Add skill</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowSkillModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleSkillSubmit}>
//               <div className="form-section">
//                 <p className="required-note">* Indicates required</p>
//                 <div className="form-group">
//                   <label htmlFor="skill">Skill*</label>
//                   <input
//                     type="text"
//                     id="skill"
//                     name="skill"
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     placeholder="Skill (ex: Project Management)"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Suggested based on your profile</h3>
//                 <div className="suggested-skills">
//                   {suggestedSkills.map((category, index) => (
//                     <div key={index} className="skill-category">
//                       <div className="skill-category-name">{category.category}</div>
//                       <div className="skill-tags">
//                         {category.skills.map((skill, skillIndex) => (
//                           <span
//                             key={skillIndex}
//                             className="suggested-skill-tag"
//                             onClick={() => setSkillInput(skill)}
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowSkillModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Project Modal */}
//       {showProjectModal && (
//         <div className="modal-overlay">
//           <div className="project-modal">
//             <div className="modal-header">
//               <h2>Add Project</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowProjectModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleProjectSubmit}>
//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="project-title">Project Name*</label>
//                   <input
//                     type="text"
//                     id="project-title"
//                     name="title"
//                     value={newProject.title}
//                     onChange={(e) => setNewProject({...newProject, title: e.target.value})}
//                     placeholder="Ex: E-commerce Website"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="project-description">Description*</label>
//                   <textarea
//                     id="project-description"
//                     name="description"
//                     value={newProject.description}
//                     onChange={(e) => setNewProject({...newProject, description: e.target.value})}
//                     placeholder="Describe your project and your contributions"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="project-date">Date Completed</label>
//                   <input
//                     type="text"
//                     id="project-date"
//                     name="date"
//                     value={newProject.date}
//                     onChange={(e) => setNewProject({...newProject, date: e.target.value})}
//                     placeholder="Ex: May 2024"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="project-url">Project URL</label>
//                   <input
//                     type="url"
//                     id="project-url"
//                     name="url"
//                     value={newProject.url}
//                     onChange={(e) => setNewProject({...newProject, url: e.target.value})}
//                     placeholder="Ex: https://github.com/username/project"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowProjectModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Course Modal */}
//       {showCourseModal && (
//         <div className="modal-overlay">
//           <div className="course-modal">
//             <div className="modal-header">
//               <h2>Add Course</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowCourseModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleCourseSubmit}>
//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="course-name">Course Name*</label>
//                   <input
//                     type="text"
//                     id="course-name"
//                     name="name"
//                     value={newCourse.name}
//                     onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
//                     placeholder="Ex: Advanced React"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="course-institution">Institution*</label>
//                   <input
//                     type="text"
//                     id="course-institution"
//                     name="institution"
//                     value={newCourse.institution}
//                     onChange={(e) => setNewCourse({...newCourse, institution: e.target.value})}
//                     placeholder="Ex: Udemy, Coursera"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="course-date">Completion Date</label>
//                   <input
//                     type="text"
//                     id="course-date"
//                     name="completionDate"
//                     value={newCourse.completionDate}
//                     onChange={(e) => setNewCourse({...newCourse, completionDate: e.target.value})}
//                     placeholder="Ex: April 2024"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowCourseModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Certification Modal */}
//       {showCertificationModal && (
//         <div className="modal-overlay">
//           <div className="certification-modal">
//             <div className="modal-header">
//               <h2>Add Certification</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowCertificationModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleCertificationSubmit}>
//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="cert-name">Certification Name*</label>
//                   <input
//                     type="text"
//                     id="cert-name"
//                     name="name"
//                     value={newCertification.name}
//                     onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
//                     placeholder="Ex: AWS Certified Developer"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cert-issuer">Issuing Organization*</label>
//                   <input
//                     type="text"
//                     id="cert-issuer"
//                     name="issuer"
//                     value={newCertification.issuer}
//                     onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
//                     placeholder="Ex: Amazon Web Services"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cert-date">Issue Date*</label>
//                   <input
//                     type="text"
//                     id="cert-date"
//                     name="date"
//                     value={newCertification.date}
//                     onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
//                     placeholder="Ex: March 2024"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cert-id">Credential ID</label>
//                   <input
//                     type="text"
//                     id="cert-id"
//                     name="credentialId"
//                     value={newCertification.credentialId}
//                     onChange={(e) => setNewCertification({...newCertification, credentialId: e.target.value})}
//                     placeholder="Ex: AWS123456"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowCertificationModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState } from "react";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/student/Navbar";

const ProfilePage = () => {
  // Profile picture URL
  const profilePicUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg";

  // state for search bar
    const [searchQuery, setSearchQuery] = useState("");
  
  // State for education modal
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [educationData, setEducationData] = useState({
    school: "Government Polytechnic",
    degree: "Diploma",
    field: "Computer Engineering",
    grade: "",
    activities: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    notifyNetwork: true,
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    profileUrl: "https://www.linkedin.com",
    email: "rashm7@gmail.com",
    phone: "",
    phoneType: "",
    address: "",
    birthdayMonth: "",
    birthdayDay: "",
    website: "",
    messaging: "",
  });

  // State for experience modal
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    employmentType: "Full-time",
    currentlyWorking: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    location: "",
    description: "",
    notifyNetwork: true,
  });
  const [showEditIntroModal, setShowEditIntroModal] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Priya",
    lastName: "P",
    additionalName: "",
    pronouns: "",
    headline: "Computer Engineering",
    industry: "IT Services and IT Consulting",
    school: "Government Polytechnic",
    showSchool: true,
    country: "India",
    city: "Jalgaon, Maharashtra",
    email: "",
    phone: "",
    phoneType: "",
    address: "",
    birthdayMonth: "",
    birthdayDay: "",
    website: "",
  });
  // State for skill modal
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([
    "Web Development",
    "JavaScript",
    "React",
    "HTML/CSS",
  ]);

  // State for project modal
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      description:
        "Developed a full-stack e-commerce platform with React and Node.js",
      date: "May 2024",
      url: "https://github.com/username/ecommerce",
    },
  ]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    date: "",
    url: "",
  });

  // State for course modal
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Advanced React",
      institution: "Udemy",
      completionDate: "April 2024",
    },
  ]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    institution: "",
    completionDate: "",
  });

  // State for certification modal
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "March 2024",
      credentialId: "AWS123456",
    },
  ]);
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
  });

  // State for recommendation modal
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      text: "Priya is an excellent developer with strong problem-solving skills.",
      name: "Rajesh Kumar",
      position: "Senior Developer at Tech Solutions",
      relation: "Worked together on multiple projects",
      date: "June 2024",
    },
  ]);
  const [newRecommendation, setNewRecommendation] = useState({
    recipient: "",
    position: "",
    message: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Suggested skills based on profile
  const suggestedSkills = [
    {
      category: "Frontend",
      skills: [
        "React.js",
        "Git",
        "AngularJS",
        "Databases",
        "Software Development",
      ],
    },
    {
      category: "Programming",
      skills: ["Data Structures", "C#", "Object-Oriented Programming (OOP)"],
    },
    { category: "Web", skills: ["Responsive Web Design", "Web Development"] },
  ];

  // Common input change handler
  const handleInputChange = (e, setter) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    console.log("Education data saved:", educationData);
    setShowEducationModal(false);
  };

  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    console.log("Experience data saved:", experienceData);
    setShowExperienceModal(false);
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
    }
    setShowSkillModal(false);
    setSkillInput("");
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    setProjects([
      ...projects,
      {
        ...newProject,
        id: projects.length + 1,
      },
    ]);
    setNewProject({
      title: "",
      description: "",
      date: "",
      url: "",
    });
    setShowProjectModal(false);
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    setCourses([
      ...courses,
      {
        ...newCourse,
        id: courses.length + 1,
      },
    ]);
    setNewCourse({
      name: "",
      institution: "",
      completionDate: "",
    });
    setShowCourseModal(false);
  };

  const handleCertificationSubmit = (e) => {
    e.preventDefault();
    setCertifications([
      ...certifications,
      {
        ...newCertification,
        id: certifications.length + 1,
      },
    ]);
    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
    });
    setShowCertificationModal(false);
  };

  const handleRecommendationSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this request to the backend
    console.log("Recommendation request sent:", newRecommendation);
    setShowRecommendationModal(false);
    setNewRecommendation({
      recipient: "",
      position: "",
      message: "",
    });
  };

  return (<>
    <h1 className="text-3xl font-bold text-center my-8">
        Electrosoft Alumni Platform
      </h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        <a href="/startup-profile">Go to Startup Profile</a>
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-4">
        <a href="/industry-profile">Go to Industry Profile</a>
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded mb-4 ml-4">
        <a href="/college-profile">Go to College Profile</a>
      </button>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded mb-4 ml-4">
        <a href="/student-profile">Go to Student Profile</a>
      </button>
      <Navbar />
      {/* Search Container */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-center">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search industries, projects, opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>{" "}
    <div className="profile-container">
      {/* Header Section */}

      {showEditIntroModal && (
        <div className="modal-overlay">
          <div className="edit-intro-modal">
            <div className="modal-header">
              <h2>Edit intro</h2>
              <button
                className="close-btn"
                onClick={() => setShowEditIntroModal(false)}
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowEditIntroModal(false);
                console.log("Profile data saved:", profileData);
              }}
            >
              <div className="form-section">
                <p className="required-note">* Indicates required</p>

                <div className="form-group">
                  <label htmlFor="firstName">First name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="additionalName">Additional name</label>
                  <input
                    type="text"
                    id="additionalName"
                    name="additionalName"
                    value={profileData.additionalName}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                </div>

                <div className="form-group">
                  <label>Name pronunciation</label>
                  <p className="hint-text">
                    This can only be added using our mobile app
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="pronouns">Pronouns</label>
                  <select
                    id="pronouns"
                    name="pronouns"
                    value={profileData.pronouns}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  >
                    <option value="">Please select</option>
                    <option value="she/her">She/Her</option>
                    <option value="he/him">He/Him</option>
                    <option value="they/them">They/Them</option>
                  </select>
                  <p className="hint-text">
                    Let others know how to refer to you.{" "}
                    <span className="learn-more">
                      Learn more about gender pronouns.
                    </span>
                  </p>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="headline">Headline*</label>
                  <input
                    type="text"
                    id="headline"
                    name="headline"
                    value={profileData.headline}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                    required
                  />
                  <p className="hint-text">Get AI suggestions with Premium</p>
                </div>

                <div className="form-group">
                  <label>Current position</label>
                  <button type="button" className="add-position-btn">
                    + Add new position
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="industry">Industry*</label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={profileData.industry}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                    required
                  />
                  <p className="hint-text">Learn more about industry options</p>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="school">Education</label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={profileData.school}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <button
                    type="button"
                    className="add-education-btn"
                    onClick={() => setShowEducationModal(true)}
                  >
                    + Add new education
                  </button>
                  {showEducationModal && (
                    <div className="modal-overlay">
                      <div className="modal">
                        <h2>Add Education</h2>

                        <label>School *</label>
                        <input
                          type="text"
                          placeholder="Ex: Boston University"
                        />

                        <label>Degree</label>
                        <input type="text" placeholder="Ex: Bachelor’s" />

                        <label>Field of Study</label>
                        <input type="text" placeholder="Ex: Business" />

                        <label>Start Date</label>
                        <div className="date-group">
                          <select>
                            <option>Month</option>
                          </select>
                          <select>
                            <option>Year</option>
                          </select>
                        </div>

                        <label>End Date (or expected)</label>
                        <div className="date-group">
                          <select>
                            <option>Month</option>
                          </select>
                          <select>
                            <option>Year</option>
                          </select>
                        </div>

                        <label>Grade</label>
                        <input type="text" />

                        <label>Activities and Societies</label>
                        <textarea
                          placeholder="Ex: Volleyball, Coding Club"
                          maxLength={500}
                        ></textarea>
                        <p>0/500</p>

                        <label>Description</label>
                        <textarea
                          placeholder="Description..."
                          maxLength={1000}
                        ></textarea>
                        <p>0/1000</p>

                        <label>Skills (Top 5)</label>
                        <input type="text" placeholder="Add skill" />

                        <label>Media</label>
                        <input type="file" accept="image/*,.pdf,.doc,.ppt" />

                        <label className="checkbox-label">
                          <input type="checkbox" />
                          Notify your network of key profile changes
                        </label>

                        <div className="modal-actions">
                          <button onClick={() => setShowEducationModal(false)}>
                            Cancel
                          </button>
                          <button className="save-btn">Save</button>
                        </div>
                      </div>
                    </div>
                  )}

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showSchool"
                      checked={profileData.showSchool}
                      onChange={(e) => handleInputChange(e, setProfileData)}
                    />
                    Show school in my intro
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h3>Location</h3>
                <div className="form-group">
                  <label htmlFor="country">Country/Region*</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={profileData.country}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profileData.city}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Contact info</h3>
                <p className="hint-text">
                  Add or edit your profile URL, email, and more
                </p>
                <button
                  type="button"
                  className="edit-contact-btn"
                  onClick={() => setShowContactModal(true)}
                >
                  ✏️ Edit contact info
                </button>

                {showContactModal && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <h2>Edit Contact Info</h2>

                      {/* Profile URL */}
                      <label>Profile URL</label>
                      <input
                        type="text"
                        placeholder="https://www.linkedin.com"
                      />

                      {/* Email */}
                      <label>Email</label>
                      <input type="email" placeholder="rashm7@gmail.com" />

                      {/* Phone Number */}
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 9876543210" />

                      {/* Phone Type */}
                      <label>Phone Type</label>
                      <select>
                        <option>Please select</option>
                        <option>Mobile</option>
                        <option>Work</option>
                        <option>Home</option>
                      </select>

                      {/* Address */}
                      <label>Address</label>
                      <textarea
                        placeholder="Enter your address"
                        maxLength={220}
                      ></textarea>
                      <p>0/220</p>

                      {/* Birthday */}
                      <label>Birthday</label>
                      <div className="date-group">
                        <select>
                          <option>Month</option>
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                          <option>April</option>
                          <option>May</option>
                          <option>June</option>
                          <option selected>July</option>
                          <option>August</option>
                          <option>September</option>
                          <option>October</option>
                          <option>November</option>
                          <option>December</option>
                        </select>
                        <select>
                          <option>Day</option>
                          {Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Website */}
                      <label>Website</label>
                      <input type="url" placeholder="https://yourwebsite.com" />

                      {/* Instant Messaging */}
                      <label>Instant Messaging</label>
                      <input
                        type="text"
                        placeholder="WhatsApp, Telegram, etc."
                      />

                      {/* Actions */}
                      <div className="modal-actions">
                        <button onClick={() => setShowContactModal(false)}>
                          Cancel
                        </button>
                        <button className="save-btn">Save</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditIntroModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="profile-header">
        <div className="cover-photo"></div>
        <div className="profile-info">
          <div className="profile-pic">
            <img
              src={profilePicUrl}
              alt="Profile"
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          <div className="profile-details">
            <h1>Priya P</h1>
            <p className="headline">Computer Engineering</p>
            <p className="location">
              Jalgaon, Maharashtra, India • Contact info
            </p>
            <button className="open-to-btn">Open to</button>
          </div>
        </div>
        <button
          className="edit-intro-btn"
          onClick={() => setShowEditIntroModal(true)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="profile-nav">
        <button className="active">About</button>
        <button>Activity</button>
        <button
          onClick={() => {
            setExperienceData({
              title: "",
              company: "",
              employmentType: "Full-time",
              currentlyWorking: false,
              startMonth: "",
              startYear: "",
              endMonth: "",
              endYear: "",
              location: "",
              description: "",
              notifyNetwork: true,
            });
            setShowExperienceModal(true);
          }}
        >
          Experience
        </button>
        <button onClick={() => setShowEducationModal(true)}>Education</button>
        <button onClick={() => setShowSkillModal(true)}>Skills</button>
        <button onClick={() => setShowRecommendationModal(true)}>
          Recommendations
        </button>
      </nav>

      {/* Main Content */}
      <div className="profile-content">
        {/* Left Column */}
        <div className="left-column">
          {/* About Section */}
          <div className="card about-section">
            <h2>About</h2>
            <p>Aboard/industrial organization</p>
            <button className="show-btn">Show more</button>
          </div>

          {/* Experience Section */}
          <div
            className="card experience-section"
            onClick={() => {
              setExperienceData({
                title: "Web Developer",
                company: "Passion Software Solutions",
                employmentType: "Internship",
                currentlyWorking: false,
                startMonth: "June",
                startYear: "2024",
                endMonth: "",
                endYear: "",
                location: "Jalgaon, Maharashtra, India",
                description:
                  "During my 6-week internship at Passion Software, I had the opportunity to contribute to various web development projects.",
                notifyNetwork: true,
              });
              setShowExperienceModal(true);
            }}
          >
            <h2>Experience</h2>
            <div className="experience-item">
              <h3>Web Developer</h3>
              <p>Passion Software Solutions • Internship</p>
              <p>June 2024 - Present</p>
              <p>Jalgaon, Maharashtra, India</p>
            </div>
          </div>

          {/* Education Section */}
          <div
            className="card education-section"
            onClick={() => setShowEducationModal(true)}
          >
            <h2>Education</h2>
            <div className="education-item">
              <h3>{educationData.school}</h3>
              <p>
                {educationData.degree} in {educationData.field}
              </p>
              <p>Jalgaon, Maharashtra, India</p>
            </div>
          </div>

          {/* Projects Section */}
          <div className="card projects-section">
            <div className="section-header">
              <h2>Projects</h2>
              <button
                className="edit-btn"
                onClick={() => setShowProjectModal(true)}
              >
                Add Project
              </button>
            </div>

            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="project-item">
                  <h3>{project.title}</h3>
                  <p className="project-date">{project.date}</p>
                  <p className="project-description">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p>No projects added yet.</p>
            )}
          </div>

          {/* Skills Section */}
          <div
            className="card skills-section"
            onClick={() => setShowSkillModal(true)}
          >
            <div className="section-header">
              <h2>Skills</h2>
              <button className="edit-btn">Edit</button>
            </div>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div className="card courses-section">
            <div className="section-header">
              <h2>Courses</h2>
              <button
                className="edit-btn"
                onClick={() => setShowCourseModal(true)}
              >
                Add Course
              </button>
            </div>

            {courses.length > 0 ? (
              <ul className="courses-list">
                {courses.map((course) => (
                  <li key={course.id} className="course-item">
                    <h3>{course.name}</h3>
                    <p>
                      {course.institution} • {course.completionDate}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses added yet.</p>
            )}
          </div>

          {/* Certifications Section */}
          <div className="card certifications-section">
            <div className="section-header">
              <h2>Licenses & Certifications</h2>
              <button
                className="edit-btn"
                onClick={() => setShowCertificationModal(true)}
              >
                Add Certification
              </button>
            </div>

            {certifications.length > 0 ? (
              certifications.map((cert) => (
                <div key={cert.id} className="certification-item">
                  <h3>{cert.name}</h3>
                  <p>
                    {cert.issuer} • Issued {cert.date}
                  </p>
                  {cert.credentialId && (
                    <p className="certification-id">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No certifications added yet.</p>
            )}
          </div>

          {/* Languages Section */}
          <div className="card languages-section">
            <h2>Languages</h2>
            <p>English</p>
          </div>

          {/* Recommendations Section */}
          <div className="card recommendations-section">
            <div className="section-header">
              <h2>Recommendations</h2>
              <button
                className="edit-btn"
                onClick={() => setShowRecommendationModal(true)}
              >
                Ask for a recommendation
              </button>
            </div>

            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <div key={rec.id} className="recommendation-item">
                  <div className="recommendation-text">"{rec.text}"</div>
                  <div className="recommendation-author">
                    <strong>{rec.name}</strong> - {rec.position}
                  </div>
                  <div className="recommendation-details">
                    {rec.relation} • {rec.date}
                  </div>
                </div>
              ))
            ) : (
              <p>
                No recommendations yet. Ask colleagues to write you a
                recommendation!
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Add to Profile Section */}
          <div className="card add-to-profile-section">
            <h2>Add to profile</h2>
            <div className="add-to-profile-grid">
              {/* Core Section */}
              <div className="add-to-profile-group">
                <h3>Core</h3>
                <div className="add-to-profile-items">
                  <div
                    className="add-to-profile-item"
                    onClick={() => setShowCertificationModal(true)}
                  >
                    <div className="add-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                    <h4>Licenses & certifications</h4>
                    <p>Showcase your credentials</p>
                  </div>

                  <div
                    className="add-to-profile-item"
                    onClick={() => setShowProjectModal(true)}
                  >
                    <div className="add-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                    <h4>Projects</h4>
                    <p>Highlight your work</p>
                  </div>

                  <div
                    className="add-to-profile-item"
                    onClick={() => setShowCourseModal(true)}
                  >
                    <div className="add-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                    <h4>Courses</h4>
                    <p>Display your learning</p>
                  </div>

                  <div
                    className="add-to-profile-item"
                    onClick={() => setShowRecommendationModal(true)}
                  >
                    <div className="add-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                    <h4>Recommendations</h4>
                    <p>Get endorsed by others</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Open To Section */}
          <div className="card open-to-section">
            <div className="section-header">
              <h3>Open to</h3>
              <button className="edit-btn">Edit</button>
            </div>
            <p>Web Developer roles</p>
            <div className="action-buttons">
              <button className="action-btn">Add profile section</button>
              <button className="action-btn">Enhance profile</button>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="card analytics-section">
            <div className="section-header">
              <h3>Analytics</h3>
              <span className="private">Private to you</span>
            </div>
            <p>80 profile views</p>
            <p>Discover who's viewed your profile</p>
          </div>

          {/* Resources Section */}
          <div className="card resources-section">
            <h3>Resources</h3>
            <p>
              Tell non-profits you're interested in getting involved with your
              time and skills
            </p>
            <button className="get-started-btn">Get started</button>
          </div>

          {/* Premium Section */}
          <div className="card premium-section">
            <h3>Invest in your future</h3>
            <p>Enjoy 50% off 2 months of LinkedIn Premium!</p>
            <button className="premium-btn">Get 50% off today</button>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      {showEducationModal && (
        <div className="modal-overlay">
          <div className="education-modal">
            <div className="modal-header">
              <h2>Add education</h2>
              <button
                className="close-btn"
                onClick={() => setShowEducationModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleEducationSubmit}>
              <div className="form-section">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="notifyNetwork"
                    name="notifyNetwork"
                    checked={educationData.notifyNetwork}
                    onChange={(e) => handleInputChange(e, setEducationData)}
                  />
                  <label htmlFor="notifyNetwork">
                    Turn on to notify your network of key profile changes (such
                    as new education) and work anniversaries.
                    <span className="learn-more">
                      {" "}
                      Learn more about sharing profile changes.
                    </span>
                  </label>
                </div>
                <p className="required-note">* Indicates required</p>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="school">School*</label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={educationData.school}
                    onChange={(e) => handleInputChange(e, setEducationData)}
                    placeholder="Ex: Boston University"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="degree">Degree</label>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    value={educationData.degree}
                    onChange={(e) => handleInputChange(e, setEducationData)}
                    placeholder="Ex: Bachelor's"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="field">Field of study</label>
                  <input
                    type="text"
                    id="field"
                    name="field"
                    value={educationData.field}
                    onChange={(e) => handleInputChange(e, setEducationData)}
                    placeholder="Ex: Business"
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Start date</label>
                    <div className="date-inputs">
                      <select
                        name="startMonth"
                        value={educationData.startMonth}
                        onChange={(e) => handleInputChange(e, setEducationData)}
                      >
                        <option value="">Month</option>
                        {months.map((month, i) => (
                          <option key={i} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name="startYear"
                        value={educationData.startYear}
                        onChange={(e) => handleInputChange(e, setEducationData)}
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>End date (or expected)</label>
                    <div className="date-inputs">
                      <select
                        name="endMonth"
                        value={educationData.endMonth}
                        onChange={(e) => handleInputChange(e, setEducationData)}
                      >
                        <option value="">Month</option>
                        {months.map((month, i) => (
                          <option key={i} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name="endYear"
                        value={educationData.endYear}
                        onChange={(e) => handleInputChange(e, setEducationData)}
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Grade</h3>
                <div className="form-group">
                  <input
                    type="text"
                    name="grade"
                    value={educationData.grade}
                    onChange={(e) => handleInputChange(e, setEducationData)}
                    placeholder="Ex: 3.8 GPA"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Activities and societies</h3>
                <div className="form-group">
                  <textarea
                    name="activities"
                    value={educationData.activities}
                    onChange={(e) => handleInputChange(e, setEducationData)}
                    placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Description</h3>
                <p className="hint-text">
                  We recommend adding your top 5 used in this experience.
                  They'll also appear in your Skills section.
                </p>
                <div className="form-group">
                  <textarea
                    name="description"
                    value={educationData.description}
                    onChange={(e) => handleInputChange(e, setEducationData)}
                  />
                </div>
                <button type="button" className="add-skill-btn">
                  + Add skill
                </button>
              </div>

              <div className="form-section">
                <h3>Media</h3>
                <p className="hint-text">
                  Add media like images, documents, sites or presentations.
                  Learn more about media file types supported
                </p>
                <button type="button" className="add-skill-btn">
                  + Add media
                </button>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEducationModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {showExperienceModal && (
        <div className="modal-overlay">
          <div className="experience-modal">
            <div className="modal-header">
              <h2>Add experience</h2>
              <button
                className="close-btn"
                onClick={() => setShowExperienceModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleExperienceSubmit}>
              <div className="form-section">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="exp-notifyNetwork"
                    name="notifyNetwork"
                    checked={experienceData.notifyNetwork}
                    onChange={(e) => handleInputChange(e, setExperienceData)}
                  />
                  <label htmlFor="exp-notifyNetwork">
                    Turn on to notify your network of key profile changes (such
                    as new job) and work anniversaries.
                    <span className="learn-more">
                      {" "}
                      Learn more about sharing profile changes.
                    </span>
                  </label>
                </div>
                <p className="required-note">* Indicates required</p>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="title">Title*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={experienceData.title}
                    onChange={(e) => handleInputChange(e, setExperienceData)}
                    placeholder="Ex: Web Developer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company*</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={experienceData.company}
                    onChange={(e) => handleInputChange(e, setExperienceData)}
                    placeholder="Ex: Passion Software Solutions"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="employmentType">Employment type</label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={experienceData.employmentType}
                    onChange={(e) => handleInputChange(e, setExperienceData)}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start date*</label>
                    <div className="date-inputs">
                      <select
                        name="startMonth"
                        value={experienceData.startMonth}
                        onChange={(e) =>
                          handleInputChange(e, setExperienceData)
                        }
                      >
                        <option value="">Month</option>
                        {months.map((month, i) => (
                          <option key={i} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name="startYear"
                        value={experienceData.startYear}
                        onChange={(e) =>
                          handleInputChange(e, setExperienceData)
                        }
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>End date (or expected)</label>
                    <div className="date-inputs">
                      <select
                        name="endMonth"
                        value={experienceData.endMonth}
                        onChange={(e) =>
                          handleInputChange(e, setExperienceData)
                        }
                        disabled={experienceData.currentlyWorking}
                      >
                        <option value="">Month</option>
                        {months.map((month, i) => (
                          <option key={i} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name="endYear"
                        value={experienceData.endYear}
                        onChange={(e) =>
                          handleInputChange(e, setExperienceData)
                        }
                        disabled={experienceData.currentlyWorking}
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="currentlyWorking"
                        checked={experienceData.currentlyWorking}
                        onChange={(e) =>
                          handleInputChange(e, setExperienceData)
                        }
                      />
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={experienceData.location}
                    onChange={(e) => handleInputChange(e, setExperienceData)}
                    placeholder="Ex: Jalgaon, Maharashtra, India"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exp-description">Description</label>
                  <textarea
                    id="exp-description"
                    name="description"
                    value={experienceData.description}
                    onChange={(e) => handleInputChange(e, setExperienceData)}
                    placeholder="Describe your responsibilities and achievements"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowExperienceModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="modal-overlay">
          <div className="skill-modal">
            <div className="modal-header">
              <h2>Add skill</h2>
              <button
                className="close-btn"
                onClick={() => setShowSkillModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSkillSubmit}>
              <div className="form-section">
                <p className="required-note">* Indicates required</p>
                <div className="form-group">
                  <label htmlFor="skill">Skill*</label>
                  <input
                    type="text"
                    id="skill"
                    name="skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Skill (ex: Project Management)"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Suggested based on your profile</h3>
                <div className="suggested-skills">
                  {suggestedSkills.map((category, index) => (
                    <div key={index} className="skill-category">
                      <div className="skill-category-name">
                        {category.category}
                      </div>
                      <div className="skill-tags">
                        {category.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="suggested-skill-tag"
                            onClick={() => setSkillInput(skill)}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowSkillModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="modal-overlay">
          <div className="project-modal">
            <div className="modal-header">
              <h2>Add Project</h2>
              <button
                className="close-btn"
                onClick={() => setShowProjectModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleProjectSubmit}>
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="project-title">Project Name*</label>
                  <input
                    type="text"
                    id="project-title"
                    name="title"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    placeholder="Ex: E-commerce Website"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="project-description">Description*</label>
                  <textarea
                    id="project-description"
                    name="description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your project and your contributions"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="project-date">Date Completed</label>
                  <input
                    type="text"
                    id="project-date"
                    name="date"
                    value={newProject.date}
                    onChange={(e) =>
                      setNewProject({ ...newProject, date: e.target.value })
                    }
                    placeholder="Ex: May 2024"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="project-url">Project URL</label>
                  <input
                    type="url"
                    id="project-url"
                    name="url"
                    value={newProject.url}
                    onChange={(e) =>
                      setNewProject({ ...newProject, url: e.target.value })
                    }
                    placeholder="Ex: https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowProjectModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {showCourseModal && (
        <div className="modal-overlay">
          <div className="course-modal">
            <div className="modal-header">
              <h2>Add Course</h2>
              <button
                className="close-btn"
                onClick={() => setShowCourseModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCourseSubmit}>
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="course-name">Course Name*</label>
                  <input
                    type="text"
                    id="course-name"
                    name="name"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    placeholder="Ex: Advanced React"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course-institution">Institution*</label>
                  <input
                    type="text"
                    id="course-institution"
                    name="institution"
                    value={newCourse.institution}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        institution: e.target.value,
                      })
                    }
                    placeholder="Ex: Udemy, Coursera"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course-date">Completion Date</label>
                  <input
                    type="text"
                    id="course-date"
                    name="completionDate"
                    value={newCourse.completionDate}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        completionDate: e.target.value,
                      })
                    }
                    placeholder="Ex: April 2024"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCourseModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {showCertificationModal && (
        <div className="modal-overlay">
          <div className="certification-modal">
            <div className="modal-header">
              <h2>Add Certification</h2>
              <button
                className="close-btn"
                onClick={() => setShowCertificationModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCertificationSubmit}>
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="cert-name">Certification Name*</label>
                  <input
                    type="text"
                    id="cert-name"
                    name="name"
                    value={newCertification.name}
                    onChange={(e) =>
                      setNewCertification({
                        ...newCertification,
                        name: e.target.value,
                      })
                    }
                    placeholder="Ex: AWS Certified Developer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cert-issuer">Issuing Organization*</label>
                  <input
                    type="text"
                    id="cert-issuer"
                    name="issuer"
                    value={newCertification.issuer}
                    onChange={(e) =>
                      setNewCertification({
                        ...newCertification,
                        issuer: e.target.value,
                      })
                    }
                    placeholder="Ex: Amazon Web Services"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cert-date">Issue Date*</label>
                  <input
                    type="text"
                    id="cert-date"
                    name="date"
                    value={newCertification.date}
                    onChange={(e) =>
                      setNewCertification({
                        ...newCertification,
                        date: e.target.value,
                      })
                    }
                    placeholder="Ex: March 2024"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cert-id">Credential ID</label>
                  <input
                    type="text"
                    id="cert-id"
                    name="credentialId"
                    value={newCertification.credentialId}
                    onChange={(e) =>
                      setNewCertification({
                        ...newCertification,
                        credentialId: e.target.value,
                      })
                    }
                    placeholder="Ex: AWS123456"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCertificationModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recommendation Modal */}
      {showRecommendationModal && (
        <div className="modal-overlay">
          <div className="recommendation-modal">
            <div className="modal-header">
              <h2>Request Recommendation</h2>
              <button
                className="close-btn"
                onClick={() => setShowRecommendationModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleRecommendationSubmit}>
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="recommendation-who">
                    Who do you want to ask?*
                  </label>
                  <input
                    type="text"
                    id="recommendation-who"
                    value={newRecommendation.recipient}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        recipient: e.target.value,
                      })
                    }
                    placeholder="Search by name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recommendation-position">
                    What was your position when you worked together?*
                  </label>
                  <input
                    type="text"
                    id="recommendation-position"
                    value={newRecommendation.position}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        position: e.target.value,
                      })
                    }
                    placeholder="Ex: Web Developer Intern"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recommendation-message">
                    Message (optional)
                  </label>
                  <textarea
                    id="recommendation-message"
                    value={newRecommendation.message}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        message: e.target.value,
                      })
                    }
                    placeholder="Add a personal message"
                    rows="4"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowRecommendationModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfilePage;
