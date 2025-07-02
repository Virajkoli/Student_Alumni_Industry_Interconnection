import React, { useState } from "react";
import { Edit, X } from "lucide-react";

const AboutSection = ({ profileData, onProfileUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [aboutText, setAboutText] = useState(
    profileData.about || "Add a summary to highlight your personality and work style."
  );

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    onProfileUpdate({ ...profileData, about: aboutText });
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setAboutText(profileData.about || "Add a summary to highlight your personality and work style.");
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">About</h2>
          <button
            onClick={handleEditClick}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit about section"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">
            {profileData.about || "Add a summary to highlight your personality and work style."}
          </p>
        </div>
      </div>

      {/* Edit About Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit About
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Write a brief description about yourself, your goals, and what you're passionate about..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {aboutText.length}/2000 characters
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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
