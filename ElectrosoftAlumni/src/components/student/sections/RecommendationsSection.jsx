import React, { useState } from "react";
import { Edit, Plus, X, MessageCircle } from "lucide-react";

const RecommendationsSection = ({ recommendations = [], onRecommendationsUpdate }) => {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState({
    recipient: "",
    position: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecommendation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this request to the backend
    console.log("Recommendation request sent:", newRecommendation);
    setShowRecommendationModal(false);
    setNewRecommendation({
      recipient: "",
      position: "",
      message: "",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
          <button
            onClick={() => setShowRecommendationModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Request recommendation"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No recommendations yet</p>
              <button
                onClick={() => setShowRecommendationModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Request a recommendation
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {recommendations.map((recommendation, index) => (
                <div key={recommendation.id || index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{recommendation.name}</h3>
                      <p className="text-sm text-gray-600">{recommendation.position}</p>
                      <p className="text-xs text-gray-500">{recommendation.relation}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-500">{recommendation.date}</span>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic border-l-4 border-blue-200 pl-4">
                    "{recommendation.text}"
                  </blockquote>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Request Recommendation Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Request Recommendation
                </h2>
                <button
                  onClick={() => setShowRecommendationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Who would you like to ask? *
                </label>
                <input
                  type="text"
                  name="recipient"
                  value={newRecommendation.recipient}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Search for a connection"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your relationship *
                </label>
                <select
                  name="position"
                  value={newRecommendation.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Select relationship</option>
                  <option value="colleague">Colleague</option>
                  <option value="manager">Manager</option>
                  <option value="teacher">Teacher/Professor</option>
                  <option value="classmate">Classmate</option>
                  <option value="mentor">Mentor</option>
                  <option value="client">Client</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  value={newRecommendation.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Add a personal message to your request..."
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Tips for getting a great recommendation:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Choose people who know your work well</li>
                  <li>• Provide context about your relationship</li>
                  <li>• Be specific about what you'd like them to highlight</li>
                  <li>• Give them enough time to write thoughtfully</li>
                </ul>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRecommendationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationsSection;
