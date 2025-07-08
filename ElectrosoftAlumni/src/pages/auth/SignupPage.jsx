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
    college_name: "",
    college_address: "",
    establishment_year: "",
    website: "",
    campus_area: "",
    nirf_rank: "",
    accreditation: "",
    total_students: "",
    total_faculty: "",
    description: "",
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

    if (!formData.email || !formData.password) {
      setError("Please fill in email and password");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Role-specific validation
    if (formData.role === "student") {
      if (!formData.first_name || !formData.last_name) {
        setError("Please fill in first name and last name");
        return;
      }
      if (
        formData.interested_field === "Other" &&
        !formData.other_field.trim()
      ) {
        setError("Please specify the other field of interest");
        return;
      }
    } else if (formData.role === "college") {
      if (!formData.college_name.trim()) {
        setError("College name is required");
        return;
      }
    } else if (formData.role === "industry" || formData.role === "startup") {
      if (!formData.first_name || !formData.last_name) {
        setError("Please fill in first name and last name");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError("");

      // Prepare data based on role - only send relevant fields
      let registrationData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      // Add role-specific fields
      if (formData.role === "student") {
        registrationData = {
          ...registrationData,
          first_name: formData.first_name,
          last_name: formData.last_name,
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
          establishment_year: formData.establishment_year,
          website: formData.website,
          campus_area: formData.campus_area,
          nirf_rank: formData.nirf_rank,
          accreditation: formData.accreditation,
          total_students: formData.total_students,
          total_faculty: formData.total_faculty,
          description: formData.description,
        };
      } else if (formData.role === "industry") {
        registrationData = {
          ...registrationData,
          first_name: formData.first_name,
          last_name: formData.last_name,
          company_name: formData.company_name,
          industry_type: formData.industry_type,
          company_size: formData.company_size,
          designation: formData.designation,
        };
      } else if (formData.role === "startup") {
        registrationData = {
          ...registrationData,
          first_name: formData.first_name,
          last_name: formData.last_name,
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
            welcomeMessage: `Welcome${response.user.first_name ? `, ${response.user.first_name}` : ""}! Registration successful.`,
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

  const pillOptions = {
    interested_field: [
      { value: "Computer", label: "Computer" },
      { value: "Electronics", label: "Electronics" },
      { value: "Electrical", label: "Electrical" },
      { value: "AI", label: "AI" },
      { value: "Cybersecurity", label: "Cybersecurity" },
      { value: "Data Science", label: "Data Science" },
      { value: "Other", label: "Other" },
    ],
    industry_type: [
      { value: "Technology", label: "Technology" },
      { value: "Manufacturing", label: "Manufacturing" },
      { value: "Healthcare", label: "Healthcare" },
      { value: "Finance", label: "Finance" },
      { value: "Education", label: "Education" },
      { value: "Other", label: "Other" },
    ],
    company_size: [
      { value: "1-10", label: "1-10 employees" },
      { value: "11-50", label: "11-50 employees" },
      { value: "51-200", label: "51-200 employees" },
      { value: "201-1000", label: "201-1000 employees" },
      { value: "1000+", label: "1000+ employees" },
    ],
    startup_stage: [
      { value: "Idea", label: "Idea Stage" },
      { value: "MVP", label: "MVP Stage" },
      { value: "Early", label: "Early Stage" },
      { value: "Growth", label: "Growth Stage" },
      { value: "Scale", label: "Scale Stage" },
    ],
    funding_status: [
      { value: "Bootstrapped", label: "Bootstrapped" },
      { value: "Pre-Seed", label: "Pre-Seed" },
      { value: "Seed", label: "Seed" },
      { value: "Series A", label: "Series A" },
      { value: "Series B+", label: "Series B+" },
    ],
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
              className="input-field"
            />
            <input
              type="text"
              name="college_name"
              placeholder="College Name"
              value={formData.college_name}
              onChange={handleChange}
              className="input-field"
            />
            <div className="form-group">
              <label>Select Interested Field</label>
              <div className="pill-group">
                {pillOptions.interested_field.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`pill-btn${
                      formData.interested_field === opt.value ? " selected" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "interested_field", value: opt.value },
                      })
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {formData.interested_field === "Other" && (
              <input
                type="text"
                name="other_field"
                placeholder="Specify Other Field"
                value={formData.other_field}
                onChange={handleChange}
                className="input-field"
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
              placeholder="College Name *"
              value={formData.college_name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="text"
              name="college_address"
              placeholder="College Address/Location"
              value={formData.college_address}
              onChange={handleChange}
              className="input-field"
            />
            <div className="register-grid">
              <input
                type="number"
                name="establishment_year"
                placeholder="Establishment Year"
                value={formData.establishment_year}
                onChange={handleChange}
                className="input-field"
                min="1800"
                max={new Date().getFullYear()}
              />
              <input
                type="url"
                name="website"
                placeholder="College Website"
                value={formData.website}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="register-grid">
              <input
                type="number"
                name="campus_area"
                placeholder="Campus Area (in acres)"
                value={formData.campus_area}
                onChange={handleChange}
                className="input-field"
                step="0.01"
                min="0"
              />
              <input
                type="number"
                name="nirf_rank"
                placeholder="NIRF Ranking"
                value={formData.nirf_rank}
                onChange={handleChange}
                className="input-field"
                min="1"
              />
            </div>
            <input
              type="text"
              name="accreditation"
              placeholder="Accreditation (e.g., NAAC A+)"
              value={formData.accreditation}
              onChange={handleChange}
              className="input-field"
            />
            <div className="register-grid">
              <input
                type="number"
                name="total_students"
                placeholder="Total Students"
                value={formData.total_students}
                onChange={handleChange}
                className="input-field"
                min="0"
              />
              <input
                type="number"
                name="total_faculty"
                placeholder="Total Faculty"
                value={formData.total_faculty}
                onChange={handleChange}
                className="input-field"
                min="0"
              />
            </div>
            <textarea
              name="description"
              placeholder="College Description (optional)"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              rows="3"
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
              className="input-field"
            />
            <div className="form-group">
              <label>Industry Type</label>
              <div className="pill-group">
                {pillOptions.industry_type.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`pill-btn${
                      formData.industry_type === opt.value ? " selected" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "industry_type", value: opt.value },
                      })
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {formData.interested_field === "Other" && (
              <input
                type="text"
                name="other_field"
                placeholder="Specify Other Field"
                value={formData.other_field}
                onChange={handleChange}
                className="input-field"
              />
            )}
            <div className="form-group">
              <label>Company Size</label>
              <div className="pill-group">
                {pillOptions.company_size.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`pill-btn${
                      formData.company_size === opt.value ? " selected" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "company_size", value: opt.value },
                      })
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              name="designation"
              placeholder="Your Designation"
              value={formData.designation}
              onChange={handleChange}
              className="input-field"
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
              className="input-field"
            />
            <div className="form-group">
              <label>Startup Stage</label>
              <div className="pill-group">
                {pillOptions.startup_stage.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`pill-btn${
                      formData.startup_stage === opt.value ? " selected" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "startup_stage", value: opt.value },
                      })
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Funding Status</label>
              <div className="pill-group">
                {pillOptions.funding_status.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`pill-btn${
                      formData.funding_status === opt.value ? " selected" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "funding_status", value: opt.value },
                      })
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="number"
              name="team_size"
              placeholder="Team Size"
              value={formData.team_size}
              onChange={handleChange}
              className="input-field"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="login-main-layout">
      <div className="login-logo-side">
        <img
          src="/newlogo-removebg-preview.png"
          alt="Logo"
          className="big-logo-img"
        />
      </div>
      <div className="register-container">
        <div className="register-card">
          <form
            className="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="register-grid">
              {formData.role !== "college" && (
                <>
                  <div className="form-group">
                    <label htmlFor="first_name">First name</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">
                      Last name{" "}
                      <span className="optional">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            {/* Role Selection */}
            <div className="form-group">
              <label htmlFor="role">Register as</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Your Role</option>
                <option value="student">Student</option>
                <option value="college">College</option>
                <option value="industry">Industry</option>
                <option value="startup">Startup</option>
              </select>
            </div>

            {/* Role-specific Fields */}
            {formData.role && (
              <div className="role-fields">{renderRoleSpecificFields()}</div>
            )}

            {error && (
              <div className="error-alert" style={{ margin: "10px 0" }}>
                {error}
              </div>
            )}

            <button
              className="register-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Next"}
            </button>

            <p className="join-text">
              Already have an account?{" "}
              <Link to="/auth/login">Go back to Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
