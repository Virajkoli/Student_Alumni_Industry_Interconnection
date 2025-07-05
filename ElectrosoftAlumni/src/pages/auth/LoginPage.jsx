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
      // Login using the API
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        // Get the display name - handle both fullName (other roles) and first_name/last_name (students)
        const displayName = result.user.fullName || 
          `${result.user.first_name || ''} ${result.user.last_name || ''}`.trim() || 
          result.user.email;

        // Redirect based on user role
        const rolePage = apiService.getRoleHomePage(result.user.role);
        navigate(rolePage, {
          replace: true,
          state: {
            welcomeMessage: `Welcome back, ${displayName}!`,
          },
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
    <div className="login-container">
      <div className="login-box">
        <h2>Sign in</h2>

        <button className="social-button google">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

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
          <input
            type="email"
            name="email"
            placeholder="Email or phone"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="button" className="show-btn" onClick={togglePassword}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <a href="#" className="forgot">
            Forgot password?
          </a>

          <label className="keep-logged">
            <input
              type="checkbox"
              name="keepLoggedIn"
              checked={formData.keepLoggedIn}
              onChange={handleInputChange}
            />
            Keep me logged in
          </label>

          <button type="submit" className="signin-btn" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="join-text">
          New to the portal? <Link to="/auth/signup">Join now</Link>
        </p>
      </div>
    </div>
  );
}
