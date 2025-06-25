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
        <Route path="/startup" element={<StartupProfilePage />} />
        <Route path="/industry" element={<IndustryProfilePage />} />
        <Route path="/college" element={<CollegePage />} />
      </Routes>
    </Router>
  );
}

export default App;
