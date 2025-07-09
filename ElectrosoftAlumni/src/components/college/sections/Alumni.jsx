import React, { useState } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";

const Alumni = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [alumniData, setAlumniData] = useState({
    notableAlumni: [
      "Dr. Rajesh Kumar (Class of 1995) - CEO, Tech Innovations Inc.",
      "Ms. Priya Sharma (Class of 2000) - Founder, EduTech Solutions",
      "Mr. Arun Patel (Class of 2005) - Senior Director, Google",
      "Dr. Sneha Gupta (Class of 1998) - Chief Scientist, ISRO",
      "Mr. Vikram Singh (Class of 2010) - Co-founder, FinTech Startup",
      "Ms. Anita Desai (Class of 2002) - VP Engineering, Microsoft",
    ],
    initiatives: [
      "Annual Alumni Meet with networking opportunities",
      "Mentorship Program connecting alumni with current students",
      "Career Guidance Sessions by industry experts",
      "Alumni Scholarship Fund for deserving students",
      "Industry Connect Workshops and seminars",
      "Entrepreneurship Support and startup incubation",
    ],
    networks: [
      "Global Alumni Association with 10,000+ members",
      "Regional chapters in 25+ cities worldwide",
      "Professional networking platform and mobile app",
      "LinkedIn group with active discussions",
      "Quarterly newsletter and alumni magazine",
      "Annual homecoming events and reunions",
    ],
    contributions: [
      "₹5 crores contributed for infrastructure development",
      "200+ internship opportunities provided annually",
      "50+ guest lectures by alumni professionals",
      "Research grants and funding for student projects",
      "Industry partnerships and collaboration programs",
      "Placement assistance and job referrals",
    ],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...alumniData });

  const handleEditClick = () => {
    setEditData({ ...alumniData });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setAlumniData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...alumniData });
    setIsEditModalOpen(false);
  };

  // Notable Alumni handlers
  const handleNotableAlumniChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      notableAlumni: prev.notableAlumni.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddNotableAlumni = () => {
    setEditData((prev) => ({
      ...prev,
      notableAlumni: [...prev.notableAlumni, ""],
    }));
  };

  const handleRemoveNotableAlumni = (index) => {
    setEditData((prev) => ({
      ...prev,
      notableAlumni: prev.notableAlumni.filter((_, i) => i !== index),
    }));
  };

  // Alumni Initiatives handlers
  const handleInitiativeChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      initiatives: prev.initiatives.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddInitiative = () => {
    setEditData((prev) => ({
      ...prev,
      initiatives: [...prev.initiatives, ""],
    }));
  };

  const handleRemoveInitiative = (index) => {
    setEditData((prev) => ({
      ...prev,
      initiatives: prev.initiatives.filter((_, i) => i !== index),
    }));
  };

  // Alumni Networks handlers
  const handleNetworkChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      networks: prev.networks.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddNetwork = () => {
    setEditData((prev) => ({
      ...prev,
      networks: [...prev.networks, ""],
    }));
  };

  const handleRemoveNetwork = (index) => {
    setEditData((prev) => ({
      ...prev,
      networks: prev.networks.filter((_, i) => i !== index),
    }));
  };

  // Alumni Contributions handlers
  const handleContributionChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      contributions: prev.contributions.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddContribution = () => {
    setEditData((prev) => ({
      ...prev,
      contributions: [...prev.contributions, ""],
    }));
  };

  const handleRemoveContribution = (index) => {
    setEditData((prev) => ({
      ...prev,
      contributions: prev.contributions.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Alumni Section */}
        <div className="bg-white rounded-lg mb-8">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Alumni Network</h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit alumni information"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Notable Alumni */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Notable Alumni
              </h3>
              <div className="space-y-3">
                {alumniData.notableAlumni &&
                  alumniData.notableAlumni.map((alumni, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{alumni}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Alumni Initiatives */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Alumni Initiatives
              </h3>
              <div className="space-y-3">
                {alumniData.initiatives &&
                  alumniData.initiatives.map((initiative, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-0.5">{initiative}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Alumni Networks */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Alumni Networks
              </h3>
              <div className="space-y-3">
                {alumniData.networks &&
                  alumniData.networks.map((network, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{network}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Alumni Contributions */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Alumni Contributions
              </h3>
              <div className="space-y-3">
                {alumniData.contributions &&
                  alumniData.contributions.map((contribution, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{contribution}</p>
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
              <h3 className="text-xl font-bold text-gray-800">Edit Alumni Information</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Notable Alumni */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Notable Alumni</h4>
                <div className="space-y-3">
                  {editData.notableAlumni.map((alumni, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={alumni}
                        onChange={(e) => handleNotableAlumniChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Alumni details (e.g., Dr. John Smith (Class of 1995) - CEO, Tech Corp)"
                      />
                      <button
                        onClick={() => handleRemoveNotableAlumni(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddNotableAlumni}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Notable Alumni
                  </button>
                </div>
              </div>

              {/* Alumni Initiatives */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Alumni Initiatives</h4>
                <div className="space-y-3">
                  {editData.initiatives.map((initiative, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={initiative}
                        onChange={(e) => handleInitiativeChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Initiative details"
                      />
                      <button
                        onClick={() => handleRemoveInitiative(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddInitiative}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Initiative
                  </button>
                </div>
              </div>

              {/* Alumni Networks */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Alumni Networks</h4>
                <div className="space-y-3">
                  {editData.networks.map((network, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={network}
                        onChange={(e) => handleNetworkChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Network details"
                      />
                      <button
                        onClick={() => handleRemoveNetwork(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddNetwork}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Network
                  </button>
                </div>
              </div>

              {/* Alumni Contributions */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Alumni Contributions</h4>
                <div className="space-y-3">
                  {editData.contributions.map((contribution, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={contribution}
                        onChange={(e) => handleContributionChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Contribution details"
                      />
                      <button
                        onClick={() => handleRemoveContribution(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddContribution}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Contribution
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

export default Alumni;
