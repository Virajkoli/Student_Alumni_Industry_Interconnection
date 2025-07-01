import React, { useState } from "react";
import CollegeProfileHeader from "../../components/college/CollegeProfileHeader";
import CollegeNotifications from "../../components/college/CollegeNotifications";
import Navbar from "../../components/college/sections/Navbar";
import CollegeInformation from "../../components/college/sections/CollegeInformation";
import Courses from "../../components/college/sections/Courses";
import CourseFees from "../../components/college/sections/CourseFees";
import Faculty from "../../components/college/sections/Faculty";
import Downloads from "../../components/college/sections/Downloads";
import Admission from "../../components/college/sections/Admission";
import Placement from "../../components/college/sections/Placement";
import CutoffRanking from "../../components/college/sections/CutoffRanking";
import EventsNews from "../../components/college/sections/EventsNews";
import Facilities from "../../components/college/sections/Facilities";
import Alumni from "../../components/college/sections/Alumni";
import StudentReviews from "../../components/college/sections/StudentReviews";

const NAV_OPTIONS = [
  { id: "college-info", name: "College Info" },
  { id: "course-details", name: "Course Details" }, // Added Course Details as a separate tab
  { id: "course-fees", name: "Course Fees" },
  { id: "review", name: "Review" },
  { id: "admission", name: "Admission" },
  { id: "placement", name: "Placement" },
  { id: "faculty", name: "Faculty" },
  { id: "downloads", name: "Downloads" },
];

// Mock external review form responses (in a real app, this would come from an API/database)
const externalReviewResponses = [
  {
    rating: 4.8,
    academics: 4.9,
    placements: 4.8,
    infrastructure: 4.7,
    faculty: 4.8,
    campusLife: 4.7,
    value: 4.6,
  },
  {
    rating: 4.6,
    academics: 4.7,
    placements: 4.9,
    infrastructure: 4.6,
    faculty: 4.7,
    campusLife: 4.5,
    value: 4.4,
  },
  {
    rating: 4.7,
    academics: 4.8,
    placements: 4.9,
    infrastructure: 4.7,
    faculty: 4.8,
    campusLife: 4.6,
    value: 4.5,
  },
  // Add more responses as needed
];

const calculateAverageRating = (responses) => {
  if (!responses || responses.length === 0) return { rating: 0, breakdown: {} };

  const total = responses.reduce(
    (acc, curr) => ({
      rating: acc.rating + curr.rating,
      academics: acc.academics + curr.academics,
      placements: acc.placements + curr.placements,
      infrastructure: acc.infrastructure + curr.infrastructure,
      faculty: acc.faculty + curr.faculty,
      campusLife: acc.campusLife + curr.campusLife,
      value: acc.value + curr.value,
    }),
    {
      rating: 0,
      academics: 0,
      placements: 0,
      infrastructure: 0,
      faculty: 0,
      campusLife: 0,
      value: 0,
    }
  );

  const count = responses.length;
  return {
    rating: (total.rating / count).toFixed(1),
    breakdown: {
      academics: (total.academics / count).toFixed(1) + "/5",
      placements: (total.placements / count).toFixed(1) + "/5",
      infrastructure: (total.infrastructure / count).toFixed(1) + "/5",
      faculty: (total.faculty / count).toFixed(1) + "/5",
      campusLife: (total.campusLife / count).toFixed(1) + "/5",
      value: (total.value / count).toFixed(1) + "/5",
    },
  };
};

const CollegeProfilePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(NAV_OPTIONS[0].id);
  const [externalRatings, setExternalRatings] = useState(() =>
    calculateAverageRating(externalReviewResponses)
  );
  const [showSectionForm, setShowSectionForm] = useState(null);
  const [sectionFormData, setSectionFormData] = useState({});
  const [formData, setFormData] = useState({
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
    "course-details": {
      btechDuration: "4 Years",
      btechEligibility: "10+2 (PCM) + JEE Advanced",
      btechBranches: [
        "Computer Science & Engineering: 120",
        "Electrical Engineering: 110",
        "Mechanical Engineering: 100",
        "Chemical Engineering: 80",
        "Civil Engineering: 80",
        "Aerospace Engineering: 60",
        "Materials Science & Engineering: 50",
        "Biological Sciences & Bioengineering: 30",
      ],
      btechFees: "₹2,00,000",
      btechTotalSeats: "800+",
      mtechDuration: "2 Years",
      mtechEligibility: "B.E./B.Tech + GATE",
      mtechBranches: [
        "Computer Science & Engineering: 60",
        "Electrical Engineering: 55",
        "Mechanical Engineering: 50",
        "Chemical Engineering: 40",
        "Civil Engineering: 40",
        "Aerospace Engineering: 30",
        "Environmental Engineering: 20",
        "Materials Science & Engineering: 20",
      ],
      mtechFees: "₹1,50,000",
      mtechTotalSeats: "400+",
      bscDuration: "3 Years",
      bscEligibility: "10+2 (PCM/PCB) + IIT JAM",
      bscBranches: [
        "Physics: 50",
        "Chemistry: 50",
        "Mathematics: 50",
        "Biology: 50",
      ],
      bscFees: "₹50,000",
      bscTotalSeats: "200+",
      mscDuration: "2 Years",
      mscEligibility: "B.Sc. + JAM",
      mscBranches: [
        "Physics: 60",
        "Chemistry: 50",
        "Mathematics & Statistics: 40",
      ],
      mscFees: "₹50,000",
      mscTotalSeats: "150+",
      mbaDuration: "2 Years",
      mbaEligibility: "UG Degree + CAT",
      mbaBranches: [
        "General Management: 40",
        "Analytics: 30",
        "Operations: 10",
        "Marketing: 10",
        "Finance: 5",
        "Human Resource Management: 5",
      ],
      mbaFees: "₹2,50,000",
      mbaTotalSeats: "100+",
      phdDuration: "3-5 Years",
      phdEligibility: "PG Degree + GATE/NET",
      phdBranches: [
        "All major engineering, science, and management fields (CSE, EE, ME, CE, AE, CHE, Physics, Chemistry, Mathematics, Management, Humanities, Bioengineering, etc.): 200+",
      ],
      phdFees: "₹60,000",
      phdTotalSeats: "200+",
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
      comments: [
        "“Excellent academic environment and research facilities.”",
        "“Placements are top-notch, with many global recruiters.”",
        "“Campus life is amazing, with lots of clubs and fests.”",
        "“Supportive faculty and great peer group.”",
      ],
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
    downloads: {
      forms: [
        {
          name: "Admission Application Form",
          description:
            "Official application form for admission to various programs",
          fileSize: "250 KB",
          format: "PDF",
          url: "/downloads/admission-form-2025.pdf",
        },
        {
          name: "Scholarship Application Form",
          description: "Form to apply for merit and need-based scholarships",
          fileSize: "180 KB",
          format: "PDF",
          url: "/downloads/scholarship-form-2025.pdf",
        },
        {
          name: "Hostel Accommodation Form",
          description: "Form for requesting on-campus hostel accommodation",
          fileSize: "200 KB",
          format: "PDF",
          url: "/downloads/hostel-form-2025.pdf",
        },
      ],
      brochures: [
        {
          name: "College Brochure 2025",
          description:
            "Comprehensive guide about IIT Kanpur's programs, facilities, and achievements",
          fileSize: "5.2 MB",
          format: "PDF",
          url: "/downloads/iitk-brochure-2025.pdf",
        },
        {
          name: "Department Courses Catalog",
          description:
            "Detailed information about courses offered by each department",
          fileSize: "3.8 MB",
          format: "PDF",
          url: "/downloads/course-catalog-2025.pdf",
        },
      ],
      syllabus: [
        {
          name: "B.Tech Course Syllabus",
          description: "Complete syllabus for all B.Tech programs",
          fileSize: "1.8 MB",
          format: "PDF",
          url: "/downloads/btech-syllabus-2025.pdf",
        },
        {
          name: "M.Tech Course Syllabus",
          description: "Complete syllabus for all M.Tech specializations",
          fileSize: "2.1 MB",
          format: "PDF",
          url: "/downloads/mtech-syllabus-2025.pdf",
        },
      ],
      other: [
        {
          name: "Student Handbook",
          description: "Guidelines, rules, and regulations for students",
          fileSize: "1.5 MB",
          format: "PDF",
          url: "/downloads/student-handbook-2025.pdf",
        },
        {
          name: "Fee Structure",
          description: "Detailed fee structure for all programs",
          fileSize: "300 KB",
          format: "PDF",
          url: "/downloads/fee-structure-2025.pdf",
        },
      ],
    },
  });

  const openSectionForm = (tab) => {
    setShowSectionForm(tab);
    if (tab === "review") {
      setSectionFormData({
        ...formData[tab],
        // Only pass comments since ratings are from external source
        comments: formData[tab].comments || [],
      });
    } else {
      setSectionFormData(formData[tab]);
    }
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
          <CollegeInformation
            data={formData["college-info"]}
            onEdit={() => openSectionForm("college-info")}
          />
        );
      case "course-details":
        return (
          <Courses
            data={formData["course-details"]}
            onEdit={() => openSectionForm("course-details")}
          />
        );
      case "course-fees":
        return (
          <CourseFees
            data={formData["course-fees"]}
            onEdit={() => openSectionForm("course-fees")}
          />
        );
      case "faculty":
        return (
          <Faculty
            data={formData["faculty"]}
            onEdit={() => openSectionForm("faculty")}
          />
        );
      case "downloads":
        return (
          <Downloads
            data={formData["downloads"]}
            onEdit={() => openSectionForm("downloads")}
          />
        );
      case "admission":
        return (
          <Admission
            data={formData["admission"]}
            onEdit={() => openSectionForm("admission")}
          />
        );
      case "placement":
        return (
          <Placement
            data={formData["placement"]}
            onEdit={() => openSectionForm("placement")}
          />
        );
      case "cutoff-ranking":
        return (
          <CutoffRanking
            data={formData["cutoff-ranking"]}
            onEdit={() => openSectionForm("cutoff-ranking")}
          />
        );
      case "events-news":
        return (
          <EventsNews
            data={formData["events-news"]}
            onEdit={() => openSectionForm("events-news")}
          />
        );
      case "facilities":
        return (
          <Facilities
            data={formData["facilities"]}
            onEdit={() => openSectionForm("facilities")}
          />
        );
      case "alumni":
        return (
          <Alumni
            data={formData["alumni"]}
            onEdit={() => openSectionForm("alumni")}
          />
        );
      case "review":
        return (
          <StudentReviews
            data={formData["review"]}
            onEdit={() => openSectionForm("review")}
          />
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-gray-200 p-8"> */}
              {renderTabContent(activeTab)}
              {/* </div> */}
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
              Edit{" "}
              {showSectionForm
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
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
                            handleSectionFormChange(
                              "established",
                              e.target.value
                            )
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
                          value={sectionFormData.campusArea}
                          onChange={(e) =>
                            handleSectionFormChange(
                              "campusArea",
                              e.target.value
                            )
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
            {showSectionForm === "course-details" && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">
                          Program
                        </th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">
                          Duration
                        </th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">
                          Eligibility
                        </th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">
                          Branches & Seats
                        </th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">
                          Annual Fees
                        </th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">
                          Total Seats
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800">
                      {/* B.Tech */}
                      <tr>
                        <td className="py-3 px-4 font-bold text-blue-800">
                          B.Tech
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].btechDuration ||
                            "4 Years"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].btechEligibility ||
                            "10+2 (PCM) + JEE Advanced"}
                        </td>
                        <td className="py-3 px-4">
                          <ul className="list-disc list-inside space-y-1">
                            {(
                              formData["course-details"].btechBranches || [
                                "Computer Science & Engineering: 120",
                                "Electrical Engineering: 110",
                                "Mechanical Engineering: 100",
                                "Chemical Engineering: 80",
                                "Civil Engineering: 80",
                                "Aerospace Engineering: 60",
                                "Materials Science & Engineering: 50",
                                "Biological Sciences & Bioengineering: 30",
                              ]
                            ).map((branch, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                {branch}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].btechFees || "₹2,00,000"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].btechTotalSeats || "800+"}
                        </td>
                      </tr>
                      {/* M.Tech */}
                      <tr>
                        <td className="py-3 px-4 font-bold text-blue-800">
                          M.Tech
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mtechDuration ||
                            "2 Years"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mtechEligibility ||
                            "B.E./B.Tech + GATE"}
                        </td>
                        <td className="py-3 px-4">
                          <ul className="list-disc list-inside space-y-1">
                            {(
                              formData["course-details"].mtechBranches || [
                                "Computer Science & Engineering: 60",
                                "Electrical Engineering: 55",
                                "Mechanical Engineering: 50",
                                "Chemical Engineering: 40",
                                "Civil Engineering: 40",
                                "Aerospace Engineering: 30",
                                "Environmental Engineering: 20",
                                "Materials Science & Engineering: 20",
                              ]
                            ).map((branch, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                {branch}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mtechFees || "₹1,50,000"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mtechTotalSeats || "400+"}
                        </td>
                      </tr>
                      {/* B.Sc. */}
                      <tr>
                        <td className="py-3 px-4 font-bold text-blue-800">
                          B.Sc.
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].bscDuration || "3 Years"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].bscEligibility ||
                            "10+2 (PCM/PCB) + IIT JAM"}
                        </td>
                        <td className="py-3 px-4">
                          <ul className="list-disc list-inside space-y-1">
                            {(
                              formData["course-details"].bscBranches || [
                                "Physics: 50",
                                "Chemistry: 50",
                                "Mathematics: 50",
                                "Biology: 50",
                              ]
                            ).map((branch, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                {branch}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].bscFees || "₹50,000"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].bscTotalSeats || "200+"}
                        </td>
                      </tr>
                      {/* MSc */}
                      <tr>
                        <td className="py-3 px-4 font-bold text-blue-800">
                          MSc
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mscDuration || "2 Years"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mscEligibility ||
                            "B.Sc. + JAM"}
                        </td>
                        <td className="py-3 px-4">
                          <ul className="list-disc list-inside space-y-1">
                            {(
                              formData["course-details"].mscBranches || [
                                "Physics: 60",
                                "Chemistry: 50",
                                "Mathematics & Statistics: 40",
                              ]
                            ).map((branch, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                {branch}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mscFees || "₹50,000"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mscTotalSeats || "150+"}
                        </td>
                      </tr>
                      {/* MBA */}
                      <tr>
                        <td className="py-3 px-4 font-bold text-blue-800">
                          MBA
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mbaDuration || "2 Years"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mbaEligibility ||
                            "UG Degree + CAT"}
                        </td>
                        <td className="py-3 px-4">
                          <ul className="list-disc list-inside space-y-1">
                            {(
                              formData["course-details"].mbaBranches || [
                                "General Management: 40",
                                "Analytics: 30",
                                "Operations: 10",
                                "Marketing: 10",
                                "Finance: 5",
                                "Human Resource Management: 5",
                              ]
                            ).map((branch, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                {branch}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mbaFees || "₹2,50,000"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].mbaTotalSeats || "100+"}
                        </td>
                      </tr>
                      {/* Ph.D. */}
                      <tr>
                        <td className="py-3 px-4 font-bold text-blue-800">
                          Ph.D.
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].phdDuration ||
                            "3-5 Years"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].phdEligibility ||
                            "PG Degree + GATE/NET"}
                        </td>
                        <td className="py-3 px-4">
                          <ul className="list-disc list-inside space-y-1">
                            {(
                              formData["course-details"].phdBranches || [
                                "All major engineering, science, and management fields (CSE, EE, ME, CE, AE, CHE, Physics, Chemistry, Mathematics, Management, Humanities, Bioengineering, etc.): 200+",
                              ]
                            ).map((branch, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                {branch}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].phdFees || "₹60,000"}
                        </td>
                        <td className="py-3 px-4">
                          {formData["course-details"].phdTotalSeats || "200+"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                <div className="flex items-center gap-2 text-yellow-500 text-2xl mb-4">
                  <div className="flex flex-col">
                    <span className="w-16 bg-gray-100 border border-gray-300 rounded px-2 py-1 text-yellow-700 text-xl text-center font-bold">
                      {externalRatings.rating}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      External Rating
                    </span>
                  </div>
                  <span>★</span>
                  <span className="text-gray-600 text-base">
                    (Based on {externalReviewResponses.length} verified reviews)
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                    Comments & Feedback
                  </h3>
                  {(sectionFormData.comments || []).map((comment, idx) => (
                    <textarea
                      key={idx}
                      className="w-full mb-4 text-base leading-7 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700"
                      value={comment}
                      onChange={(e) =>
                        handleSectionFormArrayChange(
                          "comments",
                          idx,
                          e.target.value
                        )
                      }
                    />
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                    Rating Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex justify-between items-center">
                      <span>Academics:</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-center w-16 font-medium">
                          {externalRatings.breakdown.academics}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Placements:</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-center w-16 font-medium">
                          {externalRatings.breakdown.placements}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Infrastructure:</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-center w-16 font-medium">
                          {externalRatings.breakdown.infrastructure}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Faculty:</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-center w-16 font-medium">
                          {externalRatings.breakdown.faculty}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Campus Life:</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-center w-16 font-medium">
                          {externalRatings.breakdown.campusLife}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Value for Money:</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-center w-16 font-medium">
                          {externalRatings.breakdown.value}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-gray-600 text-sm">
                  <p className="italic">
                    * Ratings are calculated automatically from verified student
                    and alumni reviews.
                  </p>
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
            {showSectionForm === "downloads" && sectionFormData && (
              <div>
                {/* Forms Section */}
                <div className="mb-8">
                  <h3 className="font-semibold text-blue-800 mb-4 text-lg">
                    Forms
                  </h3>
                  <div className="grid gap-4">
                    {(sectionFormData.forms || []).map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <input
                            className="font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.name}
                            onChange={(e) =>
                              handleSectionFormArrayChange("forms", idx, {
                                ...doc,
                                name: e.target.value,
                              })
                            }
                            placeholder="Document Name"
                          />
                          <input
                            className="text-sm text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.description}
                            onChange={(e) =>
                              handleSectionFormArrayChange("forms", idx, {
                                ...doc,
                                description: e.target.value,
                              })
                            }
                            placeholder="Description"
                          />
                          <div className="flex gap-2 mt-1">
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-20"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleSectionFormArrayChange("forms", idx, {
                                  ...doc,
                                  fileSize: e.target.value,
                                })
                              }
                              placeholder="Size"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-16"
                              value={doc.format}
                              onChange={(e) =>
                                handleSectionFormArrayChange("forms", idx, {
                                  ...doc,
                                  format: e.target.value,
                                })
                              }
                              placeholder="Format"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 flex-1"
                              value={doc.url}
                              onChange={(e) =>
                                handleSectionFormArrayChange("forms", idx, {
                                  ...doc,
                                  url: e.target.value,
                                })
                              }
                              placeholder="Download URL"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brochures Section */}
                <div className="mb-8">
                  <h3 className="font-semibold text-blue-800 mb-4 text-lg">
                    Brochures & Catalogs
                  </h3>
                  <div className="grid gap-4">
                    {(sectionFormData.brochures || []).map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <input
                            className="font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.name}
                            onChange={(e) =>
                              handleSectionFormArrayChange("brochures", idx, {
                                ...doc,
                                name: e.target.value,
                              })
                            }
                            placeholder="Document Name"
                          />
                          <input
                            className="text-sm text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.description}
                            onChange={(e) =>
                              handleSectionFormArrayChange("brochures", idx, {
                                ...doc,
                                description: e.target.value,
                              })
                            }
                            placeholder="Description"
                          />
                          <div className="flex gap-2 mt-1">
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-20"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleSectionFormArrayChange("brochures", idx, {
                                  ...doc,
                                  fileSize: e.target.value,
                                })
                              }
                              placeholder="Size"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-16"
                              value={doc.format}
                              onChange={(e) =>
                                handleSectionFormArrayChange("brochures", idx, {
                                  ...doc,
                                  format: e.target.value,
                                })
                              }
                              placeholder="Format"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 flex-1"
                              value={doc.url}
                              onChange={(e) =>
                                handleSectionFormArrayChange("brochures", idx, {
                                  ...doc,
                                  url: e.target.value,
                                })
                              }
                              placeholder="Download URL"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus Section */}
                <div className="mb-8">
                  <h3 className="font-semibold text-blue-800 mb-4 text-lg">
                    Course Syllabus
                  </h3>
                  <div className="grid gap-4">
                    {(sectionFormData.syllabus || []).map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <input
                            className="font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.name}
                            onChange={(e) =>
                              handleSectionFormArrayChange("syllabus", idx, {
                                ...doc,
                                name: e.target.value,
                              })
                            }
                            placeholder="Document Name"
                          />
                          <input
                            className="text-sm text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.description}
                            onChange={(e) =>
                              handleSectionFormArrayChange("syllabus", idx, {
                                ...doc,
                                description: e.target.value,
                              })
                            }
                            placeholder="Description"
                          />
                          <div className="flex gap-2 mt-1">
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-20"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleSectionFormArrayChange("syllabus", idx, {
                                  ...doc,
                                  fileSize: e.target.value,
                                })
                              }
                              placeholder="Size"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-16"
                              value={doc.format}
                              onChange={(e) =>
                                handleSectionFormArrayChange("syllabus", idx, {
                                  ...doc,
                                  format: e.target.value,
                                })
                              }
                              placeholder="Format"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 flex-1"
                              value={doc.url}
                              onChange={(e) =>
                                handleSectionFormArrayChange("syllabus", idx, {
                                  ...doc,
                                  url: e.target.value,
                                })
                              }
                              placeholder="Download URL"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Documents */}
                <div>
                  <h3 className="font-semibold text-blue-800 mb-4 text-lg">
                    Other Documents
                  </h3>
                  <div className="grid gap-4">
                    {(sectionFormData.other || []).map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <input
                            className="font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.name}
                            onChange={(e) =>
                              handleSectionFormArrayChange("other", idx, {
                                ...doc,
                                name: e.target.value,
                              })
                            }
                            placeholder="Document Name"
                          />
                          <input
                            className="text-sm text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 mb-1 w-full"
                            value={doc.description}
                            onChange={(e) =>
                              handleSectionFormArrayChange("other", idx, {
                                ...doc,
                                description: e.target.value,
                              })
                            }
                            placeholder="Description"
                          />
                          <div className="flex gap-2 mt-1">
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-20"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleSectionFormArrayChange("other", idx, {
                                  ...doc,
                                  fileSize: e.target.value,
                                })
                              }
                              placeholder="Size"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 w-16"
                              value={doc.format}
                              onChange={(e) =>
                                handleSectionFormArrayChange("other", idx, {
                                  ...doc,
                                  format: e.target.value,
                                })
                              }
                              placeholder="Format"
                            />
                            <input
                              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 flex-1"
                              value={doc.url}
                              onChange={(e) =>
                                handleSectionFormArrayChange("other", idx, {
                                  ...doc,
                                  url: e.target.value,
                                })
                              }
                              placeholder="Download URL"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeProfilePage;
