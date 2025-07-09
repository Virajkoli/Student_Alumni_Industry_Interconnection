import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../utils/apiService";
import "./LoginPage.css";

export default function CompleteGoogleSignup() {
  const [formData, setFormData] = useState({
    role: "",
    // Student fields
    contact_no: "",
    student_college_name: "",
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
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { registerWithGoogle } = useAuth();

  useEffect(() => {
    // Get Google user data from navigation state
    if (location.state?.googleUser) {
      setGoogleUser(location.state.googleUser);
    } else {
      // Redirect to signup if no Google user data
      navigate("/auth/signup");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.role) {
      setError("Please select a role");
      return;
    }

    // Role-specific validation
    if (formData.role === "student") {
      if (!formData.student_college_name.trim()) {
        setError("Student college name is required");
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
    }

    try {
      setIsLoading(true);
      setError("");

      // Prepare data based on role
      let registrationData = {
        email: googleUser.email,
        first_name: googleUser.firstName,
        last_name: googleUser.lastName,
        googleId: googleUser.id,
        imageUrl: googleUser.imageUrl,
        role: formData.role,
      };

      // Add role-specific fields
      if (formData.role === "student") {
        registrationData = {
          ...registrationData,
          contact_no: formData.contact_no,
          student_college_name: formData.student_college_name,
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

      // Register with Google data
      const result = await registerWithGoogle(registrationData);

      if (result.success) {
        const rolePage = apiService.getRoleHomePage(result.user.role);
        navigate(rolePage);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!googleUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Complete Your Registration</h2>
          <p>Hello {googleUser.firstName}! Please complete your profile</p>
        </div>

        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="role">Select Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="college">College</option>
                <option value="industry">Industry</option>
                <option value="startup">Startup</option>
              </select>
            </div>

            {/* Student-specific fields */}
            {formData.role === "student" && (
              <div className="role-fields">
                <div className="form-group">
                  <label htmlFor="contact_no">Contact Number</label>
                  <input
                    type="tel"
                    id="contact_no"
                    name="contact_no"
                    placeholder="Contact Number"
                    value={formData.contact_no}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="student_college_name">College Name</label>
                  <input
                    type="text"
                    id="student_college_name"
                    name="student_college_name"
                    placeholder="College Name"
                    value={formData.student_college_name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="interested_field">Interested Field</label>
                  <select
                    id="interested_field"
                    name="interested_field"
                    value={formData.interested_field}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Field</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {formData.interested_field === "Other" && (
                  <div className="form-group">
                    <label htmlFor="other_field">Specify Other Field</label>
                    <input
                      type="text"
                      id="other_field"
                      name="other_field"
                      placeholder="Specify other field"
                      value={formData.other_field}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                )}
              </div>
            )}

            {/* College-specific fields */}
            {formData.role === "college" && (
              <div className="role-fields">
                <div className="form-group">
                  <label htmlFor="college_name">College Name</label>
                  <input
                    type="text"
                    id="college_name"
                    name="college_name"
                    placeholder="College Name"
                    value={formData.college_name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="college_address">College Address</label>
                  <textarea
                    id="college_address"
                    name="college_address"
                    placeholder="College Address"
                    value={formData.college_address}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="establishment_year">Establishment Year</label>
                  <input
                    type="number"
                    id="establishment_year"
                    name="establishment_year"
                    placeholder="Establishment Year"
                    value={formData.establishment_year}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="Website URL"
                    value={formData.website}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            )}

            {/* Industry-specific fields */}
            {formData.role === "industry" && (
              <div className="role-fields">
                <div className="form-group">
                  <label htmlFor="company_name">Company Name</label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    placeholder="Company Name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="industry_type">Industry Type</label>
                  <select
                    id="industry_type"
                    name="industry_type"
                    value={formData.industry_type}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Industry Type</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    placeholder="Your Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            )}

            {/* Startup-specific fields */}
            {formData.role === "startup" && (
              <div className="role-fields">
                <div className="form-group">
                  <label htmlFor="startup_name">Startup Name</label>
                  <input
                    type="text"
                    id="startup_name"
                    name="startup_name"
                    placeholder="Startup Name"
                    value={formData.startup_name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startup_stage">Startup Stage</label>
                  <select
                    id="startup_stage"
                    name="startup_stage"
                    value={formData.startup_stage}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Stage</option>
                    <option value="Idea">Idea</option>
                    <option value="MVP">MVP</option>
                    <option value="Growth">Growth</option>
                    <option value="Scale">Scale</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="funding_status">Funding Status</label>
                  <select
                    id="funding_status"
                    name="funding_status"
                    value={formData.funding_status}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Funding Status</option>
                    <option value="Bootstrapped">Bootstrapped</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B+">Series B+</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`login-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Completing Registration..." : "Complete Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
