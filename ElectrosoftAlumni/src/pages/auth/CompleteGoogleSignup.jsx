import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../utils/apiService";

export default function CompleteGoogleSignup() {
  const [formData, setFormData] = useState({
    role: "",
    // Student fields
    contact_no: "",
    
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
  const { registerWithGoogle, registerCollegeWithGoogle } = useAuth();

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
      let result;
      if (formData.role === "college") {
        // Use college-specific registration
        result = await registerCollegeWithGoogle(registrationData);
      } else {
        // Use general registration for other roles
        result = await registerWithGoogle(registrationData);
      }

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
  <div className="min-h-screen bg-[#F7FAFC] py-8 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#6EA9C8] to-[#5A94B5] px-8 py-6">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/newlogo-removebg-preview.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Complete Your Registration
            </h2>
            <p className="text-blue-100 text-center">
              Hello {googleUser.firstName}! Please complete your profile to get started
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Role Selection */}
              <div className="bg-gray-50 rounded-lg p-6">
                <label htmlFor="role" className="block text-sm font-semibold text-[#1F2D3D] mb-3">
                  Select Your Role *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                >
                  <option value="">Select your role</option>
                  <option value="student"> Student</option>
                  <option value="college"> College</option>
                  <option value="industry"> Industry</option>
                  <option value="startup"> Startup</option>
                </select>
              </div>

              {/* Student-specific fields */}
            {formData.role === "student" && (
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2D3D] mb-4 flex items-center">
                  🎓 Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact_no" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contact_no"
                      name="contact_no"
                      placeholder="Enter your contact number"
                      value={formData.contact_no}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="interested_field" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                    Field of Interest
                  </label>
                  <select
                    id="interested_field"
                    name="interested_field"
                    value={formData.interested_field}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                  >
                    <option value="">Select your field of interest</option>
                    <option value="Technology">Technology</option>
                    <option value="Business"> Business</option>
                    <option value="Healthcare"> Healthcare</option>
                    <option value="Education"> Education</option>
                    <option value="Engineering"> Engineering</option>
                    <option value="Other"> Other</option>
                  </select>
                </div>
                {formData.interested_field === "Other" && (
                  <div>
                    <label htmlFor="other_field" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      Specify Other Field *
                    </label>
                    <input
                      type="text"
                      id="other_field"
                      name="other_field"
                      placeholder="Please specify your field of interest"
                      value={formData.other_field}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* College-specific fields */}
            {formData.role === "college" && (
              <div className="bg-green-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2D3D] mb-4 flex items-center">
                  🏫 College Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="college_name" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      College Name *
                    </label>
                    <input
                      type="text"
                      id="college_name"
                      name="college_name"
                      placeholder="Enter college name"
                      value={formData.college_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    />
                  </div>
                  <div>
                    <label htmlFor="establishment_year" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      Establishment Year
                    </label>
                    <input
                      type="number"
                      id="establishment_year"
                      name="establishment_year"
                      placeholder="e.g., 1985"
                      value={formData.establishment_year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="college_address" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                    College Address
                  </label>
                  <textarea
                    id="college_address"
                    name="college_address"
                    placeholder="Enter complete college address"
                    value={formData.college_address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D] resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                    College Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://www.college.edu"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                  />
                </div>
              </div>
            )}

            {/* Industry-specific fields */}
            {formData.role === "industry" && (
              <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2D3D] mb-4 flex items-center">
                  🏢 Industry Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company_name" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      placeholder="Enter company name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    />
                  </div>
                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      Your Designation
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      placeholder="e.g., Software Engineer"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="industry_type" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                    Industry Type
                  </label>
                  <select
                    id="industry_type"
                    name="industry_type"
                    value={formData.industry_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                  >
                    <option value="">Select Industry Type</option>
                    <option value="Technology">💻 Technology</option>
                    <option value="Healthcare">🏥 Healthcare</option>
                    <option value="Finance">💰 Finance</option>
                    <option value="Manufacturing">🏭 Manufacturing</option>
                    <option value="Education">📚 Education</option>
                    <option value="Other">🎯 Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Startup-specific fields */}
            {formData.role === "startup" && (
              <div className="bg-orange-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2D3D] mb-4 flex items-center">
                  🚀 Startup Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startup_name" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      Startup Name
                    </label>
                    <input
                      type="text"
                      id="startup_name"
                      name="startup_name"
                      placeholder="Enter startup name"
                      value={formData.startup_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    />
                  </div>
                  <div>
                    <label htmlFor="startup_stage" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                      Startup Stage
                    </label>
                    <select
                      id="startup_stage"
                      name="startup_stage"
                      value={formData.startup_stage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                    >
                      <option value="">Select Stage</option>
                      <option value="Idea">💡 Idea</option>
                      <option value="MVP">🛠️ MVP</option>
                      <option value="Growth">📈 Growth</option>
                      <option value="Scale">🎯 Scale</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="funding_status" className="block text-sm font-medium text-[#1F2D3D] mb-2">
                    Funding Status
                  </label>
                  <select
                    id="funding_status"
                    name="funding_status"
                    value={formData.funding_status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6EA9C8] focus:border-[#6EA9C8] transition-colors bg-white text-[#1F2D3D]"
                  >
                    <option value="">Select Funding Status</option>
                    <option value="Bootstrapped">💪 Bootstrapped</option>
                    <option value="Seed">🌱 Seed</option>
                    <option value="Series A">🔥 Series A</option>
                    <option value="Series B+">💎 Series B+</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className={`w-full bg-[#6EA9C8] hover:bg-[#5A94B5] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#6EA9C8] focus:ring-opacity-50 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Completing Registration...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Complete Registration
                  </span>
                )}
              </button>
            </div>
          </form>
           </div>
      </div>
    </div>
  </div>
  );
}
