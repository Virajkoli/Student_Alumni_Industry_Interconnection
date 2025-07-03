import React, { useState } from "react";
import {
  Edit3,
  Calendar,
  User,
  Heart,
  MessageCircle,
  Share2,
  Briefcase,
  Newspaper,
  X,
  Plus,
} from "lucide-react";

const PostNewsJobs = () => {
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [postsData, setPostsData] = useState([
    {
      id: 1,
      type: "job",
      title: "Hiring: Senior React Developer",
      company: "TechStart Solutions",
      author: "HR Team",
      description: "Looking for experienced React developers with 5+ years of experience...",
      skills: ["React", "JavaScript", "Node.js", "TypeScript"],
      requirements: [
        "Bachelor's degree in Computer Science",
        "5+ years React experience",
        "Strong problem-solving skills",
      ],
      location: "Mumbai, Maharashtra",
      salary: "₹12-18 LPA",
      date: "2 days ago",
      likes: 45,
      comments: 12,
      shares: 8,
    },
    {
      id: 2,
      type: "news",
      title: "AI Revolution in Healthcare Industry",
      company: "HealthTech News",
      author: "News Desk",
      description: "Artificial Intelligence is transforming healthcare with innovative solutions...",
      category: "Technology",
      content: "The healthcare industry is experiencing unprecedented changes...",
      date: "1 day ago",
      likes: 128,
      comments: 34,
      shares: 67,
    },
    {
      id: 3,
      type: "post",
      title: "Startup Funding Trends 2024",
      company: "StartupHub",
      author: "Investment Team",
      description: "Analysis of current funding patterns and future predictions...",
      tags: ["Funding", "Startups", "Investment"],
      content: "The startup ecosystem is witnessing significant changes in funding patterns...",
      date: "3 days ago",
      likes: 89,
      comments: 23,
      shares: 41,
    },
    {
      id: 4,
      type: "event",
      title: "Tech Innovation Summit 2024",
      company: "TechEvents",
      author: "Event Organizer",
      description: "Join industry leaders discussing the future of technology...",
      eventDate: "March 15, 2024",
      location: "Bangalore Convention Center",
      content: "A premier technology event bringing together innovators...",
      date: "5 days ago",
      likes: 156,
      comments: 78,
      shares: 94,
    },
  ]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#1F2D3D' }}>
          Posts, News & Jobs
        </h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #DCE8F2' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#1F2D3D' }}>Total Posts</p>
                <p className="text-2xl font-bold" style={{ color: '#6EA9CB' }}>
                  {postsData.filter((item) => item.type === "post").length}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F7FAFC' }}>
                <Edit3 className="w-6 h-6" style={{ color: '#6EA9CB' }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #DCE8F2' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#1F2D3D' }}>Job Listings</p>
                <p className="text-2xl font-bold" style={{ color: '#6EA9CB' }}>
                  {postsData.filter((item) => item.type === "job").length}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F7FAFC' }}>
                <Briefcase className="w-6 h-6" style={{ color: '#6EA9CB' }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #DCE8F2' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#1F2D3D' }}>News Articles</p>
                <p className="text-2xl font-bold" style={{ color: '#6EA9CB' }}>
                  {postsData.filter((item) => item.type === "news").length}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F7FAFC' }}>
                <Newspaper className="w-6 h-6" style={{ color: '#6EA9CB' }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #DCE8F2' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#1F2D3D' }}>Events</p>
                <p className="text-2xl font-bold" style={{ color: '#6EA9CB' }}>
                  {postsData.filter((item) => item.type === "event").length}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F7FAFC' }}>
                <Calendar className="w-6 h-6" style={{ color: '#6EA9CB' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {postsData.map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-6 shadow-sm transition-all duration-200"
              style={{ backgroundColor: 'white', border: '1px solid #DCE8F2' }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {item.type === "job" ? (
                    <Briefcase className="w-5 h-5" style={{ color: '#6EA9CB' }} />
                  ) : item.type === "news" ? (
                    <Newspaper className="w-5 h-5" style={{ color: '#6EA9CB' }} />
                  ) : item.type === "event" ? (
                    <Calendar className="w-5 h-5" style={{ color: '#6EA9CB' }} />
                  ) : (
                    <Edit3 className="w-5 h-5" style={{ color: '#6EA9CB' }} />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: '#DCE8F2',
                          color: '#1F2D3D'
                        }}
                      >
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: '#1F2D3D' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: '#1F2D3D' }}>{item.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#6EA9CB' }} />
                  <span className="text-sm" style={{ color: '#1F2D3D' }}>{item.author}</span>
                </div>
              </div>

              <p className="mb-4" style={{ color: '#1F2D3D' }}>{item.description}</p>

              {item.type === "job" && (
                <div className="mb-4 space-y-3">
                  {item.skills && item.skills.length > 0 && (
                    <div>
                      <span className="text-sm font-medium" style={{ color: '#1F2D3D' }}>Skills: </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: '#B5D3E7',
                              color: '#1F2D3D'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    {item.location && (
                      <span style={{ color: '#1F2D3D' }}>📍 {item.location}</span>
                    )}
                    {item.salary && (
                      <span style={{ color: '#1F2D3D' }}>💰 {item.salary}</span>
                    )}
                  </div>
                </div>
              )}

              {item.type === "news" && item.category && (
                <div className="mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: '#B5D3E7',
                      color: '#1F2D3D'
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              )}

              {item.type === "event" && (
                <div className="mb-4 space-y-2">
                  {item.eventDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: '#6EA9CB' }} />
                      <span className="text-sm" style={{ color: '#1F2D3D' }}>{item.eventDate}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="text-sm" style={{ color: '#1F2D3D' }}>📍 {item.location}</div>
                  )}
                </div>
              )}

              {item.type === "post" && item.tags && item.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: '#B5D3E7',
                          color: '#1F2D3D'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid #DCE8F2' }}>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2" style={{ color: '#6EA9CB' }}>
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#6EA9CB' }}>
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{item.comments}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#6EA9CB' }}>
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">{item.shares}</span>
                  </div>
                </div>
                <span className="text-sm" style={{ color: '#1F2D3D' }}>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostNewsJobs;

