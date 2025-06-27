import React, { useState } from "react";
import CollegeProfileHeader from "../../components/college/CollegeProfileHeader";
import CollegeNotifications from "../../components/college/CollegeNotifications";
import Navbar from "../../components/college/sections/Navbar";

const NAV_OPTIONS = [
  { id: "college-info", name: "College Info" },
  { id: "course-fees", name: "Course Fees" },
  { id: "review", name: "Review" },
  { id: "admission", name: "Admission" },
  { id: "placement", name: "Placement" },
  { id: "faculty", name: "Faculty" },
];

const CollegeProfilePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(NAV_OPTIONS[0].id);

  const initialData = {
    "college-info": {
      name: "Indian Institute of Technology Kanpur (IIT Kanpur)",
      description:
        "IIT Kanpur (IITK) is a top-ranked public technical university in Kanpur, Uttar Pradesh, India, established in 1959. It is known for its academic excellence, research, and innovation in engineering and science.",
      location: "Kanpur, Uttar Pradesh, India",
      established: "1959",
      campusArea: "1055 acres",
      nirfRank: "4",
      accreditation: "AICTE, UGC, NAAC",
      students: "8000+",
      faculty: "450+",
      programs: "B.Tech, M.Tech, MSc, MBA, Ph.D.",
      dualPrograms: "Interdisciplinary and Dual Degree Programs",
      website: "https://www.iitk.ac.in/",
      highlights: [
        "Modern campus, advanced labs, and research centers",
        "Strong industry connections and placements",
        "Active student life and vibrant campus culture",
        "Global collaborations and alumni network",
      ],
    },
    "course-fees": {
      btech: "₹2,00,000",
      mtech: "₹1,50,000",
      msc: "₹50,000",
      mba: "₹2,50,000",
      phd: "₹60,000",
      scholarships: [
        "Merit-cum-Means Scholarships for deserving students",
        "National and State-level scholarships",
        "Fee waivers for economically weaker sections",
        "Research and teaching assistantships for PG/PhD students",
      ],
      hostel: "₹20,000/year",
      mess: "₹18,000/year (approx.)",
      other: "₹10,000/year",
    },
    review: {
      rating: "4.7",
      comments: [
        "“Excellent academic environment and research facilities.”",
        "“Placements are top-notch, with many global recruiters.”",
        "“Campus life is amazing, with lots of clubs and fests.”",
        "“Supportive faculty and great peer group.”",
      ],
      breakdown: {
        academics: "4.8/5",
        placements: "4.9/5",
        infrastructure: "4.7/5",
        faculty: "4.8/5",
        campusLife: "4.6/5",
        value: "4.5/5",
      },
    },
    admission: {
      eligibility: [
        "B.Tech: 10+2 (Physics, Chemistry, Math) + JEE Advanced",
        "M.Tech: GATE + relevant UG degree",
        "MBA: CAT + UG degree",
        "MSc: JAM + UG degree",
        "Ph.D.: GATE/NET + PG degree",
      ],
      steps: [
        "Register online at the IIT Kanpur admissions portal",
        "Fill out the application form and upload documents",
        "Pay the application fee",
        "Appear for the required entrance exam(s)",
        "Participate in counseling/interview (if applicable)",
        "Check merit list and confirm admission",
      ],
      dates: [
        "JEE Advanced: May 2025",
        "GATE: February 2025",
        "CAT: November 2025",
        "JAM: February 2025",
        "Application Deadlines: Check official website",
      ],
    },
    placement: {
      highlights: [
        "Highest Package: ₹2.4 Crore (International)",
        "Average Package: ₹18.5 LPA",
        "Top Recruiters: Google, Microsoft, Amazon, Goldman Sachs, Tata, Reliance, Flipkart, and more",
        "Over 300 companies participated",
        "Strong alumni network in top global firms",
      ],
      internships: [
        "Summer internships with leading companies",
        "Research internships in India and abroad",
        "Entrepreneurship and startup support",
      ],
      support: [
        "Dedicated Career Development Cell",
        "Resume building, mock interviews, and workshops",
        "Alumni mentoring and networking events",
      ],
    },
    faculty: {
      strength: [
        "450+ highly qualified faculty members",
        "Many with international research experience",
        "Regular guest lectures by global experts",
      ],
      departments: [
        "Computer Science & Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Aerospace Engineering",
        "Physics",
        "Chemistry",
        "Mathematics & Statistics",
        "Humanities & Social Sciences",
        "Management Sciences",
        "Biological Sciences & Bioengineering",
      ],
      achievements: [
        "Numerous awards and recognitions at national and international levels",
        "Fellowships from national and international academies",
        "Extensive research publications and patents",
      ],
    },
  };

  const [formData, setFormData] = useState(initialData);
  const [showSectionForm, setShowSectionForm] = useState(null);
  const [sectionFormData, setSectionFormData] = useState({});

  const openSectionForm = (tab) => {
    setShowSectionForm(tab);
    setSectionFormData(formData[tab]);
  };
  const closeSectionForm = () => setShowSectionForm(null);
  const handleSectionFormChange = (field, value) => {
    setSectionFormData((prev) => {
      if (Array.isArray(field)) {
        // Nested field (e.g., ['breakdown', 'academics'])
        const [parent, child] = field;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };
  const handleSectionFormArrayChange = (field, idx, value) => {
    setSectionFormData((prev) => {
      const arr = [...prev[field]];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };
  const saveSectionForm = (tab) => {
    setFormData((prev) => ({ ...prev, [tab]: sectionFormData }));
    setShowSectionForm(null);
  };

  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case "college-info":
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🏫</span> {formData["college-info"].name}
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => openSectionForm("college-info")}
              >
                Edit
              </button>
            </div>
            <p className="text-gray-700 mb-6 text-lg leading-8">
              {formData["college-info"].description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                  Key Facts
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                  <li><span className="font-semibold">Location:</span> {formData["college-info"].location}</li>
                  <li><span className="font-semibold">Established:</span> {formData["college-info"].established}</li>
                  <li><span className="font-semibold">Campus Area:</span> {formData["college-info"].campusArea}</li>
                  <li><span className="font-semibold">NIRF 2024 Engineering Rank:</span> {formData["college-info"].nirfRank}</li>
                  <li><span className="font-semibold">Accreditation:</span> {formData["college-info"].accreditation}</li>
                  <li><span className="font-semibold">Students:</span> {formData["college-info"].students}</li>
                  <li><span className="font-semibold">Faculty:</span> {formData["college-info"].faculty}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">Popular Programs</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                  <li>{formData["college-info"].programs}</li>
                  <li>{formData["college-info"].dualPrograms}</li>
                </ul>
                <h3 className="font-semibold text-blue-800 mt-6 mb-3 text-lg">Website</h3>
                <a
                  href={formData["college-info"].website}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formData["college-info"].website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-blue-800 mb-3 text-lg">Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                {formData["college-info"].highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "course-fees":
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">💸</span> Course Fees & Scholarships
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => openSectionForm("course-fees")}
              >
                Edit
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
                  <tr><td className="py-2 px-4">B.Tech</td><td className="py-2 px-4">{formData["course-fees"].btech}</td></tr>
                  <tr><td className="py-2 px-4">M.Tech</td><td className="py-2 px-4">{formData["course-fees"].mtech}</td></tr>
                  <tr><td className="py-2 px-4">MSc</td><td className="py-2 px-4">{formData["course-fees"].msc}</td></tr>
                  <tr><td className="py-2 px-4">MBA</td><td className="py-2 px-4">{formData["course-fees"].mba}</td></tr>
                  <tr><td className="py-2 px-4">Ph.D.</td><td className="py-2 px-4">{formData["course-fees"].phd}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Scholarships & Financial Aid</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["course-fees"].scholarships.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Hostel & Other Charges</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                <li>Hostel Fees: {formData["course-fees"].hostel}</li>
                <li>Mess Charges: {formData["course-fees"].mess}</li>
                <li>Other Charges: {formData["course-fees"].other}</li>
              </ul>
            </div>
          </div>
        );
      case "review":
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">⭐</span> Student Reviews
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => openSectionForm("review")}
              >
                Edit
              </button>
            </div>
            <div className="flex items-center gap-2 text-yellow-500 text-2xl mb-2">
              <span className="font-bold text-yellow-700 text-xl">{formData["review"].rating}</span>
              <span>★</span>
              <span className="text-gray-600 text-base">(Based on 1200+ reviews)</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7 mb-4">
              {formData["review"].comments.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Rating Breakdown</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700 text-base">
                <div>Academics: <span className="font-semibold">{formData["review"].breakdown.academics}</span></div>
                <div>Placements: <span className="font-semibold">{formData["review"].breakdown.placements}</span></div>
                <div>Infrastructure: <span className="font-semibold">{formData["review"].breakdown.infrastructure}</span></div>
                <div>Faculty: <span className="font-semibold">{formData["review"].breakdown.faculty}</span></div>
                <div>Campus Life: <span className="font-semibold">{formData["review"].breakdown.campusLife}</span></div>
                <div>Value for Money: <span className="font-semibold">{formData["review"].breakdown.value}</span></div>
              </div>
            </div>
          </div>
        );
      case "admission":
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📝</span> Admission
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => openSectionForm("admission")}
              >
                Edit
              </button>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Eligibility & Entrance Exams</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["admission"].eligibility.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Application Steps</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["admission"].steps.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Important Dates (2025)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["admission"].dates.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "placement":
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">💼</span> Placement
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => openSectionForm("placement")}
              >
                Edit
              </button>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Placement Highlights (2024)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["placement"].highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Internship Opportunities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["placement"].internships.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Placement Support</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["placement"].support.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "faculty":
        return (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">👨‍🏫</span> Faculty
              </h2>
              <button
                className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={() => openSectionForm("faculty")}
              >
                Edit
              </button>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Faculty Strength</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["faculty"].strength.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Departments</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["faculty"].departments.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">Achievements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                {formData["faculty"].achievements.map((item, idx) => (
                  <li key={idx}>{item}</li>
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
      {showSectionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={closeSectionForm}
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">
              Edit {showSectionForm.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </h2>
            {showSectionForm === "college-info" && (
              <div>
                <input
                  className="text-lg font-bold text-blue-900 bg-white border border-gray-300 rounded px-2 py-1 mb-2"
                  value={sectionFormData.name}
                  onChange={(e) =>
                    handleSectionFormChange("name", e.target.value)
                  }
                  placeholder="College Name"
                />
                <textarea
                  className="w-full mb-2 text-lg leading-8 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={sectionFormData.description}
                  onChange={(e) =>
                    handleSectionFormChange("description", e.target.value)
                  }
                  placeholder="Description"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                      Key Facts
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.location}
                          onChange={(e) =>
                            handleSectionFormChange("location", e.target.value)
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.established}
                          onChange={(e) =>
                            handleSectionFormChange("established", e.target.value)
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.campusArea}
                          onChange={(e) =>
                            handleSectionFormChange("campusArea", e.target.value)
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.nirfRank}
                          onChange={(e) =>
                            handleSectionFormChange("nirfRank", e.target.value)
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.accreditation}
                          onChange={(e) =>
                            handleSectionFormChange(
                              "accreditation",
                              e.target.value
                            )
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.students}
                          onChange={(e) =>
                            handleSectionFormChange("students", e.target.value)
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.faculty}
                          onChange={(e) =>
                            handleSectionFormChange("faculty", e.target.value)
                          }
                        />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                      Popular Programs
                    </h3>
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full mb-2"
                      value={sectionFormData.programs}
                      onChange={(e) =>
                        handleSectionFormChange("programs", e.target.value)
                      }
                    />
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full mb-2"
                      value={sectionFormData.dualPrograms}
                      onChange={(e) =>
                        handleSectionFormChange("dualPrograms", e.target.value)
                      }
                    />
                    <h3 className="font-semibold text-blue-800 mt-6 mb-3 text-lg">
                      Website
                    </h3>
                    <input
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                      value={sectionFormData.website}
                      onChange={(e) =>
                        handleSectionFormChange("website", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                    Highlights
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-7">
                    {sectionFormData.highlights.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "highlights",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {showSectionForm === "course-fees" && (
              <div>
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
                            value={sectionFormData.btech}
                            onChange={(e) =>
                              handleSectionFormChange("btech", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">M.Tech</td>
                        <td className="py-2 px-4">
                          <input
                            className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                            value={sectionFormData.mtech}
                            onChange={(e) =>
                              handleSectionFormChange("mtech", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">MSc</td>
                        <td className="py-2 px-4">
                          <input
                            className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                            value={sectionFormData.msc}
                            onChange={(e) =>
                              handleSectionFormChange("msc", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">MBA</td>
                        <td className="py-2 px-4">
                          <input
                            className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                            value={sectionFormData.mba}
                            onChange={(e) =>
                              handleSectionFormChange("mba", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Ph.D.</td>
                        <td className="py-2 px-4">
                          <input
                            className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                            value={sectionFormData.phd}
                            onChange={(e) =>
                              handleSectionFormChange("phd", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Scholarships & Financial Aid
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.scholarships.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "scholarships",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Hostel & Other Charges
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    <li>
                      Hostel Fees:
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                        value={sectionFormData.hostel}
                        onChange={(e) =>
                          handleSectionFormChange("hostel", e.target.value)
                        }
                      />
                    </li>
                    <li>
                      Mess Charges:
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                        value={sectionFormData.mess}
                        onChange={(e) =>
                          handleSectionFormChange("mess", e.target.value)
                        }
                      />
                    </li>
                    <li>
                      Other Charges:
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                        value={sectionFormData.other}
                        onChange={(e) =>
                          handleSectionFormChange("other", e.target.value)
                        }
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {showSectionForm === "review" && (
              <div>
                <div className="flex items-center gap-2 text-yellow-500 text-2xl mb-2">
                  <input
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-1 text-yellow-700 text-xl"
                    value={sectionFormData.rating}
                    onChange={(e) =>
                      handleSectionFormChange("rating", e.target.value)
                    }
                  />
                  <span>★</span>
                  <span className="text-gray-600 text-base">
                    (Based on 1200+ reviews)
                  </span>
                </div>
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={sectionFormData.comments[0]}
                  onChange={(e) =>
                    handleSectionFormArrayChange("comments", 0, e.target.value)
                  }
                />
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={sectionFormData.comments[1]}
                  onChange={(e) =>
                    handleSectionFormArrayChange("comments", 1, e.target.value)
                  }
                />
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={sectionFormData.comments[2]}
                  onChange={(e) =>
                    handleSectionFormArrayChange("comments", 2, e.target.value)
                  }
                />
                <textarea
                  className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={sectionFormData.comments[3]}
                  onChange={(e) =>
                    handleSectionFormArrayChange("comments", 3, e.target.value)
                  }
                />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Rating Breakdown
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-700 text-base">
                    <div>
                      Academics:{" "}
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-20"
                        value={sectionFormData.breakdown.academics}
                        onChange={(e) =>
                          handleSectionFormChange(
                            ["breakdown", "academics"],
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      Placements:{" "}
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-20"
                        value={sectionFormData.breakdown.placements}
                        onChange={(e) =>
                          handleSectionFormChange(
                            ["breakdown", "placements"],
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      Infrastructure:{" "}
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-20"
                        value={sectionFormData.breakdown.infrastructure}
                        onChange={(e) =>
                          handleSectionFormChange(
                            ["breakdown", "infrastructure"],
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      Faculty:{" "}
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-20"
                        value={sectionFormData.breakdown.faculty}
                        onChange={(e) =>
                          handleSectionFormChange(
                            ["breakdown", "faculty"],
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      Campus Life:{" "}
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-20"
                        value={sectionFormData.breakdown.campusLife}
                        onChange={(e) =>
                          handleSectionFormChange(
                            ["breakdown", "campusLife"],
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      Value for Money:{" "}
                      <input
                        className="bg-white border border-gray-300 rounded px-2 py-1 w-20"
                        value={sectionFormData.breakdown.value}
                        onChange={(e) =>
                          handleSectionFormChange(
                            ["breakdown", "value"],
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showSectionForm === "admission" && (
              <div>
                <div className="mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Eligibility & Entrance Exams
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.eligibility.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "eligibility",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Application Steps
                  </h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.steps.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "steps",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Important Dates (2025)
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.dates.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "dates",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {showSectionForm === "placement" && (
              <div>
                <div className="mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Placement Highlights (2024)
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.highlights.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "highlights",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Internship Opportunities
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.internships.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "internships",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Placement Support
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.support.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "support",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {showSectionForm === "faculty" && (
              <div>
                <div className="mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Faculty Strength
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.strength.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "strength",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Departments
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-base">
                    {sectionFormData.departments.map((dept, idx) => (
                      <div key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={dept}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "departments",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">
                    Achievements
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-7">
                    {sectionFormData.achievements.map((item, idx) => (
                      <li key={idx}>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={item}
                          onChange={(e) =>
                            handleSectionFormArrayChange(
                              "achievements",
                              idx,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
                onClick={closeSectionForm}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                onClick={() => saveSectionForm(showSectionForm)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeProfilePage;