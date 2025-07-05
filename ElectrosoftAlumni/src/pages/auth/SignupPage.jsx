import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginPage.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    role: "",
    // Common fields
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // Student fields
    contact_no: "",
    college_name: "",
    interested_field: "",
    other_field: "",
    // College fields
    college_address: "",
    dean_name: "",
    establishment_year: "",
    // Industry fields
    company_name: "",
    industry_type: "",
    company_size: "",
    designation: "",
    // Startup fields
    startup_name: "",
    startup_stage: "",
    funding_status: "",
    team_size: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.role) {
      setError("Please select a role");
      return;
    }

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Please fill in all required fields (First Name, Last Name, Email, Password)"
      );
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Role-specific validation
    if (formData.role === "student") {
      if (
        formData.interested_field === "Other" &&
        !formData.other_field.trim()
      ) {
        setError("Please specify the other field of interest");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError("");

      // Prepare data based on role - only send relevant fields
      let registrationData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      // Add role-specific fields
      if (formData.role === "student") {
        registrationData = {
          ...registrationData,
          contact_no: formData.contact_no,
          college_name: formData.college_name,
          interested_field: formData.interested_field,
          other_field:
            formData.interested_field === "Other"
              ? formData.other_field
              : undefined,
        };
      } else if (formData.role === "college") {
        registrationData = {
          ...registrationData,
          college_name: formData.college_name,
          college_address: formData.college_address,
          dean_name: formData.dean_name,
          establishment_year: formData.establishment_year,
        };
      } else if (formData.role === "industry") {
        registrationData = {
          ...registrationData,
          company_name: formData.company_name,
          industry_type: formData.industry_type,
          company_size: formData.company_size,
          designation: formData.designation,
        };
      } else if (formData.role === "startup") {
        registrationData = {
          ...registrationData,
          startup_name: formData.startup_name,
          startup_stage: formData.startup_stage,
          funding_status: formData.funding_status,
          team_size: formData.team_size,
        };
      }

      // Call the AuthContext register function
      const response = await register(registrationData);

      if (response.success) {
        // Navigate based on role
        const roleRoutes = {
          student: "/student/profile",
          college: "/college/profile",
          industry: "/industry/profile",
          startup: "/startup/profile",
        };

        navigate(roleRoutes[formData.role] || "/", {
          replace: true,
          state: {
            welcomeMessage: `Welcome, ${response.user.first_name}! Registration successful.`,
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

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "student":
        return (
          <>
            <input
              type="text"
              name="contact_no"
              placeholder="Contact Number"
              value={formData.contact_no}
              onChange={handleChange}
            />
            <input
              type="text"
              name="college_name"
              placeholder="College Name"
              value={formData.college_name}
              onChange={handleChange}
            />
            <select
              name="interested_field"
              value={formData.interested_field}
              onChange={handleChange}
            >
              <option value="">Select Interested Field</option>
              <option value="Computer">Computer</option>
              <option value="Electronics">Electronics</option>
              <option value="Electrical">Electrical</option>
              <option value="Other">Other</option>
            </select>
            {formData.interested_field === "Other" && (
              <input
                type="text"
                name="other_field"
                placeholder="Specify Other Field"
                value={formData.other_field}
                onChange={handleChange}
              />
            )}
          </>
        );

      case "college":
        return (
          <>
            <input
              type="text"
              name="college_name"
              placeholder="College Name"
              value={formData.college_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="college_address"
              placeholder="College Address"
              value={formData.college_address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="dean_name"
              placeholder="Dean Name"
              value={formData.dean_name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="establishment_year"
              placeholder="Establishment Year"
              value={formData.establishment_year}
              onChange={handleChange}
            />
          </>
        );

      case "industry":
        return (
          <>
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
            />
            <select
              name="industry_type"
              value={formData.industry_type}
              onChange={handleChange}
            >
              <option value="">Select Industry Type</option>
              <option value="Technology">Technology</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="company_size"
              value={formData.company_size}
              onChange={handleChange}
            >
              <option value="">Select Company Size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-1000">201-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
            <input
              type="text"
              name="designation"
              placeholder="Your Designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </>
        );

      case "startup":
        return (
          <>
            <input
              type="text"
              name="startup_name"
              placeholder="Startup Name"
              value={formData.startup_name}
              onChange={handleChange}
            />
            <select
              name="startup_stage"
              value={formData.startup_stage}
              onChange={handleChange}
            >
              <option value="">Select Startup Stage</option>
              <option value="Idea">Idea Stage</option>
              <option value="MVP">MVP Stage</option>
              <option value="Early">Early Stage</option>
              <option value="Growth">Growth Stage</option>
              <option value="Scale">Scale Stage</option>
            </select>
            <select
              name="funding_status"
              value={formData.funding_status}
              onChange={handleChange}
            >
              <option value="">Select Funding Status</option>
              <option value="Bootstrapped">Bootstrapped</option>
              <option value="Pre-Seed">Pre-Seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B+">Series B+</option>
            </select>
            <input
              type="number"
              name="team_size"
              placeholder="Team Size"
              value={formData.team_size}
              onChange={handleChange}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>

        {/* Role Selection */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        >
          <option value="">Select Your Role</option>
          <option value="student">Student</option>
          <option value="college">College</option>
          <option value="industry">Industry</option>
          <option value="startup">Startup</option>
        </select>

        {/* Common Fields */}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
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

        {/* Role-specific Fields */}
        {formData.role && renderRoleSpecificFields()}

        {error && (
          <div style={{ color: "red", margin: "10px 0", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <button
          className="signin-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="join-text">
          Already have an account?{" "}
          <Link to="/auth/login">Go back to Login</Link>
        </p>
      </div>
    </div>
  );
}
