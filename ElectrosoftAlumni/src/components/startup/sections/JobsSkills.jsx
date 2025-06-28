import React, { useState, useEffect } from "react";
import {
  Briefcase,
  TrendingUp,
  Star,
  MapPin,
  Bot,
  ClipboardList,
  BarChart,
  Palette,
  Settings,
  Megaphone,
  ShieldCheck,
  Link as LinkIcon, // Renamed to avoid conflict with React Router's Link
  Zap,
  BookOpen,
  Clock,
  BarChart2,
  X,
  PlayCircle, // Added for video
} from "lucide-react";

// Map skill names to specific Lucide icons for a professional look
const iconMap = {
  "Artificial Intelligence": <Bot className="w-6 h-6 text-blue-500" />,
  "Product Management": <ClipboardList className="w-6 h-6 text-purple-500" />,
  "Data Science": <BarChart className="w-6 h-6 text-green-500" />,
  "UI/UX Design": <Palette className="w-6 h-6 text-orange-500" />,
  "DevOps Engineering": <Settings className="w-6 h-6 text-red-500" />,
  "Digital Marketing": <Megaphone className="w-6 h-6 text-yellow-500" />,
  Cybersecurity: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
  "Blockchain Development": <LinkIcon className="w-6 h-6 text-gray-500" />,
};

