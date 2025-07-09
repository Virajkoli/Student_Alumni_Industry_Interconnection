import React, { useState } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";

const Events = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [eventsData, setEventsData] = useState({
    annualEvents: [
      "Alumni Meet - Grand reunion with networking opportunities",
      "Techno-Cultural Fest - Week-long celebration of technology and culture",
      "Foundation Day - Commemorating the establishment of the institution",
      "Sports Festival - Inter-college and intra-college competitions",
      "Science Exhibition - Showcase of innovative projects and research",
      "Cultural Night - Performances by students and guest artists",
    ],
    techCulture: [
      "Hackathon - 48-hour coding challenge with industry mentors",
      "Robotics Competition - Design and build innovative robots",
      "Tech Talks - Expert sessions on emerging technologies",
      "Cultural Performances - Dance, music, and drama competitions",
      "Art Exhibition - Display of creative works by students",
      "Literary Festival - Poetry, storytelling, and creative writing",
    ],
    seminars: [
      "Industry-Academia Conclave with leading professionals",
      "Entrepreneurship Summit for aspiring business leaders",
      "Research Symposium showcasing student innovations",
      "Career Guidance Sessions with HR professionals",
      "Technical Workshops on latest industry tools",
      "Personality Development and Soft Skills Training",
    ],
    conferences: [
      "International Conference on Emerging Technologies",
      "National Conference on Sustainable Development",
      "Annual Management and Leadership Conference",
      "Student Research Paper Presentation Conference",
      "Innovation and Patent Filing Workshop",
      "Digital Transformation in Education Symposium",
    ],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...eventsData });

  const handleEditClick = () => {
    setEditData({ ...eventsData });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setEventsData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...eventsData });
    setIsEditModalOpen(false);
  };

  // Annual Events handlers
  const handleAnnualEventChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      annualEvents: prev.annualEvents.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddAnnualEvent = () => {
    setEditData((prev) => ({
      ...prev,
      annualEvents: [...prev.annualEvents, ""],
    }));
  };

  const handleRemoveAnnualEvent = (index) => {
    setEditData((prev) => ({
      ...prev,
      annualEvents: prev.annualEvents.filter((_, i) => i !== index),
    }));
  };

  // Tech & Cultural Events handlers
  const handleTechCultureChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      techCulture: prev.techCulture.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddTechCulture = () => {
    setEditData((prev) => ({
      ...prev,
      techCulture: [...prev.techCulture, ""],
    }));
  };

  const handleRemoveTechCulture = (index) => {
    setEditData((prev) => ({
      ...prev,
      techCulture: prev.techCulture.filter((_, i) => i !== index),
    }));
  };

  // Seminars handlers
  const handleSeminarChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      seminars: prev.seminars.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddSeminar = () => {
    setEditData((prev) => ({
      ...prev,
      seminars: [...prev.seminars, ""],
    }));
  };

  const handleRemoveSeminar = (index) => {
    setEditData((prev) => ({
      ...prev,
      seminars: prev.seminars.filter((_, i) => i !== index),
    }));
  };

  // Conferences handlers
  const handleConferenceChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      conferences: prev.conferences.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddConference = () => {
    setEditData((prev) => ({
      ...prev,
      conferences: [...prev.conferences, ""],
    }));
  };

  const handleRemoveConference = (index) => {
    setEditData((prev) => ({
      ...prev,
      conferences: prev.conferences.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Events Section */}
        <div className="bg-white rounded-lg mb-8">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Events & Activities</h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit events information"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Annual Events */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Annual Events
              </h3>
              <div className="space-y-3">
                {eventsData.annualEvents &&
                  eventsData.annualEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{event}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tech & Cultural Events */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tech & Cultural Events
              </h3>
              <div className="space-y-3">
                {eventsData.techCulture &&
                  eventsData.techCulture.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-0.5">{event}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Seminars & Workshops */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Seminars & Workshops
              </h3>
              <div className="space-y-3">
                {eventsData.seminars &&
                  eventsData.seminars.map((seminar, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{seminar}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Conferences */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Conferences
              </h3>
              <div className="space-y-3">
                {eventsData.conferences &&
                  eventsData.conferences.map((conference, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{conference}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Events Information</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Annual Events */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Annual Events</h4>
                <div className="space-y-3">
                  {editData.annualEvents.map((event, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={event}
                        onChange={(e) => handleAnnualEventChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Event details"
                      />
                      <button
                        onClick={() => handleRemoveAnnualEvent(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddAnnualEvent}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Annual Event
                  </button>
                </div>
              </div>

              {/* Tech & Cultural Events */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Tech & Cultural Events</h4>
                <div className="space-y-3">
                  {editData.techCulture.map((event, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={event}
                        onChange={(e) => handleTechCultureChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Tech/Cultural event details"
                      />
                      <button
                        onClick={() => handleRemoveTechCulture(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddTechCulture}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Tech/Cultural Event
                  </button>
                </div>
              </div>

              {/* Seminars & Workshops */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Seminars & Workshops</h4>
                <div className="space-y-3">
                  {editData.seminars.map((seminar, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={seminar}
                        onChange={(e) => handleSeminarChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Seminar/Workshop details"
                      />
                      <button
                        onClick={() => handleRemoveSeminar(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddSeminar}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Seminar/Workshop
                  </button>
                </div>
              </div>

              {/* Conferences */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Conferences</h4>
                <div className="space-y-3">
                  {editData.conferences.map((conference, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={conference}
                        onChange={(e) => handleConferenceChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Conference details"
                      />
                      <button
                        onClick={() => handleRemoveConference(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddConference}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Conference
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
