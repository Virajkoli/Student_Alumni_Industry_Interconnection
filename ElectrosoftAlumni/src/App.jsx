import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartupProfilePage from "./pages/startup/StartupProfilePage";
import IndustryProfilePage from "./pages/industry/IndustryProfilePage";
import CollegeProfilePage from "./pages/college/CollegeProfilePage";
import StudentProfilePage from "./pages/student/StudentProfilePage"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/startup-profile" element={<StartupProfilePage />} />
        <Route path="/industry-profile" element={<IndustryProfilePage />} />
        <Route path="/college-profile" element={<CollegeProfilePage />} />
        <Route path="/student-profile" element={<StudentProfilePage />} />
      </Routes>
    </Router>
  );
}
export default App;
