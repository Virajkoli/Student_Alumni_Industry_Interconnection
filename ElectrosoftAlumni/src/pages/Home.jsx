// src/pages/Home.js
// import React from 'react';

// const Home = () => {
//   return (
//     <div className="page">
//       <h1>Home Page</h1>
//       <p>Welcome to the application!</p>
//     </div>
//   );
// };

// export default Home;

// // Home.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVideo, faImage, faNewspaper, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const posts = [
//     {
//       id: 1,
//       user: 'SGR Knowledge Foundation',
//       followers: '287 followers',
//       time: '42m • 😊',
//       content: 'An Evening of Grace & Inner Awakening',
//       details: 'We are honoured to host Jaya Kishori Ji for the G H Raisoni Memorial Talk …more',
//       event: {
//         title: 'G H RAISONI MEMORIAL TALK',
//         description: 'Featuring the inspiring presence of Jaya Kishori Ji in "You Are Enough: Confidence. Character & the Quiet Revolution Within"'
//       }
//     },
//     {
//       id: 2,
//       user: 'riya',
//       content: 'Built a new portfolio in React',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKMVsB3JItIUX-GQrUha5aq42mLal9vr5ag&s',
//       likes: 24,
//       comments: 5,
//       time: '2h ago'
//     },
//     {
//       id: 2,
//       user: 'aman',
//       content: 'CSS Grid is magical. Try it',
//       image: 'https://miro.medium.com/v2/resize:fit:3608/0*og90_m1gsg9iOY7i.png',
//       likes: 42,
//       comments: 12,
//       time: '5h ago'
//     }

//   ];

//   const newsItems = [
//     { title: 'ReactJS', time: '3h ago • 127,384 readers' },
//     { title: 'Private equity eyes tech deals', time: '16h ago • 696 readers' },
//     { title: 'Indian startups shine on global list', time: '16h ago • 652 readers' },
//     { title: 'More Indians tune into smart TVs', time: '16h ago • 313 readers' },
//     { title: 'Motorsports ready to rev up', time: '16h ago • 270 readers' }
//   ];

//   const puzzles = [
//     { name: 'Java', played: '12 connections played' },
//     { name: 'Tango #255', played: '6 connections played' },
//     { name: 'Queens #415', played: '5 connections played' }
//   ];

//   return (
//     <div className="linkedin-container">
//       <div className="main-content">
//         {/* Left Sidebar */}
//         <aside className="left-sidebar">
//           <div className="profile-card">
//             <div className="profile-banner"></div>
//             <div className="profile-info">
//               <div className="profile-pic">RW</div>
//               <h2>Rashmi Wankhede</h2>
//               <p>Fresher | Java full stack developer | SQL</p>
//               <p className="location">Mumbai, Maharashtra</p>
//             </div>
//             <div className="saved-items">
//               <h3></h3>
//               <ul>
//                 <li><Link to="/industry" className="sidebar-link">Industry</Link></li>
//                 <li><Link to="/industry/project" className="sidebar-link">Industry Project</Link></li>
//                 <li><Link to="/alumni" className="sidebar-link">Alumni</Link></li>
//                 <li><Link to="/startup" className="sidebar-link">Startup</Link></li>
//                 <li><Link to="/college" className="sidebar-link">College</Link></li>
//                 <li><Link to="/industryprofile" className="sidebar-link">Industry Profile</Link></li>
//                 <li><Link to="/CollegeProfile" className="sidebar-link">College Profile</Link></li>
//               </ul>
//             </div>
//           </div>
//         </aside>

//         {/* Main Feed */}
//         <main className="feed">
//           <div className="create-post">
//             <div className="post-input">
//               <div className="profile-pic-small">RW</div>
//               <input type="text" placeholder="Start a post" />
//             </div>
//             <div className="post-options">
//               <button><FontAwesomeIcon icon={faImage} /> Photo</button>
//               <button><FontAwesomeIcon icon={faVideo} /> Video</button>
//               <button><FontAwesomeIcon icon={faNewspaper} /> Write article</button>
//             </div>
//           </div>

//           {posts.map(post => (
//   <div className="post-card" key={post.id}>
//     <div className="post-header">
//       <div className="poster-info">
//         <div className="profile-pic-small">{post.user.charAt(0)}</div>
//         <div>
//           <h4>{post.user}</h4>
//           <p className="post-meta">{post.followers} • {post.time}</p>
//         </div>
//       </div>
//       <button className="more-options"><FontAwesomeIcon icon={faEllipsisH} /></button>
//     </div>
//     <div className="post-content">
//       <p>{post.content}</p>
//       <p className="post-details">{post.details}</p>
//       {post.image && (
//         <img
//           src={post.image}
//           alt="Post content"
//           style={{
//             width: '100%',
//             maxHeight: '400px',
//             objectFit: 'cover',
//             borderRadius: '8px',
//             marginTop: '12px'
//           }}
//         />
//       )}
//       {post.event && (
//         <div className="event-card">
//           <h4>{post.event.title}</h4>
//           <p>{post.event.description}</p>
//         </div>
//       )}
//     </div>
//   </div>
// ))}
//         </main>

//         {/* Right Sidebar */}
//         <aside className="right-sidebar">
//           <div className="news-card">
//             <h3>News Related to project</h3>
//             <ul className="news-list">
//               {newsItems.map((item, index) => (
//                 <li key={index}>
//                   <p>{item.title}</p>
//                   <span>{item.time}</span>
//                 </li>
//               ))}
//             </ul>
//             <button className="show-more">Show more ▼</button>
//           </div>

//           <div className="puzzles-card">
//             <h3>Today's puzzles</h3>
//             <ul className="puzzles-list">
//               {puzzles.map((puzzle, index) => (
//                 <li key={index}>
//                   <span className="puzzle-name">{puzzle.name}</span>
//                   <span className="puzzle-played">{puzzle.played}</span>
//                 </li>
//               ))}
//             </ul>
//             <button className="show-more">Show more ▼</button>
//           </div>

//           {/* <div className="premium-message">
//             <p>Rashmi, rescheek your Premium Message</p>
//           </div> */}
//         </aside>
//       </div>
//     </div>
//   );
// };

// Inside your <div className="main-content">

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../utils/apiService";
import PostCreator from "../components/student/PostCreator";

