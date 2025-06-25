import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Welcome to Electrosoft Alumni Portal
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Link
          to="/college-profile"
          className="px-8 py-4 rounded-xl bg-blue-600 text-white text-xl font-semibold shadow hover:bg-blue-700 transition-colors text-center"
        >
          College
        </Link>
        <Link
          to="/industry-profile"
          className="px-8 py-4 rounded-xl bg-green-600 text-white text-xl font-semibold shadow hover:bg-green-700 transition-colors text-center"
        >
          Industry
        </Link>
        <Link
          to="/startup-profile"
          className="px-8 py-4 rounded-xl bg-purple-600 text-white text-xl font-semibold shadow hover:bg-purple-700 transition-colors text-center"
        >
          Startup
        </Link>
      </div>
    </div>
  );
};

export default Home;
