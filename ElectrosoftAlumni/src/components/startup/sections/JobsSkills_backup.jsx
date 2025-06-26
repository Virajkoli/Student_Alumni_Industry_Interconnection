import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  Briefcase,
  TrendingUp,
  Star,
  MapPin,
} from "lucide-react";

const JobsSkills = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [newItem, setNewItem] = useState({
    // For trending skills
    name: "",
    demand: "High",
    growth: "",
    avgSalary: "",
    icon: "💡",
    // For jobs
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    skills: [],
    posted: "",
    applicants: 0,
    // For learning paths
    duration: "",
    level: "Beginner",
    modules: [],
    completion: "",
    rating: 4.5
  });

  const [editItem, setEditItem] = useState({
    name: "",
    demand: "High",
    growth: "",
    avgSalary: "",
    icon: "💡",
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    skills: [],
    posted: "",
    applicants: 0,
    duration: "",
    level: "Beginner",
    modules: [],
    completion: "",
    rating: 4.5
  });
    title: "Jobs & Trending Skills",
    description:
      "Explore job opportunities and discover the most in-demand skills in the startup ecosystem.",
    categories: {
      trending: {
        title: "Trending Skills",
        skills: [
          {
            name: "Artificial Intelligence",
            demand: "High",
            growth: "+45%",
            avgSalary: "$120K",
            icon: "🤖",
          },
          {
            name: "Product Management",
            demand: "High",
            growth: "+32%",
            avgSalary: "$110K",
            icon: "📋",
          },
          {
            name: "Data Science",
            demand: "High",
            growth: "+28%",
            avgSalary: "$115K",
            icon: "📊",
          },
          {
            name: "UI/UX Design",
            demand: "High",
            growth: "+25%",
            avgSalary: "$85K",
            icon: "🎨",
          },
          {
            name: "DevOps Engineering",
            demand: "High",
            growth: "+38%",
            avgSalary: "$105K",
            icon: "⚙️",
          },
          {
            name: "Digital Marketing",
            demand: "Medium",
            growth: "+22%",
            avgSalary: "$70K",
            icon: "📱",
          },
          {
            name: "Cybersecurity",
            demand: "High",
            growth: "+35%",
            avgSalary: "$95K",
            icon: "🔒",
          },
          {
            name: "Blockchain Development",
            demand: "Medium",
            growth: "+40%",
            avgSalary: "$125K",
            icon: "⛓️",
          },
        ],
      },
      jobs: {
        title: "Available Jobs",
        jobs: [
          {
            title: "Senior Product Manager",
            company: "TechStart Inc.",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$120K - $150K",
            skills: ["Product Strategy", "Agile", "Data Analysis"],
            posted: "2 days ago",
            applicants: 45,
          },
          {
            title: "Frontend Developer",
            company: "InnovateLab",
            location: "Remote",
            type: "Full-time",
            salary: "$80K - $110K",
            skills: ["React", "TypeScript", "Tailwind CSS"],
            posted: "1 day ago",
            applicants: 32,
          },
          {
            title: "Data Scientist",
            company: "AI Solutions",
            location: "New York, NY",
            type: "Full-time",
            salary: "$110K - $140K",
            skills: ["Python", "Machine Learning", "SQL"],
            posted: "3 days ago",
            applicants: 28,
          },
          {
            title: "UX Designer",
            company: "DesignFirst",
            location: "Austin, TX",
            type: "Contract",
            salary: "$70K - $90K",
            skills: ["Figma", "User Research", "Prototyping"],
            posted: "1 week ago",
            applicants: 19,
          },
          {
            title: "Marketing Manager",
            company: "GrowthHacker",
            location: "Remote",
            type: "Full-time",
            salary: "$75K - $95K",
            skills: ["Growth Marketing", "Analytics", "SEO"],
            posted: "4 days ago",
            applicants: 38,
          },
          {
            title: "DevOps Engineer",
            company: "CloudTech",
            location: "Seattle, WA",
            type: "Full-time",
            salary: "$100K - $130K",
            skills: ["AWS", "Docker", "Kubernetes"],
            posted: "5 days ago",
            applicants: 22,
          },
        ],
      },
      learning: {
        title: "Learning Paths",
        paths: [
          {
            title: "Full-Stack Development",
            duration: "6-8 months",
            level: "Beginner to Advanced",
            modules: [
              "HTML/CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Databases",
            ],
            completion: "12,000+ students",
            rating: 4.8,
          },
          {
            title: "Data Science & AI",
            duration: "8-10 months",
            level: "Intermediate",
            modules: [
              "Python",
              "Statistics",
              "Machine Learning",
              "Deep Learning",
              "Data Visualization",
            ],
            completion: "8,500+ students",
            rating: 4.9,
          },
          {
            title: "Product Management",
            duration: "4-6 months",
            level: "Beginner",
            modules: [
              "Product Strategy",
              "User Research",
              "Analytics",
              "Agile Methodologies",
              "Leadership",
            ],
            completion: "6,200+ students",
            rating: 4.7,
          },
          {
            title: "Digital Marketing",
            duration: "3-4 months",
            level: "Beginner",
            modules: [
              "SEO/SEM",
              "Social Media",
              "Content Marketing",
              "Email Marketing",
              "Analytics",
            ],
            completion: "9,800+ students",
            rating: 4.6,
          },
        ],
      },
    },
  });

  const [content, setContent] = useState({
    title: "Jobs & Trending Skills",
    description:
      "Explore job opportunities and discover the most in-demand skills in the startup ecosystem.",

      {/* Category Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {Object.entries(content.categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === key
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Trending Skills */}
      {selectedCategory === "trending" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.categories.trending.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {editingItemIndex?.index === index && editingItemIndex?.category === 'trending' ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateItem(index, "name", e.target.value, 'trending')}
                        className="w-full text-lg font-semibold p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Skill name"
                      />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleSaveItem(index, skill, 'trending')}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-md border border-blue-600 min-w-[70px]"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelItemEdit}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-md border border-gray-500 min-w-[70px]"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon (Emoji)
                      </label>
                      <input
                        type="text"
                        value={skill.icon}
                        onChange={(e) => updateItem(index, "icon", e.target.value, 'trending')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        placeholder="🤖"
                        maxLength="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Demand Level
                      </label>
                      <select
                        value={skill.demand}
                        onChange={(e) => updateItem(index, "demand", e.target.value, 'trending')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Growth Rate
                      </label>
                      <input
                        type="text"
                        value={skill.growth}
                        onChange={(e) => updateItem(index, "growth", e.target.value, 'trending')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+45%"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Average Salary
                      </label>
                      <input
                        type="text"
                        value={skill.avgSalary}
                        onChange={(e) => updateItem(index, "avgSalary", e.target.value, 'trending')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="$120K"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${getDemandColor(
                          skill.demand
                        )}`}
                      >
                        {skill.demand}
                      </span>
                      {!isEditing && (
                        <button
                          onClick={() => handleEditItem(index, 'trending')}
                          className="p-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                          title="Edit this skill"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Growth Rate</p>
                      <p className="font-semibold text-green-600">{skill.growth}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Avg Salary</p>
                      <p className="font-semibold text-gray-900">
                        {skill.avgSalary}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Demand</p>
                      <p className="font-semibold text-gray-900">{skill.demand}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Learn Skill
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                      View Jobs
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Available Jobs */}
      {selectedCategory === "jobs" && (
        <div className="space-y-4">
          {content.categories.jobs.jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {editingItemIndex?.index === index && editingItemIndex?.category === 'jobs' ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={job.title}
                          onChange={(e) => updateItem(index, "title", e.target.value, 'jobs')}
                          className="w-full text-lg font-semibold p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Job title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={job.company}
                          onChange={(e) => updateItem(index, "company", e.target.value, 'jobs')}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleSaveItem(index, job, 'jobs')}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-md border border-blue-600 min-w-[70px]"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelItemEdit}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-md border border-gray-500 min-w-[70px]"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={job.location}
                        onChange={(e) => updateItem(index, "location", e.target.value, 'jobs')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Type
                      </label>
                      <select
                        value={job.type}
                        onChange={(e) => updateItem(index, "type", e.target.value, 'jobs')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        value={job.salary}
                        onChange={(e) => updateItem(index, "salary", e.target.value, 'jobs')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="$80K - $110K"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Required Skills (comma-separated)
                      </label>
                      <textarea
                        value={job.skills.join(", ")}
                        onChange={(e) => updateItem(index, "skills", e.target.value.split(",").map(s => s.trim()).filter(s => s.length > 0), 'jobs')}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Skill 1, Skill 2, Skill 3"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Posted
                        </label>
                        <input
                          type="text"
                          value={job.posted}
                          onChange={(e) => updateItem(index, "posted", e.target.value, 'jobs')}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="2 days ago"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Applicants
                        </label>
                        <input
                          type="number"
                          value={job.applicants}
                          onChange={(e) => updateItem(index, "applicants", parseInt(e.target.value) || 0, 'jobs')}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="45"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.posted}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {job.salary}
                        </p>
                        <p className="text-sm text-gray-600">
                          {job.applicants} applicants
                        </p>
                      </div>
                      {!isEditing && (
                        <button
                          onClick={() => handleEditItem(index, 'jobs')}
                          className="p-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                          title="Edit this job"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Save Job
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Learning Paths */}
      {selectedCategory === "learning" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.categories.learning.paths.map((path, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {editingItemIndex?.index === index && editingItemIndex?.category === 'learning' ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Learning Path Title
                      </label>
                      <input
                        type="text"
                        value={path.title}
                        onChange={(e) => updateItem(index, "title", e.target.value, 'learning')}
                        className="w-full text-lg font-semibold p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Learning path title"
                      />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleSaveItem(index, path, 'learning')}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-md border border-blue-600 min-w-[70px]"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelItemEdit}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-md border border-gray-500 min-w-[70px]"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={path.duration}
                        onChange={(e) => updateItem(index, "duration", e.target.value, 'learning')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="6-8 months"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Level
                      </label>
                      <select
                        value={path.level}
                        onChange={(e) => updateItem(index, "level", e.target.value, 'learning')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Beginner to Advanced">Beginner to Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={path.rating}
                        onChange={(e) => updateItem(index, "rating", parseFloat(e.target.value) || 0, 'learning')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="4.8"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Modules (comma-separated)
                      </label>
                      <textarea
                        value={path.modules.join(", ")}
                        onChange={(e) => updateItem(index, "modules", e.target.value.split(",").map(m => m.trim()).filter(m => m.length > 0), 'learning')}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Module 1, Module 2, Module 3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Info
                      </label>
                      <input
                        type="text"
                        value={path.completion}
                        onChange={(e) => updateItem(index, "completion", e.target.value, 'learning')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="12,000+ students"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {path.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{path.duration}</span>
                        <span>•</span>
                        <span>{path.level}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{path.rating}</span>
                      </div>
                      {!isEditing && (
                        <button
                          onClick={() => handleEditItem(index, 'learning')}
                          className="p-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                          title="Edit this learning path"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Modules:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.modules.map((module, moduleIndex) => (
                        <span
                          key={moduleIndex}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{path.completion}</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Popular</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Start Learning
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Market Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2,500+</p>
            <p className="text-sm text-gray-600">Active Jobs</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">Placement Rate</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8/5</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-sm text-gray-600">Cities</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!isEditing && (
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">
            Ready to Boost Your Career?
          </h3>
          <p className="mb-4">
            Join thousands of professionals who have advanced their careers
            through our platform.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Learning Today
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
              Explore All Jobs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsSkills;
