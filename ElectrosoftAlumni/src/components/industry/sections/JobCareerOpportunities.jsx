import React, { useState } from "react";
import {
  Edit3,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Star,
  Search,
  Plus,
  X,
  Users,
  Building2,
  Bookmark,
} from "lucide-react";

const JobCareerOpportunities = () => {
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [jobData, setJobData] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "Mumbai, Maharashtra",
      salary: "₹15-25 LPA",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      description:
        "Join our dynamic team to build scalable web applications using modern technologies. Work on exciting projects that impact millions of users.",
      posted: "2 days ago",
      applicants: "45",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Bangalore, Karnataka",
      salary: "₹20-30 LPA",
      type: "Full-time",
      experience: "4-6 years",
      skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
      description:
        "Lead product development from conception to launch. Collaborate with cross-functional teams to deliver innovative solutions.",
      posted: "1 week ago",
      applicants: "67",
    },
    {
      id: 3,
      title: "Data Scientist Intern",
      company: "DataVision Labs",
      location: "Delhi, NCR",
      salary: "₹25-35K/month",
      type: "Internship",
      experience: "0-1 years",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      description:
        "Gain hands-on experience in data analysis, machine learning model development, and statistical analysis in a fast-paced environment.",
      posted: "3 days ago",
      applicants: "123",
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    experience: "",
    skills: "",
    description: "",
  });

  const handleEdit = (job) => {
    setEditingId(job.id);
    setEditData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,
      experience: job.experience,
      skills: job.skills.join(", "),
      description: job.description,
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setEditData({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "Full-time",
      experience: "",
      skills: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      // Edit existing job
      setJobData(
        jobData.map((job) =>
          job.id === editingId
            ? {
                ...job,
                title: editData.title,
                company: editData.company,
                location: editData.location,
                salary: editData.salary,
                type: editData.type,
                experience: editData.experience,
                skills: editData.skills.split(",").map((skill) => skill.trim()),
                description: editData.description,
              }
            : job
        )
      );
    } else {
      // Add new job
      setJobData([
        ...jobData,
        {
          id: jobData.length + 1,
          ...editData,
          skills: editData.skills.split(",").map((skill) => skill.trim()),
          posted: "Just now",
          applicants: "0",
        },
      ]);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F7FAFC' }}>
      {/* Header Section with Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#1F2D3D' }}>
              Job & Career Opportunities
            </h2>
            <p className="mt-1" style={{ color: '#1F2D3D', opacity: 0.7 }}>
              Discover your next career move with leading companies
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors gap-2 self-start"
            style={{ backgroundColor: '#6EA9CB' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5A8BA8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6EA9CB'}
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm ">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6EA9CB' }} />
              <input
                type="text"
                placeholder="Search jobs by title, company, or skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none bg-white"
                style={{ 
                  borderColor: '#DCE8F2',
                  color: '#1F2D3D'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#B5D3E7';
                  e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#DCE8F2';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none bg-white"
                style={{ 
                  borderColor: '#DCE8F2',
                  color: '#1F2D3D'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#B5D3E7';
                  e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#DCE8F2';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">All Locations</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6">
        {jobData.map((job) => (
          <div
            key={job.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors" style={{ color: '#1F2D3D' }}>
                        {job.title}
                      </h3>
                      <p className="text-lg font-medium" style={{ color: '#6EA9CB' }}>
                        {job.company}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: '#6EA9CB' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#F7FAFC';
                        e.target.style.color = '#1F2D3D';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#6EA9CB';
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm mt-3" style={{ color: '#1F2D3D' }}>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: '#DCE8F2' }}>
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: '#DCE8F2' }}>
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: '#DCE8F2' }}>
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: '#DCE8F2' }}>
                      <Clock className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none mb-4" style={{ color: '#1F2D3D', opacity: 0.8 }}>
                {job.description}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2" style={{ color: '#1F2D3D' }}>
                  Required Skills:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium rounded-full"
                      style={{ backgroundColor: '#B5D3E7', color: '#1F2D3D' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #DCE8F2' }}>
                <div className="flex items-center gap-4 text-sm" style={{ color: '#1F2D3D', opacity: 0.7 }}>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Posted {job.posted}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {job.applicants} applicants
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                    style={{ 
                      color: '#1F2D3D', 
                      backgroundColor: '#F7FAFC',
                      borderColor: '#DCE8F2'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#DCE8F2';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#F7FAFC';
                    }}
                  >
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                  <button className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                    style={{ backgroundColor: '#6EA9CB' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#5A8BA8'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#6EA9CB'}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6" style={{ borderBottom: '1px solid #DCE8F2' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold" style={{ color: '#1F2D3D' }}>
                  {editingId ? "Edit Job Posting" : "Create New Job Posting"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: '#6EA9CB' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F7FAFC';
                    e.target.style.color = '#1F2D3D';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#6EA9CB';
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Job Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium" style={{ color: '#1F2D3D' }}>
                  Job Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: '#DCE8F2', 
                        backgroundColor: '#FFFFFF',
                        color: '#1F2D3D'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#B5D3E7';
                        e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DCE8F2';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={editData.company}
                      onChange={(e) =>
                        setEditData({ ...editData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: '#DCE8F2', 
                        backgroundColor: '#FFFFFF',
                        color: '#1F2D3D'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#B5D3E7';
                        e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DCE8F2';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="e.g., Tech Solutions Inc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: '#DCE8F2', 
                        backgroundColor: '#FFFFFF',
                        color: '#1F2D3D'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#B5D3E7';
                        e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DCE8F2';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="e.g., Mumbai, Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                      Job Type
                    </label>
                    <select
                      value={editData.type}
                      onChange={(e) =>
                        setEditData({ ...editData, type: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: '#DCE8F2', 
                        backgroundColor: '#FFFFFF',
                        color: '#1F2D3D'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#B5D3E7';
                        e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DCE8F2';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                      Salary Range
                    </label>
                    <input
                      type="text"
                      value={editData.salary}
                      onChange={(e) =>
                        setEditData({ ...editData, salary: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: '#DCE8F2', 
                        backgroundColor: '#FFFFFF',
                        color: '#1F2D3D'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#B5D3E7';
                        e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DCE8F2';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="e.g., ₹15-25 LPA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                      Experience Required
                    </label>
                    <input
                      type="text"
                      value={editData.experience}
                      onChange={(e) =>
                        setEditData({ ...editData, experience: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: '#DCE8F2', 
                        backgroundColor: '#FFFFFF',
                        color: '#1F2D3D'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#B5D3E7';
                        e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DCE8F2';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="e.g., 3-5 years"
                    />
                  </div>
                </div>
              </div>

              {/* Skills & Description */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium" style={{ color: '#1F2D3D' }}>
                  Skills & Description
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Required Skills
                  </label>
                  <input
                    type="text"
                    value={editData.skills}
                    onChange={(e) =>
                      setEditData({ ...editData, skills: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{ 
                      borderColor: '#DCE8F2', 
                      backgroundColor: '#FFFFFF',
                      color: '#1F2D3D'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#B5D3E7';
                      e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#DCE8F2';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                  />
                  <p className="mt-1 text-sm" style={{ color: '#1F2D3D', opacity: 0.7 }}>
                    Add multiple skills separated by commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                    Job Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{ 
                      borderColor: '#DCE8F2', 
                      backgroundColor: '#FFFFFF',
                      color: '#1F2D3D'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#B5D3E7';
                      e.target.style.boxShadow = '0 0 0 2px rgba(181, 211, 231, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#DCE8F2';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Describe the role, responsibilities, and requirements..."
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ backgroundColor: '#F7FAFC', borderColor: '#DCE8F2' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{ 
                  color: '#1F2D3D', 
                  backgroundColor: '#FFFFFF',
                  borderColor: '#DCE8F2'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DCE8F2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#6EA9CB' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5A8BA8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6EA9CB'}
              >
                {editingId ? "Save Changes" : "Post Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCareerOpportunities;