import {
  faIndustry,
  faFolderOpen,
  faUserGraduate,
  faRocket,
  faSchool,
  faUserGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  faVideo,
  faImage,
  faNewspaper,
  faEllipsisH,
  faBars,
  faHome,
  faUserFriends,
  faBriefcase,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faComment,
  faRetweet,
  faPaperPlane,
  // ... your other existing imports
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("🔍 Home.jsx useEffect - Auth status:", {
      isAuthenticated,
      user,
      userType: typeof user,
      userKeys: user ? Object.keys(user) : null,
      userFullName: user ? user.fullName : null,
      userFirstName: user ? user.first_name : null,
      userLastName: user ? user.last_name : null,
    });

    if (isAuthenticated && user) {
      fetchUserProfile();
      fetchPosts();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);

      console.log("🔄 fetchUserProfile - Starting...", {
        userRole: user.role,
        userId: user.id,
        userFullName: user.fullName,
      });

      // Fetch profile data based on user role
      let response;
      if (user.role === "student") {
        response = await apiService.getStudentProfile();
        console.log("📊 Student profile response:", response);
      } else {
        // For other roles, we'll use the basic user data from auth context
        console.log("👤 Using basic user data for non-student role");
        setUserProfile({
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        });
        setIsLoading(false);
        return;
      }

      if (response.success) {
        const { data } = response;
        console.log("✅ Setting user profile from API:", data);
        setUserProfile({
          fullName: data.basicInfo.fullName,
          email: data.basicInfo.email,
          role: data.basicInfo.role,
          avatar: data.basicInfo.avatar,
          bio: data.basicInfo.bio,
          location: data.basicInfo.location,
          // Additional student-specific data
          experiences: data.experiences || [],
          education: data.education || [],
          skills: data.skills || [],
        });
      }
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      // Fallback to auth context user data
      console.log("🔄 Falling back to auth context user data:", user);
      setUserProfile({
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      console.log("🔄 fetchPosts - Starting...");

      const token = localStorage.getItem("authToken");
      const response = await fetch("https://scaips-backend.onrender.com/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      console.log("✅ Posts fetched successfully:", data);

      if (data.success) {
        setPosts(data.data || []);
      }
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    console.log("🎉 New post created:", newPost);
    // Refresh posts after creating a new one
    fetchPosts();
  };

  const getUserDisplayName = () => {
    console.log("🏷️ getUserDisplayName called:", {
      userProfile,
      hasUserProfile: !!userProfile,
      userProfileFullName: userProfile?.fullName,
      authUser: user,
      authUserFullName: user?.fullName,
      isAuthenticated,
    });

    if (!userProfile || !userProfile.fullName) {
      // Try to get name from auth context user if userProfile is not set yet
      if (user && user.fullName) {
        console.log(
          "🔄 Using fallback fullName from auth context:",
          user.fullName
        );
        return user.fullName;
      }
      console.log("❌ No fullName available, returning Guest User");
      return "Guest User";
    }
    console.log("✅ Using userProfile fullName:", userProfile.fullName);
    return userProfile.fullName;
  };

  const getUserBio = () => {
    if (!userProfile || !userProfile.role) return "Welcome to the platform!";

    if (userProfile.role === "student") {
      // Create a bio from skills and latest education/experience
      const skills =
        userProfile.skills
          ?.slice(0, 3)
          .map((skill) =>
            typeof skill === "object" ? skill.skill_name : skill
          )
          .join(" | ") || "";

      if (skills) {
        return `${
          userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)
        } | ${skills}`;
      }
    }

    return (
      userProfile.bio ||
      `${userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}`
    );
  };

  const getUserLocation = () => {
    return userProfile?.location || "Location not set";
  };

  const getUserAvatar = () => {
    if (userProfile?.avatar) {
      return userProfile.avatar;
    }
    // Fallback to a generated avatar based on name
    const name = getUserDisplayName();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0d8abc&color=fff&size=100`;
  };

  const getUserInitials = () => {
    if (isLoading || !userProfile) return "GU";
    const name = getUserDisplayName();
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const newsItems = [
    { title: "ReactJS", time: "3h ago • 127,384 readers" },
    { title: "Private equity eyes tech deals", time: "16h ago • 696 readers" },
  ];

  const puzzles = [
    { name: "Java", played: "12 connections played" },
    { name: "Tango #255", played: "6 connections played" },
  ];

  return (
    <div className="linkedin-container">
      {/* Mobile Search Header */}
      <div className="mobile-search-header">
        <input
          type="text"
          className="mobile-search-input"
          placeholder="Search"
        />
      </div>

      {/* Sidebar Toggle (for desktop)
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button> */}

      <div className="main-content">
        {/* Left Sidebar (Desktop) */}
        {showSidebar && (
          <nav>
            <aside className="left-nav-sidebar">
              <div className="quick-links">
                <div className="profile-banner-linkedin"></div>
                <div className="profile-img-circle">
                  {isLoading ? (
                    <div className="loading-avatar">Loading...</div>
                  ) : (
                    <img src={getUserAvatar()} alt={getUserDisplayName()} />
                  )}
                </div>
                <div className="profile-details-text">
                  <h2>{isLoading ? "Loading..." : getUserDisplayName()}</h2>
                  <p>{isLoading ? "Loading profile..." : getUserBio()}</p>
                  <p className="location">
                    {isLoading ? "" : getUserLocation()}
                  </p>
                  {isAuthenticated && userProfile?.role === "student" && (
                    <Link to="/student/profile">
                      <button className="experience-dotted-btn">
                        + Update Profile
                      </button>
                    </Link>
                  )}
                  {!isAuthenticated && (
                    <Link to="/auth/login">
                      <button className="experience-dotted-btn">Login</button>
                    </Link>
                  )}
                </div>

                <ul>
                  {isAuthenticated ? (
                    <>
                      {userProfile?.role === "student" && (
                        <li>
                          <Link to="/student/profile">
                            <FontAwesomeIcon icon={faUser} /> My Profile
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/college">
                          <FontAwesomeIcon icon={faSchool} /> College
                        </Link>
                      </li>
                      <li>
                        <Link to="/alumni">
                          <FontAwesomeIcon icon={faUserGraduate} /> Alumni
                        </Link>
                      </li>
                      <li>
                        <Link to="/industry">
                          <FontAwesomeIcon icon={faIndustry} /> Industry
                        </Link>
                      </li>
                      <li>
                        <Link to="/startup">
                          <FontAwesomeIcon icon={faRocket} /> Startup
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/auth/login">
                          <FontAwesomeIcon icon={faUser} /> Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/auth/register">
                          <FontAwesomeIcon icon={faUserGraduate} /> Register
                        </Link>
                      </li>
                      <li>
                        <Link to="/college">
                          <FontAwesomeIcon icon={faSchool} /> Browse Colleges
                        </Link>
                      </li>
                      <li>
                        <Link to="/industry">
                          <FontAwesomeIcon icon={faIndustry} /> Browse
                          Industries
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </aside>
          </nav>
        )}

        {/* Main Feed */}
        <main className="feed">
          <PostCreator onPostCreated={handlePostCreated} />

          {posts.map((post) => (
            <div className="post-card" key={post.post_id}>
              <div className="post-header">
                {" "}
                <div className="poster-info">
                  <div className="profile-pic-small">
                    {post.user && post.user.full_name
                      ? post.user.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <h4>{post.user ? post.user.full_name : "Unknown User"}</h4>
                    <p className="post-meta">
                      {post.userType} •{" "}
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="more-options">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>

              <div className="post-content">
                <p>{post.content}</p>
                {post.details && <p className="post-details">{post.details}</p>}
                {post.image && (
                  <img src={post.image} alt="Post" className="post-img" />
                )}
                {post.event && (
                  <div className="event-card">
                    <h4>{post.event.title}</h4>
                    <p>{post.event.description}</p>
                  </div>
                )}
                {post.isComment && (
                  <div
                    style={{
                      backgroundColor: "#f9fafb",
                      padding: "8px",
                      borderRadius: "4px",
                      marginTop: "8px",
                    }}
                  >
                    <p style={{ margin: 0 }}>{post.details}</p>
                  </div>
                )}
                <div className="post-actions">
                  <button className="post-action">
                    <FontAwesomeIcon icon={faThumbsUp} /> Like
                  </button>
                  <button className="post-action">
                    <FontAwesomeIcon icon={faComment} /> Comment
                  </button>
                  <button className="post-action">
                    <FontAwesomeIcon icon={faRetweet} /> Repost
                  </button>
                  <button className="post-action">
                    <FontAwesomeIcon icon={faPaperPlane} /> Send
                  </button>
                </div>
              </div>
              <div className="mobile-post-actions">
                <button className="post-action">
                  <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
                <button className="post-action">
                  <FontAwesomeIcon icon={faComment} /> Comment
                </button>
                <button className="post-action">
                  <FontAwesomeIcon icon={faRetweet} /> Repost
                </button>
                <button className="post-action">
                  <FontAwesomeIcon icon={faPaperPlane} /> Send
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar (Desktop) */}
        <aside className="right-sidebar">
          <div className="news-card">
            <h3>News</h3>
            <ul className="news-list">
              {newsItems.map((item, i) => (
                <li key={i}>
                  <p>{item.title}</p>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="puzzles-card">
            <h3>Puzzles</h3>
            <ul className="puzzles-list">
              {puzzles.map((puzzle, i) => (
                <li key={i}>
                  <span className="puzzle-name">{puzzle.name}</span>
                  <span className="puzzle-played">{puzzle.played}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <div className="mobile-nav-items">
          <Link
            to="/"
            className={`mobile-nav-item ${
              activeTab === "home" ? "active" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            <FontAwesomeIcon icon={faHome} className="mobile-nav-icon" />
            <span>Home</span>
          </Link>
          <Link
            to="/network"
            className={`mobile-nav-item ${
              activeTab === "network" ? "active" : ""
            }`}
            onClick={() => setActiveTab("network")}
          >
            <FontAwesomeIcon icon={faUserFriends} className="mobile-nav-icon" />
            <span>Network</span>
          </Link>
          <Link
            to="/post"
            className={`mobile-nav-item ${
              activeTab === "post" ? "active" : ""
            }`}
            onClick={() => setActiveTab("post")}
          >
            <FontAwesomeIcon icon={faNewspaper} className="mobile-nav-icon" />
            <span>Post</span>
          </Link>
          <Link
            to="/notifications"
            className={`mobile-nav-item ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <FontAwesomeIcon icon={faBell} className="mobile-nav-icon" />
            <span>Notifications</span>
          </Link>
          <Link
            to="/jobs"
            className={`mobile-nav-item ${
              activeTab === "jobs" ? "active" : ""
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <FontAwesomeIcon icon={faBriefcase} className="mobile-nav-icon" />
            <span>Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
