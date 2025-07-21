import React, { useState, useEffect } from "react";
import { Edit, X } from "lucide-react";
import apiService from "../../../services/apiService";

const AboutSection = ({ profileData, onProfileUpdate, isOwner = false }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [aboutText, setAboutText] = useState(
    profileData?.about ||
      "Add a summary to highlight your personality and work style."
  );

  // Only sync aboutText with profileData changes - don't fetch independently
  useEffect(() => {
    setAboutText(
      profileData?.about ||
        "Add a summary to highlight your personality and work style."
    );
  }, [profileData]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await apiService.updateStudentAbout({ summary: aboutText });
      if (response.success) {
        setAboutText(aboutText); // Update local state
        onProfileUpdate({ ...profileData, about: aboutText }); // Update parent state
        setIsEditModalOpen(false);
      } else {
        console.error("Failed to update about data:", response.message);
      }
    } catch (error) {
      console.error("Failed to update about data:", error);
    }
  };

  const handleCancel = () => {
    setAboutText(
      aboutText || "Add a summary to highlight your personality and work style."
    );
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6 shadow-sm border border-gray-200">
        <div
          className="flex items-center justify-between p-6"
          style={{
            backgroundColor: "#DCE8F2",
            borderBottom: "1px solid #B5D3E7",
          }}
        >
          <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
            About
          </h2>
          {isOwner && (
            <button
              onClick={handleEditClick}
              className="p-2 rounded-full transition-colors"
              style={{ color: "#1F2D3D", opacity: 0.7 }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#B5D3E7";
                e.target.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.opacity = "0.7";
              }}
              title="Edit about section"
            >
              <Edit className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">
            {aboutText ||
              "Add a summary to highlight your personality and work style."}
          </p>
        </div>
      </div>

      {/* Edit About Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-2xl"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6" style={{ borderBottom: "1px solid #DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit About
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#DCE8F2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Summary
                </label>
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 outline-none resize-none transition-colors"
                  style={{
                    backgroundColor: "#F7FAFC",
                    border: "1px solid #DCE8F2",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#DCE8F2")}
                  placeholder="Write a brief description about yourself, your goals, and what you're passionate about..."
                />
                <p
                  className="text-xs mt-1"
                  style={{ color: "#1F2D3D", opacity: 0.6 }}
                >
                  {aboutText.length}/2000 characters
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 flex justify-end gap-3 rounded-b-xl"
              style={{
                backgroundColor: "#DCE8F2",
                borderTop: "1px solid #B5D3E7",
              }}
            >
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                  border: "1px solid #DCE8F2",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#DCE8F2")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#F7FAFC")
                }
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5A8FAD")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6EA9CB")
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;
