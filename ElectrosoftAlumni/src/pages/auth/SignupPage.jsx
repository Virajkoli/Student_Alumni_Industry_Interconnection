import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../utils/apiService";
import "./LoginPage.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    fullName: "",
    collegeName: "",
    course: "",
    year: "",
    location: "",
    deanName: "",
    companyName: "",
    sector: "",
    contactPerson: "",
    startupName: "",
    domain: "",
    founderName: "",
  });

  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSocialLogin(false); // reset if manually typing
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.role) {
      setError("Please select a role");
      setIsLoading(false);
      return;
    }

    if (!formData.email || !formData.password || !formData.fullName) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare user data for registration
      const userData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      };

      // Add role-specific fields
      if (formData.role === "student" || formData.role === "alumni") {
        if (formData.collegeName) userData.collegeName = formData.collegeName;
        if (formData.course) userData.course = formData.course;
        if (formData.year) userData.year = parseInt(formData.year);
      }

      if (formData.role === "college") {
        if (formData.deanName) userData.deanName = formData.deanName;
      }

      if (formData.role === "industry") {
        if (formData.companyName) userData.companyName = formData.companyName;
        if (formData.sector) userData.sector = formData.sector;
        if (formData.contactPerson)
          userData.contactPerson = formData.contactPerson;
      }

      if (formData.role === "startup") {
        if (formData.startupName) userData.startupName = formData.startupName;
        if (formData.domain) userData.domain = formData.domain;
        if (formData.founderName) userData.founderName = formData.founderName;
      }

      if (formData.location) userData.location = formData.location;

      // Register user
      const result = await register(userData);

      if (result.success) {
        // Redirect based on role
        const rolePage = apiService.getRoleHomePage(result.user.role);
        navigate(rolePage, {
          replace: true,
          state: {
            welcomeMessage: `Welcome to SCAIPS, ${result.user.fullName}!`,
            newUser: true,
          },
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    if (!formData.role) {
      setError("Please select a role before using social login");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement actual social login with backend
      // For now, show a message that it's not implemented
      setError(
        `${provider} login integration coming soon. Please use email registration.`
      );
    } catch (err) {
      setError("Social login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>

        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "1rem",
              padding: "0.5rem",
              backgroundColor: "#fee",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email and Password */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Role Selection */}
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="college">College</option>
            <option value="industry">Industry</option>
            <option value="startup">Startup</option>
          </select>

          {/* ✅ Only show extra fields for manual register */}
          {formData.role && !isSocialLogin && (
            <>
              {formData.role === "student" && (
                <>
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <input
                    name="collegeName"
                    placeholder="College Name"
                    onChange={handleChange}
                  />
                  <input
                    name="course"
                    placeholder="Course"
                    onChange={handleChange}
                  />
                  <input
                    name="year"
                    placeholder="Year"
                    onChange={handleChange}
                  />
                </>
              )}

              {formData.role === "college" && (
                <>
                  <input
                    name="collegeName"
                    placeholder="College Name"
                    onChange={handleChange}
                  />
                  <input
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                  />
                  <input
                    name="deanName"
                    placeholder="Dean Name"
                    onChange={handleChange}
                  />
                </>
              )}

              {formData.role === "industry" && (
                <>
                  <input
                    name="companyName"
                    placeholder="Company Name"
                    onChange={handleChange}
                  />
                  <input
                    name="sector"
                    placeholder="Sector"
                    onChange={handleChange}
                  />
                  <input
                    name="contactPerson"
                    placeholder="Contact Person"
                    onChange={handleChange}
                  />
                </>
              )}

              {formData.role === "startup" && (
                <>
                  <input
                    name="startupName"
                    placeholder="Startup Name"
                    onChange={handleChange}
                  />
                  <input
                    name="domain"
                    placeholder="Domain"
                    onChange={handleChange}
                  />
                  <input
                    name="founderName"
                    placeholder="Founder's Name"
                    onChange={handleChange}
                  />
                </>
              )}
            </>
          )}

          {/* Register button */}
          <button type="submit" className="signin-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Login */}
        <button
          className="social-button google"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        {/* Microsoft Login */}
        <button
          className="social-button google"
          onClick={() => handleSocialLogin("microsoft")}
          disabled={isLoading}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            style={{ width: "20px", height: "20px" }}
          />
          Continue with Microsoft
        </button>
      </div>
    </div>
  );
}
