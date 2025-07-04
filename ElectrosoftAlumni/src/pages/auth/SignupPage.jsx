import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  };

  const handleSubmit = async () => {
    if (!formData.role) {
      setError("Please select a role");
      return;
    }

    if (!formData.email || !formData.password || !formData.fullName) {
      setError(
        "Please fill in all required fields (email, password, full name)"
      );
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setIsSocialLogin(false); // manual mode

      // Call the AuthContext register function
      const response = await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      });

      if (response.success) {
        // Navigate to appropriate dashboard
        const rolePage = apiService.getRoleHomePage(response.user.role);
        navigate(rolePage, {
          replace: true,
          state: {
            welcomeMessage: `Welcome, ${response.user.fullName}! Registration successful.`,
          },
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    if (!formData.role) {
      alert("Please select a role before using social login");
      return;
    }

    const fakeEmail =
      provider === "google" ? "user@google.com" : "user@microsoft.com";

    const socialData = {
      ...formData,
      email: fakeEmail,
      password: "social-login",
    };

    localStorage.setItem("userData", JSON.stringify(socialData));
    setIsSocialLogin(true); // this was a social login

    switch (formData.role) {
      case "student":
        navigate("/student/profile");
        break;
      case "college":
        navigate("/college/profile");
        break;
      case "industry":
        navigate("/industry/profile");
        break;
      case "startup":
        navigate("/startup/profile");
        break;
      default:
        alert("Invalid role");
        break;
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>

        {/* Email and Password */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
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
                <input name="year" placeholder="Year" onChange={handleChange} />
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

        {/* Error message */}
        {error && (
          <div style={{ color: "red", margin: "10px 0", fontSize: "14px" }}>
            {error}
          </div>
        )}

        {/* Register button */}
        <button
          className="signin-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Login */}
        <button
          className="social-button google"
          onClick={() => handleSocialLogin("google")}
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
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            style={{ width: "20px", height: "20px" }}
          />
          Continue with Microsoft
        </button>

        {/* Go back to Login */}
        <p className="join-text">
          Already have an account?{" "}
          <Link to="/auth/login">Go back to Login</Link>
        </p>
      </div>
    </div>
  );
}
