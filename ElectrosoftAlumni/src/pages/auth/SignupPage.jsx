import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSocialLogin(false); // reset if manually typing
  };

  const handleSubmit = () => {
    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    setIsSocialLogin(false); // manual mode
    localStorage.setItem("userData", JSON.stringify(formData));

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

        {/* Register button */}
        <button className="signin-btn" onClick={handleSubmit}>
          Register
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
