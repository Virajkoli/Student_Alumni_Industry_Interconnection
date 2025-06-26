import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Building,
  Users,
  TrendingUp,
  Globe,
  MapPin,
  Calendar,
  Shield,
  ExternalLink,
} from "lucide-react";

const StartupEcosystemOverview = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditLocationsModalOpen, setIsEditLocationsModalOpen] =
    useState(false);
  const [aboutData, setAboutData] = useState({
    overview:
      "A problem isn't truly solved until it's solved for all. Startups build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.",
    website: "https://mystartup.com/3DLEokh",
    verified: true,
    verifiedDate: "August 16, 2023",
    industry: "Software Development",
    companySize: "10,001+ employees",
    associatedMembers: "310,150",
    headquarters: "Mountain View, CA",
    specialties: [
      "search",
      "ads",
      "mobile",
      "android",
      "online video",
      "apps",
      "machine learning",
      "virtual reality",
      "cloud",
      "hardware",
      "artificial intelligence",
      "youtube",
      "software",
    ],
    locations: [
      {
        name: "Headquarters",
        address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
        type: "HQ",
        employees: "50,000+",
      },
      {
        name: "New York Office",
        address: "111 8th Avenue, New York, NY 10011, USA",
        type: "Office",
        employees: "5,000+",
      },
      {
        name: "London Office",
        address: "6 Pancras Square, London N1C 4AG, UK",
        type: "Office",
        employees: "3,000+",
      },
      {
        name: "Bangalore Office",
        address: "3rd Floor, RMZ Infinity Tower C, Bangalore 560001, India",
        type: "Office",
        employees: "2,000+",
      },
    ],
  });
  const [editData, setEditData] = useState({ ...aboutData });

  const handleEditClick = () => {
    setEditData({ ...aboutData });
    setIsEditModalOpen(true);
  };

  const handleSaveAbout = () => {
    setAboutData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...aboutData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setEditData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (field === "specialties") {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditLocationsClick = () => {
    setEditData({ ...aboutData });
    setIsEditLocationsModalOpen(true);
  };

  const handleSaveLocations = () => {
    setAboutData({ ...editData });
    setIsEditLocationsModalOpen(false);
  };

  const handleCancelLocationsEdit = () => {
    setEditData({ ...aboutData });
    setIsEditLocationsModalOpen(false);
  };

  const handleLocationChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      locations: prev.locations.map((location, i) =>
        i === index ? { ...location, [field]: value } : location
      ),
    }));
  };

  const handleAddLocation = () => {
    setEditData((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        {
          name: "",
          address: "",
          type: "Office",
          employees: "",
        },
      ],
    }));
  };

  const handleRemoveLocation = (index) => {
    setEditData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* About Section */}
        <div className="bg-white rounded-lg mb-6">
          {/* Header */}
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

          {/* Overview */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {aboutData.overview}
            </p>

            {/* Website */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Website
              </h4>
              <a
                href={aboutData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
              >
                {aboutData.website}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Verified Page */}
            {aboutData.verified && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    Verified page
                  </h4>
                  <Shield className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600">
                  {aboutData.verifiedDate}
                </p>
              </div>
            )}

            {/* Company Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Industry */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Industry
                </h4>
                <p className="text-sm text-gray-700">{aboutData.industry}</p>
              </div>

              {/* Company Size */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Company size
                </h4>
                <p className="text-sm text-gray-700">{aboutData.companySize}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  {aboutData.associatedMembers} associated members
                  <Shield className="w-3 h-3" />
                </p>
              </div>

              {/* Headquarters */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Headquarters
                </h4>
                <p className="text-sm text-gray-700">
                  {aboutData.headquarters}
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-1">
                  {aboutData.specialties.map((specialty, index) => (
                    <span key={index} className="text-sm text-gray-700">
                      {specialty}
                      {index < aboutData.specialties.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="border-t border-gray-300 my-4" />
        {/* Locations Section */}
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Locations</h2>
            <button
              onClick={handleEditLocationsClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit locations"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Locations List */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutData.locations.map((location, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {location.name}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {location.type}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {location.employees} employees
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit About Information
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overview
                </label>
                <textarea
                  value={editData.overview}
                  onChange={(e) =>
                    handleInputChange("overview", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter company overview"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter website URL"
                />
              </div>

              {/* Company Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={editData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter industry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <input
                    type="text"
                    value={editData.companySize}
                    onChange={(e) =>
                      handleInputChange("companySize", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter company size"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Associated Members
                  </label>
                  <input
                    type="text"
                    value={editData.associatedMembers}
                    onChange={(e) =>
                      handleInputChange("associatedMembers", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter number of associated members"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headquarters
                  </label>
                  <input
                    type="text"
                    value={editData.headquarters}
                    onChange={(e) =>
                      handleInputChange("headquarters", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter headquarters location"
                  />
                </div>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties (comma-separated)
                </label>
                <textarea
                  value={editData.specialties.join(", ")}
                  onChange={(e) =>
                    handleInputChange("specialties", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter specialties separated by commas"
                />
              </div>

              {/* Verified Status */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.verified}
                    onChange={(e) =>
                      handleInputChange("verified", e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Verified Page
                  </span>
                </label>

                {editData.verified && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verified Date
                    </label>
                    <input
                      type="text"
                      value={editData.verifiedDate}
                      onChange={(e) =>
                        handleInputChange("verifiedDate", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter verification date"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAbout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Locations Modal */}
      {isEditLocationsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Locations
                </h2>
                <button
                  onClick={handleCancelLocationsEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {editData.locations.map((location, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">
                      Location {index + 1}
                    </h3>
                    {editData.locations.length > 1 && (
                      <button
                        onClick={() => handleRemoveLocation(index)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove location"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location Name *
                      </label>
                      <input
                        type="text"
                        value={location.name}
                        onChange={(e) =>
                          handleLocationChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., Headquarters, New York Office"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        value={location.type}
                        onChange={(e) =>
                          handleLocationChange(index, "type", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="HQ">Headquarters</option>
                        <option value="Office">Office</option>
                        <option value="Branch">Branch</option>
                        <option value="Remote">Remote</option>
                        <option value="Co-working">Co-working Space</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        value={location.address}
                        onChange={(e) =>
                          handleLocationChange(index, "address", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        placeholder="Enter full address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Employees
                      </label>
                      <input
                        type="text"
                        value={location.employees}
                        onChange={(e) =>
                          handleLocationChange(
                            index,
                            "employees",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., 50+, 1,000+"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Location Button */}
              <button
                onClick={handleAddLocation}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                Add New Location
              </button>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelLocationsEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLocations}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartupEcosystemOverview;
