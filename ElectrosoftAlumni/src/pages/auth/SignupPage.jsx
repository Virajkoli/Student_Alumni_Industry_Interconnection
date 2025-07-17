import React from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import GitHubSignInButton from "../../components/GitHubSignInButton";
import { FaGithub } from "react-icons/fa";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    // Main Layout - Two columns on desktop, stacked on mobile
    <div className="flex min-h-screen bg-gray-50">
      {/* Logo Side - Left column */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 min-w-0">
        <img
          src="/newlogo-removebg-preview.png"
          alt="Logo"
          className="max-w-96 w-4/5 h-auto block"
        />
      </div>

      {/* Signup Side - Right column */}
      <div className="flex-1 flex items-center justify-center md:justify-end md:pr-20 bg-gray-50">
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          
          {/* Logo */}
          <div className="md:hidden flex justify-center pt-8 min-h-44">
            <img
              src="/newlogo-removebg-preview.png"
              alt="Logo"
              className="max-w-52 w-3/5 h-auto"
            />
          </div>

          {/* Signup Box */}
          <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-md min-w-80 md:max-w-none">
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Create Account
            </h2>

            <div className="flex flex-col gap-4">
              {/* GitHub Signup Button */}
              <GitHubSignInButton
                isSignUp={true}
                onSuccess={(githubUser) => {
                  navigate("/auth/complete-github-signup", {
                    state: { githubUser },
                  });
                }}
                onError={(error) => {
                  alert("GitHub Sign-In Failed: " + error);
                }}
              />

              {/* Google Signup Button */}
              <GoogleSignInButton
                isSignUp={true}
                onSuccess={(googleUser) => {
                  navigate("/auth/complete-google-signup", {
                    state: { googleUser },
                  });
                }}
                onError={(error) => {
                  alert("Google Sign-In Failed: " + error);
                }}
              />
            </div>
          </div>

          {/* Login Prompt */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <span>Already have an account?</span>
            <Link 
              to="/auth/login" 
              className="text-blue-500 hover:text-blue-700 font-medium ml-1 transition-colors"
            >
              Go back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