const JobsSkills = () => {
  // Simplified state containing only the data needed for display
  const [content] = useState({
    title: "Jobs & Trending Skills",
    description:
      "Explore job opportunities and discover the most in-demand skills in the startup ecosystem.",
    trendingSkills: [
      {
        name: "Artificial Intelligence",
        demand: "High",
        growth: "+45%",
        avgSalary: "$120K",
      },
      {
        name: "Product Management",
        demand: "High",
        growth: "+32%",
        avgSalary: "$110K",
      },
      {
        name: "Data Science",
        demand: "High",
        growth: "+28%",
        avgSalary: "$115K",
      },
      {
        name: "UI/UX Design",
        demand: "High",
        growth: "+25%",
        avgSalary: "$85K",
      },
    ],
    marketStats: [
      {
        icon: <Briefcase className="w-8 h-8 text-blue-500" />,
        value: "2,500+",
        label: "Active Jobs",
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-green-500" />,
        value: "85%",
        label: "Placement Rate",
      },
      {
        icon: <Star className="w-8 h-8 text-purple-500" />,
        value: "4.8/5",
        label: "Avg Rating",
      },
      {
        icon: <MapPin className="w-8 h-8 text-orange-500" />,
        value: "50+",
        label: "Cities",
      },
    ],
    learningPaths: {
      "Artificial Intelligence": {
        title: "AI & Machine Learning Path",
        duration: "6-8 months",
        level: "Intermediate",
        modules: [
          "Python for ML",
          "Advanced Statistics",
          "Neural Networks",
          "Deep Learning",
          "NLP",
        ],
        provider: "Coursera",
        rating: 4.9,
        videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
        courseUrl: "https://www.coursera.org/search?query=artificial%20intelligence",
      },
      "Product Management": {
        title: "Product Management Certification",
        duration: "4 months",
        level: "Beginner to Pro",
        modules: [
          "Market Research",
          "UX for PMs",
          "Agile & Scrum",
          "Product Roadmap",
          "Launch Strategy",
        ],
        provider: "Udemy",
        rating: 4.7,
        videoUrl: "https://www.youtube.com/embed/yUOC-Y0f5ZQ",
        courseUrl: "https://www.udemy.com/topic/product-management/",
      },
      "Data Science": {
        title: "Data Science Bootcamp",
        duration: "9 months",
        level: "Beginner",
        modules: [
          "Data Wrangling",
          "Python",
          "SQL",
          "Tableau",
          "Machine Learning Models",
        ],
        provider: "DataCamp",
        rating: 4.8,
        videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
        courseUrl: "https://www.datacamp.com/tracks/data-scientist-professional",
      },
      "UI/UX Design": {
        title: "UI/UX Design Specialization",
        duration: "5 months",
        level: "Beginner",
        modules: [
          "Design Principles",
          "Figma",
          "User Research",
          "Prototyping",
          "Usability Testing",
        ],
        provider: "Interaction Design Foundation",
        rating: 4.9,
        videoUrl: "https://www.youtube.com/embed/68w2VwalD5w",
        courseUrl: "https://www.interaction-design.org/courses",
      },
    },
    jobListings: {
      "Artificial Intelligence": [
        {
          title: "AI Research Scientist",
          company: "InnovateAI",
          location: "San Francisco, CA",
          salary: "$130K - $160K",
          description:
            "Join our team to work on cutting-edge AI research and development.",
          applyUrl: "#",
        },
        {
          title: "Machine Learning Engineer",
          company: "DataDriven Co.",
          location: "Remote",
          salary: "$110K - $140K",
          description:
            "Design and implement machine learning models for our core products.",
          applyUrl: "#",
        },
      ],
      "Product Management": [
        {
          title: "Senior Product Manager",
          company: "AgileMinds Inc.",
          location: "New York, NY",
          salary: "$140K - $170K",
          description: "Lead the product lifecycle from discovery to launch.",
          applyUrl: "#",
        },
      ],
      "Data Science": [
        {
          title: "Data Scientist",
          company: "QuantumLeap",
          location: "Boston, MA",
          salary: "$125K - $155K",
          description:
            "Analyze large datasets to extract meaningful insights and drive business decisions.",
          applyUrl: "#",
        },
        {
          title: "Data Analyst",
          company: "Insightful Inc.",
          location: "Remote",
          salary: "$90K - $110K",
          description:
            "Create visualizations and reports to communicate data-driven stories.",
          applyUrl: "#",
        },
      ],
      "UI/UX Design": [
        {
          title: "Lead UI/UX Designer",
          company: "CreativeFlow",
          location: "Austin, TX",
          salary: "$110K - $135K",
          description:
            "Lead our design team to create intuitive and beautiful user experiences.",
          applyUrl: "#",
        },
        {
          title: "UX Researcher",
          company: "UserFirst Labs",
          location: "Chicago, IL",
          salary: "$85K - $105K",
          description:
            "Conduct user research to inform product design and strategy.",
          applyUrl: "#",
        },
      ],
      // Add more job listings for other skills as needed
    },
  });

  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleLearnSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsLearningModalOpen(true);
  };

  const handleViewJobsClick = (skill) => {
    setSelectedSkill(skill);
    setIsJobsModalOpen(true);
  };

  const closeLearningModal = () => {
    setIsLearningModalOpen(false);
    setSelectedSkill(null);
  };

  const closeJobsModal = () => {
    setIsJobsModalOpen(false);
    setSelectedSkill(null);
  };

  // A dedicated component for skill cards for better structure and readability
  const SkillCard = ({ skill, onLearnClick, onViewJobsClick }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {iconMap[skill.name] || <Zap className="w-6 h-6 text-gray-500" />}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
        </div>
        {skill.demand === "High" && (
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
            {skill.demand}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">Growth Rate</p>
          <p className="text-lg font-bold text-green-500">{skill.growth}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Avg Salary</p>
          <p className="text-lg font-bold text-gray-800">{skill.avgSalary}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Demand</p>
          <p className="text-lg font-bold text-gray-800">{skill.demand}</p>
        </div>
      </div>
      <div className="mt-auto pt-6 flex items-center gap-3">
        <button
          onClick={() => onLearnClick(skill)}
          className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Learn Skill
        </button>
        <button
          onClick={() => onViewJobsClick(skill)}
          className="w-full py-2.5 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
        >
          View Jobs
        </button>
      </div>
    </div>
  );

  // A dedicated component for statistic cards
  const StatCard = ({ stat }) => (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-3 shadow-md">
        {stat.icon}
      </div>
      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
    </div>
  );

  const LearningModal = ({ isOpen, onClose, skill, path }) => {
    const [videoError, setVideoError] = useState(false);

    // Reset video error state when the modal is opened for a new skill
    useEffect(() => {
      if (isOpen) {
        setVideoError(false);
      }
    }, [isOpen, skill]);

    if (!isOpen || !skill || !path) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300">
          <div className="p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {path.videoUrl && !videoError ? (
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-black">
                  <iframe
                    src={path.videoUrl}
                    title={`Introduction to ${skill.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    onError={() => setVideoError(true)} // Set error state if video fails
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0 items-center justify-center hidden sm:flex">
                  {iconMap[skill.name] || (
                    <Zap className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {path.title}
                  </h2>
                  <p className="text-md text-gray-600">for {skill.name}</p>
                </div>
              </div>
            )}

            {videoError && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg"
                role="alert"
              >
                <p className="font-bold">Video Unavailable</p>
                <p>
                  The introduction video could not be loaded. You can still
                  review the learning path below.
                </p>
              </div>
            )}

            <div className="px-2">
              <div className="flex items-center gap-4 mb-4">
                {!path.videoUrl || videoError ? ( // Show header if no video or video error
                  <>
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 items-center justify-center hidden sm:flex">
                      {iconMap[skill.name] || (
                        <Zap className="w-7 h-7 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {path.title}
                      </h2>
                      <p className="text-md text-gray-600">for {skill.name}</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {path.title}
                    </h2>
                    <p className="text-md text-gray-600">for {skill.name}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <p className="font-semibold">{path.duration}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <BarChart2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <p className="font-semibold">{path.level}</p>
                  <p className="text-xs text-gray-500">Level</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <p className="font-semibold">{path.rating}/5</p>
                  <p className="text-xs text-gray-500">by {path.provider}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Modules Covered
                </h3>
                <ul className="space-y-2">
                  {path.modules.map((module, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end">
            <a
              href={path.courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Learning Path
            </a>
          </div>
        </div>
      </div>
    );
  };

  const JobsModal = ({ isOpen, onClose, skill, jobs }) => {
    if (!isOpen || !skill) return null;

    const listings = jobs[skill.name] || [];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-300">
          <div className="p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {iconMap[skill.name] || <Briefcase className="w-7 h-7 text-gray-500" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Job Openings</h2>
                <p className="text-md text-gray-600">for {skill.name}</p>
              </div>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {listings.length > 0 ? (
                listings.map((job, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                      </div>
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm"
                      >
                        Apply Now
                      </a>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 font-semibold">{job.salary}</p>
                    <p className="text-sm text-gray-700 mt-2">{job.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No current job openings for this skill.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className=" mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {content.title}
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {content.trendingSkills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              onLearnClick={handleLearnSkillClick}
              onViewJobsClick={handleViewJobsClick}
            />
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-100 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Market Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.marketStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </div>
      <LearningModal
        isOpen={isLearningModalOpen}
        onClose={closeLearningModal}
        skill={selectedSkill}
        path={selectedSkill ? content.learningPaths[selectedSkill.name] : null}
      />
      <JobsModal
        isOpen={isJobsModalOpen}
        onClose={closeJobsModal}
        skill={selectedSkill}
        jobs={content.jobListings}
      />
    </div>
  );
};

export default JobsSkills;
