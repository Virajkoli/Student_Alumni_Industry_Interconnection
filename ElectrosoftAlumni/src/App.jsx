import React from "react";
import StartupProfilePage from "./pages/startup/ProfilePage";
import IndustryProfilePage from "./pages/industry/ProfilePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StartupProfilePage />
      <IndustryProfilePage />
    </div>
  );
}

export default App;
