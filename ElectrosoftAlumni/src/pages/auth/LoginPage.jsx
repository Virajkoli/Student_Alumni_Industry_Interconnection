import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../utils/apiService";
import "./LoginPage.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        const rolePage = apiService.getRoleHomePage(result.user.role);
        navigate(rolePage, {
          replace: true,
          state: { newUser: false },
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-main-layout">
      <div className="login-logo-side">
        <img src="/newlogo-removebg-preview.png" alt="Logo" className="big-logo-img" />
      </div>
      <div className="login-container right-align">
        <div className="login-content">
          {/* Login Box */}
          <div className="login-box">
            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="password-toggle"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-options" style={{ justifyContent: 'flex-end' }}>
                <a href="#forgot-password" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`login-button ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>

              <div className="separator">
                <span>OR</span>
              </div>

              <button type="button" className="google-login">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="google-icon"
                />
                <span>Login with Google</span>
              </button>
            </form>
          </div>

          <div className="register-prompt">
            <span>New to platform?</span>
            <Link to="/auth/signup" className="register-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
