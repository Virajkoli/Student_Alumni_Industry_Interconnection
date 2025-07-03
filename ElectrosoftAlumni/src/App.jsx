import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/layout";
import { ProtectedRoute, PublicRoute, AuthLayout } from "./components/auth";
import Home from "./pages/Home";

// Profile Pages
import StartupProfilePage from "./pages/startup/StartupProfilePage";
import IndustryProfilePage from "./pages/industry/IndustryProfilePage";
import CollegeProfilePage from "./pages/college/CollegeProfilePage";
import StudentProfilePage from "./pages/student/StudentProfilePage";

// Dashboard Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import CollegeDashboard from "./pages/college/CollegeDashboard";
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import StartupDashboard from "./pages/startup/StartupDashboard";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - Only accessible when NOT logged in */}
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <PublicRoute>
                <AuthLayout>
                  <SignupPage />
                </AuthLayout>
              </PublicRoute>
            }
          />

          {/* Protected Routes - Only accessible when logged in */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Role-specific Dashboard Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <AlumniDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/college/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <CollegeDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/industry/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <IndustryDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/startup/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <StartupDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Role-specific Profile Routes */}
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/startup/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StartupProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/industry/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <IndustryProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/college/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <CollegeProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Legacy Routes for backward compatibility */}
          <Route
            path="/startup-profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StartupProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/industry-profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <IndustryProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <CollegeProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
