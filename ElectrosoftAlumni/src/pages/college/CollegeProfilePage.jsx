import React, { useState } from 'react'
import CollegeProfileHeader from '../../components/college/CollegeProfileHeader'
import CollegeNotifications from '../../components/college/CollegeNotifications'

const NAV_OPTIONS = [
  { id: "college-info", name: "College Info", icon: "🏫" },
  { id: "course-fees", name: "Course Fees", icon: "💸" },
  { id: "review", name: "Review", icon: "⭐" },
  { id: "admission", name: "Admission", icon: "📝" },
  { id: "placement", name: "Placement", icon: "💼" },
  { id: "faculty", name: "Faculty", icon: "👨‍🏫" }
];

const CollegeProfilePage = () => {
  const [activeTab, setActiveTab] = useState(NAV_OPTIONS[0].id);
  const [editMode, setEditMode] = useState({
    'college-info': false,
    'course-fees': false,
    'review': false,
    'admission': false,
    'placement': false,
    'faculty': false
  });

  const initialData = {
    'college-info': {
      name: 'Indian Institute of Technology Kanpur (IIT Kanpur)',
      description: 'IIT Kanpur (IITK) is a top-ranked public technical university in Kanpur, Uttar Pradesh, India, established in 1959. It is known for its academic excellence, research, and innovation in engineering and science.',
      location: 'Kanpur, Uttar Pradesh, India',
      established: '1959',
      campusArea: '1055 acres',
      nirfRank: '4',
      accreditation: 'AICTE, UGC, NAAC',
      students: '8000+',
      faculty: '450+',
      programs: 'B.Tech, M.Tech, MSc, MBA, Ph.D.',
      dualPrograms: 'Interdisciplinary and Dual Degree Programs',
      website: 'https://www.iitk.ac.in/',
      highlights: [
        'Modern campus, advanced labs, and research centers',
        'Strong industry connections and placements',
        'Active student life and vibrant campus culture',
        'Global collaborations and alumni network'
      ]
    },
    'course-fees': {
      btech: '₹2,00,000',
      mtech: '₹1,50,000',
      msc: '₹50,000',
      mba: '₹2,50,000',
      phd: '₹60,000',
      scholarships: [
        'Merit-cum-Means Scholarships for deserving students',
        'National and State-level scholarships',
        'Fee waivers for economically weaker sections',
        'Research and teaching assistantships for PG/PhD students'
      ],
      hostel: '₹20,000/year',
      mess: '₹18,000/year (approx.)',
      other: '₹10,000/year'
    },
    'review': {
      rating: '4.7',
      comments: [
        '“Excellent academic environment and research facilities.”',
        '“Placements are top-notch, with many global recruiters.”',
        '“Campus life is amazing, with lots of clubs and fests.”',
        '“Supportive faculty and great peer group.”'
      ],
      breakdown: {
        academics: '4.8/5',
        placements: '4.9/5',
        infrastructure: '4.7/5',
        faculty: '4.8/5',
        campusLife: '4.6/5',
        value: '4.5/5'
      }
    },
    'admission': {
      eligibility: [
        'B.Tech: 10+2 (Physics, Chemistry, Math) + JEE Advanced',
        'M.Tech: GATE + relevant UG degree',
        'MBA: CAT + UG degree',
        'MSc: JAM + UG degree',
        'Ph.D.: GATE/NET + PG degree'
      ],
      steps: [
        'Register online at the IIT Kanpur admissions portal',
        'Fill out the application form and upload documents',
        'Pay the application fee',
        'Appear for the required entrance exam(s)',
        'Participate in counseling/interview (if applicable)',
        'Check merit list and confirm admission'
      ],
      dates: [
        'JEE Advanced: May 2025',
        'GATE: February 2025',
        'CAT: November 2025',
        'JAM: February 2025',
        'Application Deadlines: Check official website'
      ]
    },
    'placement': {
      highlights: [
        'Highest Package: ₹2.4 Crore (International)',
        'Average Package: ₹18.5 LPA',
        'Top Recruiters: Google, Microsoft, Amazon, Goldman Sachs, Tata, Reliance, Flipkart, and more',
        'Over 300 companies participated',
        'Strong alumni network in top global firms'
      ],
      internships: [
        'Summer internships with leading companies',
        'Research internships in India and abroad',
        'Entrepreneurship and startup support'
      ],
      support: [
        'Dedicated Career Development Cell',
        'Resume building, mock interviews, and workshops',
        'Alumni mentoring and networking events'
      ]
    },
    'faculty': {
      strength: [
        '450+ highly qualified faculty members',
        'Many with international research experience',
        'Regular guest lectures by global experts'
      ],
      departments: [
        'Computer Science & Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Chemical Engineering',
        'Civil Engineering',
        'Aerospace Engineering',
        'Physics',
        'Chemistry',
        'Mathematics & Statistics',
        'Humanities & Social Sciences',
        'Management Sciences',
        'Biological Sciences & Bioengineering'
      ],
      achievements: [
        'Numerous awards and recognitions at national and international levels',
        'Fellowships from national and international academies',
        'Extensive research publications and patents'
      ]
    }
  };

  const [formData, setFormData] = useState(initialData);

  const handleEditToggle = (tab) => {
    setEditMode((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  const handleInputChange = (tab, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (tab, field, idx, value) => {
    setFormData((prev) => {
      const arr = [...prev[tab][field]];
      arr[idx] = value;
      return {
        ...prev,
        [tab]: {
          ...prev[tab],
          [field]: arr
        }
      };
    });
  };

  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case "college-info":
        if (editMode['college-info']) {
          return (
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <input
                  className="text-2xl font-bold text-blue-900 mb-6 flex-1 bg-white border border-gray-300 rounded px-2 py-1"
                  value={formData['college-info'].name}
                  onChange={e => handleInputChange('college-info', 'name', e.target.value)}
                />
                <button
                  className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                  onClick={() => handleEditToggle('college-info')}
                >
                  Save
                </button>
              </div>
              <textarea
                className="w-full mb-6 text-lg leading-8 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                value={formData['college-info'].description}
                onChange={e => handleInputChange('college-info', 'description', e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-3 text-lg">Key Facts</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                    <li><input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].location} onChange={e => handleInputChange('college-info', 'location', e.target.value)} /></li>
                    <li><input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].established} onChange={e => handleInputChange('college-info', 'established', e.target.value)} /></li>
                    <li><input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].campusArea} onChange={e => handleInputChange('college-info', 'campusArea', e.target.value)} /></li>
                    <li><input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].nirfRank} onChange={e => handleInputChange('college-info', 'nirfRank', e.target.value)} /></li>
                    <li><input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].accreditation} onChange={e => handleInputChange('college-info', 'accreditation', e.target.value)} /></li>
                    <li><input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].students} onChange={e => handleInputChange('college-info', 'students', e.target.value)} /></li>
                    <li><input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].faculty} onChange={e => handleInputChange('college-info', 'faculty', e.target.value)} /></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-3 text-lg">Popular Programs</h3>
                  <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full mb-2" value={formData['college-info'].programs} onChange={e => handleInputChange('college-info', 'programs', e.target.value)} />
                  <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full mb-2" value={formData['college-info'].dualPrograms} onChange={e => handleInputChange('college-info', 'dualPrograms', e.target.value)} />
                  <h3 className="font-semibold text-blue-800 mt-6 mb-3 text-lg">Website</h3>
                  <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={formData['college-info'].website} onChange={e => handleInputChange('college-info', 'website', e.target.value)} />
                </div>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">Highlights</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                  {formData['college-info'].highlights.map((item, idx) => (
                    <li key={idx}>
                      <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={item} onChange={e => handleArrayChange('college-info', 'highlights', idx, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🏫</span> Indian Institute of Technology Kanpur (IIT Kanpur)
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => handleEditToggle('college-info')}
              >
                {editMode['college-info'] ? 'Save' : 'Edit'}
              </button>
            </div>
            <p className="text-gray-700 mb-6 text-lg leading-8">IIT Kanpur (IITK) is a top-ranked public technical university in Kanpur, Uttar Pradesh, India, established in 1959. It is known for its academic excellence, research, and innovation in engineering and science.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">Key Facts</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                  <li><span className="font-semibold">Location:</span> Kanpur, Uttar Pradesh, India</li>
                  <li><span className="font-semibold">Established:</span> 1959</li>
                  <li><span className="font-semibold">Campus Area:</span> 1055 acres</li>
                  <li><span className="font-semibold">NIRF 2024 Engineering Rank:</span> 4</li>
                  <li><span className="font-semibold">Accreditation:</span> AICTE, UGC, NAAC</li>
                  <li><span className="font-semibold">Students:</span> 8000+</li>
                  <li><span className="font-semibold">Faculty:</span> 450+</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">Popular Programs</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                  <li>B.Tech, M.Tech, MSc, MBA, Ph.D.</li>
                  <li>Interdisciplinary and Dual Degree Programs</li>
                </ul>
                <h3 className="font-semibold text-blue-800 mt-6 mb-3 text-lg">Website</h3>
                <a href="https://www.iitk.ac.in/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.iitk.ac.in</a>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-blue-800 mb-3 text-lg">Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                <li>Modern campus, advanced labs, and research centers</li>
                <li>Strong industry connections and placements</li>
                <li>Active student life and vibrant campus culture</li>
                <li>Global collaborations and alumni network</li>
              </ul>
            </div>
          </div>
        );
      case "course-fees":
        if (editMode['course-fees']) {
          return (
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">💸</span> Course Fees & Scholarships
                </h2>
                <button
                  className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                  onClick={() => handleEditToggle('course-fees')}
                >
                  Save
                </button>
              </div>
              <div className="mb-6">
                <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4">Program</th>
                      <th className="py-2 px-4">Annual Fees (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="py-2 px-4">B.Tech</td>
                      <td className="py-2 px-4">
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData['course-fees'].btech}
                          onChange={e => handleInputChange('course-fees', 'btech', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">M.Tech</td>
                      <td className="py-2 px-4">
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData['course-fees'].mtech}
                          onChange={e => handleInputChange('course-fees', 'mtech', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">MSc</td>
                      <td className="py-2 px-4">
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData['course-fees'].msc}
                          onChange={e => handleInputChange('course-fees', 'msc', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">MBA</td>
                      <td className="py-2 px-4">
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData['course-fees'].mba}
                          onChange={e => handleInputChange('course-fees', 'mba', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">Ph.D.</td>
                      <td className="py-2 px-4">
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData['course-fees'].phd}
                          onChange={e => handleInputChange('course-fees', 'phd', e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Scholarships & Financial Aid</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                  {formData['course-fees'].scholarships.map((item, idx) => (
                    <li key={idx}>
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                        value={item}
                        onChange={e => handleArrayChange('course-fees', 'scholarships', idx, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Hostel & Other Charges</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                  <li>
                    Hostel Fees:
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                      value={formData['course-fees'].hostel}
                      onChange={e => handleInputChange('course-fees', 'hostel', e.target.value)}
                    />
                  </li>
                  <li>
                    Mess Charges:
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                      value={formData['course-fees'].mess}
                      onChange={e => handleInputChange('course-fees', 'mess', e.target.value)}
                    />
                  </li>
                  <li>
                    Other Charges:
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                      value={formData['course-fees'].other}
                      onChange={e => handleInputChange('course-fees', 'other', e.target.value)}
                    />
                  </li>
                </ul>
              </div>
            </div>
          );
        }
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">💸</span> Course Fees & Scholarships
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => handleEditToggle('course-fees')}
              >
                {editMode['course-fees'] ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="mb-6">
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="py-2 px-4">Program</th>
                    <th className="py-2 px-4">Annual Fees (INR)</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="py-2 px-4">B.Tech</td>
                    <td className="py-2 px-4">₹2,00,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">M.Tech</td>
                    <td className="py-2 px-4">₹1,50,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">MSc</td>
                    <td className="py-2 px-4">₹50,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">MBA</td>
                    <td className="py-2 px-4">₹2,50,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Ph.D.</td>
                    <td className="py-2 px-4">₹60,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Scholarships & Financial Aid</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>Merit-cum-Means Scholarships for deserving students</li>
                <li>National and State-level scholarships</li>
                <li>Fee waivers for economically weaker sections</li>
                <li>Research and teaching assistantships for PG/PhD students</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Hostel & Other Charges</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>Hostel Fees: ₹20,000/year</li>
                <li>Mess Charges: ₹18,000/year (approx.)</li>
                <li>Other Charges: ₹10,000/year</li>
              </ul>
            </div>
          </div>
        );
      case "review":
        if (editMode['review']) {
          return (
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                  Student Reviews & Ratings
                </h2>
                <button
                  className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                  onClick={() => handleEditToggle('review')}
                >
                  Save
                </button>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 text-yellow-500 text-2xl mb-2">
                  <input
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-1 text-yellow-700 text-xl"
                    value={formData['review'].rating}
                    onChange={e => handleInputChange('review', 'rating', e.target.value)}
                  />
                  <span>★</span>
                  <span className="text-gray-600 text-base">(Based on 1200+ reviews)</span>
                </div>
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={formData['review'].comments[0]}
                  onChange={e => handleArrayChange('review', 'comments', 0, e.target.value)}
                />
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={formData['review'].comments[1]}
                  onChange={e => handleArrayChange('review', 'comments', 1, e.target.value)}
                />
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={formData['review'].comments[2]}
                  onChange={e => handleArrayChange('review', 'comments', 2, e.target.value)}
                />
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={formData['review'].comments[3]}
                  onChange={e => handleArrayChange('review', 'comments', 3, e.target.value)}
                />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Rating Breakdown</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-700 text-base">
                  <div>Academics: <input className="bg-white border border-gray-300 rounded px-2 py-1 w-20" value={formData['review'].breakdown.academics} onChange={e => handleInputChange('review', ['breakdown', 'academics'], e.target.value)} /></div>
                  <div>Placements: <input className="bg-white border border-gray-300 rounded px-2 py-1 w-20" value={formData['review'].breakdown.placements} onChange={e => handleInputChange('review', ['breakdown', 'placements'], e.target.value)} /></div>
                  <div>Infrastructure: <input className="bg-white border border-gray-300 rounded px-2 py-1 w-20" value={formData['review'].breakdown.infrastructure} onChange={e => handleInputChange('review', ['breakdown', 'infrastructure'], e.target.value)} /></div>
                  <div>Faculty: <input className="bg-white border border-gray-300 rounded px-2 py-1 w-20" value={formData['review'].breakdown.faculty} onChange={e => handleInputChange('review', ['breakdown', 'faculty'], e.target.value)} /></div>
                  <div>Campus Life: <input className="bg-white border border-gray-300 rounded px-2 py-1 w-20" value={formData['review'].breakdown.campusLife} onChange={e => handleInputChange('review', ['breakdown', 'campusLife'], e.target.value)} /></div>
                  <div>Value for Money: <input className="bg-white border border-gray-300 rounded px-2 py-1 w-20" value={formData['review'].breakdown.value} onChange={e => handleInputChange('review', ['breakdown', 'value'], e.target.value)} /></div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">⭐</span> Student Reviews & Ratings
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => handleEditToggle('review')}
              >
                {editMode['review'] ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-yellow-500 text-2xl mb-2">
                <span>4.7</span>
                <span>★</span>
                <span className="text-gray-600 text-base">(Based on 1200+ reviews)</span>
              </div>
              <p className="text-gray-700 mb-4 text-base leading-7">Students praise IIT Kanpur for its world-class faculty, research opportunities, and vibrant campus life. The placement record and industry exposure are highly rated. Hostel life, sports, and cultural activities are also highlights.</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Top Student Comments</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>“Excellent academic environment and research facilities.”</li>
                <li>“Placements are top-notch, with many global recruiters.”</li>
                <li>“Campus life is amazing, with lots of clubs and fests.”</li>
                <li>“Supportive faculty and great peer group.”</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Rating Breakdown</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700 text-base">
                <div>Academics: <span className="font-semibold">4.8/5</span></div>
                <div>Placements: <span className="font-semibold">4.9/5</span></div>
                <div>Infrastructure: <span className="font-semibold">4.7/5</span></div>
                <div>Faculty: <span className="font-semibold">4.8/5</span></div>
                <div>Campus Life: <span className="font-semibold">4.6/5</span></div>
                <div>Value for Money: <span className="font-semibold">4.5/5</span></div>
              </div>
            </div>
          </div>
        );
      case "admission":
        if (editMode['admission']) {
          return (
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                  Admission Process
                </h2>
                <button
                  className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                  onClick={() => handleEditToggle('admission')}
                >
                  Save
                </button>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Eligibility & Entrance Exams</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                  {formData['admission'].eligibility.map((item, idx) => (
                    <li key={idx}>
                      <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={item} onChange={e => handleArrayChange('admission', 'eligibility', idx, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Application Steps</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-7">
                  {formData['admission'].steps.map((item, idx) => (
                    <li key={idx}>
                      <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={item} onChange={e => handleArrayChange('admission', 'steps', idx, e.target.value)} />
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Important Dates (2025)</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                  {formData['admission'].dates.map((item, idx) => (
                    <li key={idx}>
                      <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={item} onChange={e => handleArrayChange('admission', 'dates', idx, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📝</span> Admission Process
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => handleEditToggle('admission')}
              >
                {editMode['admission'] ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Eligibility & Entrance Exams</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>B.Tech: 10+2 (Physics, Chemistry, Math) + JEE Advanced</li>
                <li>M.Tech: GATE + relevant UG degree</li>
                <li>MBA: CAT + UG degree</li>
                <li>MSc: JAM + UG degree</li>
                <li>Ph.D.: GATE/NET + PG degree</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Application Steps</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>Register online at the IIT Kanpur admissions portal</li>
                <li>Fill out the application form and upload documents</li>
                <li>Pay the application fee</li>
                <li>Appear for the required entrance exam(s)</li>
                <li>Participate in counseling/interview (if applicable)</li>
                <li>Check merit list and confirm admission</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Important Dates (2025)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>JEE Advanced: May 2025</li>
                <li>GATE: February 2025</li>
                <li>CAT: November 2025</li>
                <li>JAM: February 2025</li>
                <li>Application Deadlines: Check official website</li>
              </ul>
            </div>
          </div>
        );
      case "placement":
        if (editMode['placement']) {
          return (
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                  Placements & Recruiters
                </h2>
                <button
                  className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                  onClick={() => handleEditToggle('placement')}
                >
                  Save
                </button>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Placement Highlights (2024)</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                  {formData['placement'].highlights.map((item, idx) => (
                    <li key={idx}>
                      <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={item} onChange={e => handleArrayChange('placement', 'highlights', idx, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Internship Opportunities</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                  {formData['placement'].internships.map((item, idx) => (
                    <li key={idx}>
                      <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={item} onChange={e => handleArrayChange('placement', 'internships', idx, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Placement Support</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                  {formData['placement'].support.map((item, idx) => (
                    <li key={idx}>
                      <input className="bg-white border border-gray-300 rounded px-2 py-1 w-full" value={item} onChange={e => handleArrayChange('placement', 'support', idx, e.target.value)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">💼</span> Placements & Recruiters
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => handleEditToggle('placement')}
              >
                {editMode['placement'] ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Placement Highlights (2024)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>Highest Package: ₹2.4 Crore (International)</li>
                <li>Average Package: ₹18.5 LPA</li>
                <li>Top Recruiters: Google, Microsoft, Amazon, Goldman Sachs, Tata, Reliance, Flipkart, and more</li>
                <li>Over 300 companies participated</li>
                <li>Strong alumni network in top global firms</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Internship Opportunities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>Summer internships with leading companies</li>
                <li>Research internships in India and abroad</li>
                <li>Entrepreneurship and startup support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Placement Support</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>Dedicated Career Development Cell</li>
                <li>Resume building, mock interviews, and workshops</li>
                <li>Alumni mentoring and networking events</li>
              </ul>
            </div>
          </div>
        );
      case "faculty":
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">👨‍🏫</span> Faculty & Departments
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => handleEditToggle('faculty')}
              >
                {editMode['faculty'] ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Faculty Strength</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData['faculty'].strength.map((item, idx) => (
                  <li key={idx}>
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                      value={item}
                      onChange={e => handleArrayChange('faculty', 'strength', idx, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Departments</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-base">
                {formData['faculty'].departments.map((dept, idx) => (
                  <div key={idx}>
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                      value={dept}
                      onChange={e => handleArrayChange('faculty', 'departments', idx, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Faculty Achievements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData['faculty'].achievements.map((item, idx) => (
                  <li key={idx}>
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                      value={item}
                      onChange={e => handleArrayChange('faculty', 'achievements', idx, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        {/* Profile Header Section with integrated navigation */}
        <div className="w-full mb-8">
          <CollegeProfileHeader
            name="IIT Kanpur"
            location="Kanpur, Uttar Pradesh"
            logo="/college-logo.png"
            background="/college-bg.jpg"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area - 70% width */}
          <div className="w-full lg:w-[70%] flex flex-col">
            <div className="space-y-8 w-full">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-gray-200 p-8">
                {renderTabContent(activeTab)}
              </div>
            </div>
          </div>
          {/* Right Sidebar - Notifications - 30% width */}
          <div className="hidden lg:block w-[30%]">
            <div className="space-y-8">
              <CollegeNotifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfilePage;
