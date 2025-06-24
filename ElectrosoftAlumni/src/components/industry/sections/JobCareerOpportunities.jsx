import React, { useState } from "react";
import {
  Edit3,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Star,
} from "lucide-react";

const JobCareerOpportunities = () => {
  const [editingId, setEditingId] = useState(null);
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
    type: "",
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
  };

  const handleSave = () => {
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
    setEditingId(null);
    setEditData({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "",
      experience: "",
      skills: "",
      description: "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "",
      experience: "",
      skills: "",
      description: "",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Job & Career Opportunities
          </h2>
          <p className="text-gray-600 mt-1">
            Discover latest job openings and career paths in your industry
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Post New Job
        </button>
      </div>

      <div className="space-y-6">
        {jobData.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editingId === job.id ? (
              // Edit Mode
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={editData.company}
                        onChange={(e) =>
                          setEditData({ ...editData, company: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary
                      </label>
                      <input
                        type="text"
                        value={editData.salary}
                        onChange={(e) =>
                          setEditData({ ...editData, salary: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Type
                      </label>
                      <select
                        value={editData.type}
                        onChange={(e) =>
                          setEditData({ ...editData, type: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Required
                    </label>
                    <input
                      type="text"
                      value={editData.experience}
                      onChange={(e) =>
                        setEditData({ ...editData, experience: e.target.value })
                      }
                      placeholder="e.g., 3-5 years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editData.skills}
                      onChange={(e) =>
                        setEditData({ ...editData, skills: e.target.value })
                      }
                      placeholder="React, Node.js, MongoDB"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg text-blue-600 font-medium mb-3">
                      {job.company}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {job.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Required Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Posted {job.posted}</span>
                    <span>{job.applicants} applicants</span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Save Job
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Job Categories */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Browse by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Engineering", count: "450+ jobs", icon: "⚙️" },
            { name: "Management", count: "280+ jobs", icon: "👔" },
            { name: "Design", count: "190+ jobs", icon: "🎨" },
            { name: "Sales", count: "320+ jobs", icon: "📈" },
            { name: "Marketing", count: "240+ jobs", icon: "📢" },
            { name: "HR", count: "150+ jobs", icon: "👥" },
            { name: "Finance", count: "200+ jobs", icon: "💰" },
            { name: "Operations", count: "180+ jobs", icon: "⚡" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <h4 className="font-medium text-gray-900">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCareerOpportunities;
