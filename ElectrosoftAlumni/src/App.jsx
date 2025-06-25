import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartupProfilePage from "./pages/startup/StartupProfilePage";
import IndustryProfilePage from "./pages/industry/IndustryProfilePage";

// Placeholder for College page
const CollegePage = () => (
  <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-gray-700">
    College Page Coming Soon
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/startup-profile" element={<StartupProfilePage />} />
        <Route path="/industry-profile" element={<IndustryProfilePage />} />
        <Route path="/college-profile" element={<CollegePage />} />
      </Routes>
    </Router>
  );
}
{
  /*  <div className="App">
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
      <Router>
        <Routes>
          <Route path="/startup-profile" element={<StartupProfilePage />} />
          <Route path="/industry-profile" element={<IndustryProfilePage />} />
          <Route path="/college-profile" element={<CollegeProfilePage />} />
        </Routes>
      </Router>
    </div> */
}
export default App;
