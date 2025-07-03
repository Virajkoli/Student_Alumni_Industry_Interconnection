import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  Award,
} from "lucide-react";

const CollegeInformation = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditLocationsModalOpen, setIsEditLocationsModalOpen] =
    useState(false);

  // Fix leaflet default markers
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  const [collegeData, setCollegeData] = useState({
    overview:
      "A premier institution dedicated to excellence in education, research, and innovation. Our college fosters a vibrant learning environment that prepares students for successful careers and meaningful contributions to society. With world-class faculty, state-of-the-art facilities, and a strong commitment to academic excellence, we provide students with the knowledge, skills, and experiences needed to thrive in their chosen fields.",
    website: "https://mycollege.edu/academics",
    verified: true,
    verifiedDate: "January 15, 2020",
    establishmentYear: "1958",
    location: "Kanpur, Uttar Pradesh, India",
    collegeType: "Public University",
    totalStudents: "15,000+ students",
    faculty: "800+ faculty members",
    accreditation: "NAAC A++ Grade",
    nirfRank: "National Ranking: 45",
    specialties: [
      "Engineering",
      "Computer Science",
      "Management",
      "Medicine",
      "Law",
      "Arts & Sciences",
      "Research",
      "Innovation",
      "Industry Partnerships",
      "Placements",
    ],
    customFields: [], // Array of custom fields added by user
    campuses: [
      {
        name: "Main Campus",
        address: "Kanpur, Uttar Pradesh - 200076, India",
        type: "Main Campus",
        students: "10,000+",
        coordinates: [19.1136, 72.8697], 
        dean: "Dr. Rajesh Sharma",
        contact: {
          phone: "+91 22 2673 0000",
          email: "main@mycollege.edu",
        },
        image:
          "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=150&fit=crop",
        customFields: [],
      },
      {
        name: "Engineering Campus",
        address: "Mirzapur, Uttar Pradesh - 200050, India",
        type: "Specialized Campus",
        students: "3,500+",
        coordinates: [19.1197, 72.9056], 
        dean: "Dr. Priya Patel",
        contact: {
          phone: "+91 22 2576 7000",
          email: "engineering@mycollege.edu",
        },
        image:
          "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&h=150&fit=crop",
        customFields: [],
      },
      {
        name: "Medical Campus",
        address: "Jaunpur, Uttar Pradesh - 200060, India",
        type: "Medical Campus",
        students: "1,500+",
        coordinates: [19.0596, 72.8295], 
        dean: "Dr. Amit Desai",
        contact: {
          phone: "+91 22 2640 5000",
          email: "medical@mycollege.edu",
        },
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=150&fit=crop",
        customFields: [],
      },
    ],
  });
  const [editData, setEditData] = useState({ ...collegeData });

  const handleEditClick = () => {
    setEditData({ ...collegeData });
    setIsEditModalOpen(true);
  };

  const handleSaveAbout = () => {
    setCollegeData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...collegeData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field === "specialties") {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditCampusesClick = () => {
    setEditData({ ...collegeData });
    setIsEditLocationsModalOpen(true);
  };

  const handleSaveCampuses = () => {
    setCollegeData({ ...editData });
    setIsEditLocationsModalOpen(false);
  };

  const handleCancelCampusesEdit = () => {
    setEditData({ ...collegeData });
    setIsEditLocationsModalOpen(false);
  };

  const handleCampusChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      campuses: prev.campuses.map((campus, i) => {
        if (i === index) {
          if (field.startsWith("contact.")) {
            const contactField = field.split(".")[1];
            return {
              ...campus,
              contact: {
                ...campus.contact,
                [contactField]: value,
              },
            };
          } else if (field === "coordinates") {
            // Parse coordinates from string "lat,lng"
            const coords = value
              .split(",")
              .map((coord) => parseFloat(coord.trim()));
            return {
              ...campus,
              [field]: coords.length === 2 ? coords : [0, 0],
            };
          }
          return { ...campus, [field]: value };
        }
        return campus;
      }),
    }));
  };

  const handleAddCampus = () => {
    setEditData((prev) => ({
      ...prev,
      campuses: [
        ...prev.campuses,
        {
          name: "",
          address: "",
          type: "Campus",
          students: "",
          coordinates: [19.076, 72.8777], // Default to Mumbai
          dean: "",
          contact: {
            phone: "",
            email: "",
          },
          image:
            "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
          customFields: [], // Array of custom fields for each campus
        },
      ],
    }));
  };

  const handleRemoveCampus = (index) => {
    setEditData((prev) => ({
      ...prev,
      campuses: prev.campuses.filter((_, i) => i !== index),
    }));
  };

  // Custom fields handlers for About section
  const handleAddCustomField = () => {
    setEditData((prev) => ({
      ...prev,
      customFields: [
        ...(prev.customFields || []),
        { id: Date.now(), label: "", value: "" },
      ],
    }));
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId ? { ...field, [property]: value } : field
      ),
    }));
  };

  const handleRemoveCustomField = (fieldId) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== fieldId),
    }));
  };

  // Custom fields handlers for Campuses
  const handleAddCampusCustomField = (campusIndex) => {
    setEditData((prev) => ({
      ...prev,
      campuses: prev.campuses.map((campus, i) =>
        i === campusIndex
          ? {
              ...campus,
              customFields: [
                ...(campus.customFields || []),
                { id: Date.now(), label: "", value: "" },
              ],
            }
          : campus
      ),
    }));
  };

  const handleCampusCustomFieldChange = (
    campusIndex,
    fieldId,
    property,
    value
  ) => {
    setEditData((prev) => ({
      ...prev,
      campuses: prev.campuses.map((campus, i) =>
        i === campusIndex
          ? {
              ...campus,
              customFields: campus.customFields.map((field) =>
                field.id === fieldId ? { ...field, [property]: value } : field
              ),
            }
          : campus
      ),
    }));
  };

  const handleRemoveCampusCustomField = (campusIndex, fieldId) => {
    setEditData((prev) => ({
      ...prev,
      campuses: prev.campuses.map((campus, i) =>
        i === campusIndex
          ? {
              ...campus,
              customFields: campus.customFields.filter(
                (field) => field.id !== fieldId
              ),
            }
          : campus
      ),
    }));
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto" style={{ backgroundColor: '#F7FAFC' }}>
        {/* About Section */}
        <div className="rounded-lg mb-6" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#DCE8F2' }}>
            <h2 className="text-xl font-semibold" style={{ color: '#1F2D3D' }}>About</h2>
            <button
              onClick={handleEditClick}
              className="p-2 hover:bg-opacity-10 rounded-full transition-colors"
              style={{ color: '#6EA9C8' }}
              title="Edit about section"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2D3D' }}>
              Overview
            </h3>
            <p className="leading-relaxed mb-6" style={{ color: '#4A5568' }}>
              {collegeData.overview}
            </p>

            {/* Website */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2" style={{ color: '#1F2D3D' }}>
                Website
              </h4>
              <a
                href={collegeData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 transition-colors"
                style={{ color: '#6EA9C8' }}
              >
                {collegeData.website}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Verified Page */}
            {collegeData.verified && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium" style={{ color: '#1F2D3D' }}>
                    Verified institution
                  </h4>
                  <Shield className="w-4 h-4" style={{ color: '#6EA9C8' }} />
                </div>
                <p className="text-sm" style={{ color: '#4A5568' }}>
                  {collegeData.verifiedDate}
                </p>
              </div>
            )}

            {/* College Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Establishment Year */}
              <div>
                <h4 className="text-sm font-medium mb-1" style={{ color: '#1F2D3D' }}>
                  Established
                </h4>
                <p className="text-sm flex items-center gap-1" style={{ color: '#4A5568' }}>
                  <Calendar className="w-4 h-4" />
                  {collegeData.establishmentYear}
                </p>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Location
                </h4>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {collegeData.location}
                </p>
              </div>

              {/* College Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  College Type
                </h4>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {collegeData.collegeType}
                </p>
              </div>

              {/* Total Students */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Students
                </h4>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {collegeData.totalStudents}
                </p>
              </div>

              {/* Faculty */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Faculty
                </h4>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  {collegeData.faculty}
                </p>
              </div>

              {/* Accreditation */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Accreditation
                </h4>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {collegeData.accreditation}
                </p>
              </div>

              {/* NIRF Rank */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  NIRF Ranking
                </h4>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {collegeData.nirfRank}
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Academic Programs
                </h4>
                <div className="flex flex-wrap gap-1">
                  {collegeData.specialties.map((specialty, index) => (
                    <span key={index} className="text-sm text-gray-700">
                      {specialty}
                      {index < collegeData.specialties.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Fields Display */}
            {collegeData.customFields &&
              collegeData.customFields.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Additional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collegeData.customFields.map((field, index) => (
                      <div key={field.id || index}>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">
                          {field.label}
                        </h5>
                        <p className="text-sm text-gray-700">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4" />
        {/* Campuses Section */}
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Campuses</h2>
            <button
              onClick={handleEditCampusesClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit campuses"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Campuses List */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collegeData.campuses.map((campus, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{campus.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {campus.type}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{campus.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {campus.students} students
                    </p>
                  </div>

                  {/* Display Custom Fields */}
                  {campus.customFields && campus.customFields.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {campus.customFields.map((field, fieldIndex) => (
                        <div
                          key={field.id || fieldIndex}
                          className="flex items-center gap-2 mb-1"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                          <span className="text-xs font-medium text-gray-700">
                            {field.label}:
                          </span>
                          <span className="text-xs text-gray-600">
                            {field.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Interactive Map Section */}
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Campus Locations Map
            </h2>
            <Globe className="w-6 h-6 text-gray-400" />
          </div>

          {/* Map Container */}
          <div className="p-6">
            <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
              <MapContainer
                center={[19.076, 72.8777]} // Center on Mumbai, India
                zoom={10}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {collegeData.campuses.map((campus, index) => (
                  <Marker key={index} position={campus.coordinates}>
                    <Popup
                      maxWidth={220}
                      minWidth={220}
                      className="compact-popup"
                    >
                      <div className="p-1">
                        <div className="flex items-start gap-2 mb-2">
                          <img
                            src={campus.image}
                            alt={campus.name}
                            className="w-12 h-12 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm truncate">
                              {campus.name}
                            </h3>
                            <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                              {campus.type}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-600 leading-tight">
                              {campus.address}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-gray-400" />
                            <p className="text-gray-600">
                              {campus.students} students
                            </p>
                          </div>

                          <div className="border-t pt-1 mt-1">
                            <p className="font-medium text-gray-900 text-xs">
                              Dean: {campus.dean}
                            </p>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <a
                                href={`tel:${campus.contact.phone}`}
                                className="text-blue-600 hover:text-blue-700 text-xs truncate"
                              >
                                {campus.contact.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <a
                                href={`mailto:${campus.contact.email}`}
                                className="text-blue-600 hover:text-blue-700 text-xs truncate"
                              >
                                {campus.contact.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Campus Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Click markers for campus details</span>
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
                    Edit College Information
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
                    placeholder="Enter college overview"
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
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter website URL"
                  />
                </div>

                {/* College Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Establishment Year
                    </label>
                    <input
                      type="text"
                      value={editData.establishmentYear}
                      onChange={(e) =>
                        handleInputChange("establishmentYear", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter establishment year"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      College Type
                    </label>
                    <select
                      value={editData.collegeType}
                      onChange={(e) =>
                        handleInputChange("collegeType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="Public University">
                        Public University
                      </option>
                      <option value="Private University">
                        Private University
                      </option>
                      <option value="Deemed University">
                        Deemed University
                      </option>
                      <option value="Government College">
                        Government College
                      </option>
                      <option value="Private College">Private College</option>
                      <option value="Autonomous College">
                        Autonomous College
                      </option>
                      <option value="Institute of Technology">
                        Institute of Technology
                      </option>
                      <option value="Medical College">Medical College</option>
                      <option value="Engineering College">
                        Engineering College
                      </option>
                      <option value="Management Institute">
                        Management Institute
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Students
                    </label>
                    <input
                      type="text"
                      value={editData.totalStudents}
                      onChange={(e) =>
                        handleInputChange("totalStudents", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter total number of students"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty
                    </label>
                    <input
                      type="text"
                      value={editData.faculty}
                      onChange={(e) =>
                        handleInputChange("faculty", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter number of faculty members"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accreditation
                    </label>
                    <input
                      type="text"
                      value={editData.accreditation}
                      onChange={(e) =>
                        handleInputChange("accreditation", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter accreditation details"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIRF Ranking
                    </label>
                    <input
                      type="text"
                      value={editData.nirfRank}
                      onChange={(e) =>
                        handleInputChange("nirfRank", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter NIRF ranking"
                    />
                  </div>
                </div>

                {/* Academic Programs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Programs (comma-separated)
                  </label>
                  <textarea
                    value={editData.specialties.join(", ")}
                    onChange={(e) =>
                      handleInputChange("specialties", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter academic programs separated by commas"
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
                      Verified Institution
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

                {/* Custom Fields Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Fields
                    </label>
                    <button
                      type="button"
                      onClick={handleAddCustomField}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Custom Field
                    </button>
                  </div>

                  {editData.customFields &&
                    editData.customFields.length > 0 && (
                      <div className="space-y-3">
                        {editData.customFields.map((field) => (
                          <div
                            key={field.id}
                            className="flex gap-3 items-start"
                          >
                            <div className="flex-1">
                              <input
                                type="text"
                                value={field.label}
                                onChange={(e) =>
                                  handleCustomFieldChange(
                                    field.id,
                                    "label",
                                    e.target.value
                                  )
                                }
                                placeholder="Field Label (e.g., Campus Area, Alumni Network)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              />
                            </div>
                            <div className="flex-1">
                              <input
                                type="text"
                                value={field.value}
                                onChange={(e) =>
                                  handleCustomFieldChange(
                                    field.id,
                                    "value",
                                    e.target.value
                                  )
                                }
                                placeholder="Field Value (e.g., 100 acres, 50,000+)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomField(field.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove field"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
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

        {/* Edit Campuses Modal */}
        {isEditLocationsModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit Campuses
                  </h2>
                  <button
                    onClick={handleCancelCampusesEdit}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {editData.campuses.map((campus, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">
                        Campus {index + 1}
                      </h3>
                      {editData.campuses.length > 1 && (
                        <button
                          onClick={() => handleRemoveCampus(index)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Remove campus"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Campus Name *
                        </label>
                        <input
                          type="text"
                          value={campus.name}
                          onChange={(e) =>
                            handleCampusChange(index, "name", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g., Main Campus, Engineering Campus"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type *
                        </label>
                        <select
                          value={campus.type}
                          onChange={(e) =>
                            handleCampusChange(index, "type", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="Main Campus">Main Campus</option>
                          <option value="Specialized Campus">
                            Specialized Campus
                          </option>
                          <option value="Medical Campus">Medical Campus</option>
                          <option value="Engineering Campus">
                            Engineering Campus
                          </option>
                          <option value="Management Campus">
                            Management Campus
                          </option>
                          <option value="Research Campus">
                            Research Campus
                          </option>
                          <option value="Satellite Campus">
                            Satellite Campus
                          </option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <textarea
                          value={campus.address}
                          onChange={(e) =>
                            handleCampusChange(index, "address", e.target.value)
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          placeholder="Enter full address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Students
                        </label>
                        <input
                          type="text"
                          value={campus.students}
                          onChange={(e) =>
                            handleCampusChange(
                              index,
                              "students",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g., 5,000+, 10,000+"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Coordinates (lat, lng)
                        </label>
                        <input
                          type="text"
                          value={
                            campus.coordinates
                              ? campus.coordinates.join(", ")
                              : "0, 0"
                          }
                          onChange={(e) =>
                            handleCampusChange(
                              index,
                              "coordinates",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g., 19.0760, 72.8777"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dean
                        </label>
                        <input
                          type="text"
                          value={campus.dean || ""}
                          onChange={(e) =>
                            handleCampusChange(index, "dean", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g., Dr. John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={campus.image || ""}
                          onChange={(e) =>
                            handleCampusChange(index, "image", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={campus.contact?.phone || ""}
                          onChange={(e) =>
                            handleCampusChange(
                              index,
                              "contact.phone",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="+91 22 1234 5678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={campus.contact?.email || ""}
                          onChange={(e) =>
                            handleCampusChange(
                              index,
                              "contact.email",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="campus@college.edu"
                        />
                      </div>
                    </div>

                    {/* Custom Fields for Campus */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Custom Fields for this Campus
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddCampusCustomField(index)}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          + Add Custom Field
                        </button>
                      </div>

                      {campus.customFields &&
                        campus.customFields.length > 0 && (
                          <div className="space-y-2">
                            {campus.customFields.map((field) => (
                              <div
                                key={field.id}
                                className="flex gap-2 items-start"
                              >
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) =>
                                      handleCampusCustomFieldChange(
                                        index,
                                        field.id,
                                        "label",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Label (e.g., Library, Sports Complex)"
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  />
                                </div>
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) =>
                                      handleCampusCustomFieldChange(
                                        index,
                                        field.id,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Value (e.g., 24/7 Access, Available)"
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveCampusCustomField(
                                      index,
                                      field.id
                                    )
                                  }
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                  title="Remove field"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                ))}

                {/* Add New Campus Button */}
                <button
                  onClick={handleAddCampus}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-xl">+</span>
                  Add New Campus
                </button>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
                <button
                  onClick={handleCancelCampusesEdit}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCampuses}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollegeInformation;
