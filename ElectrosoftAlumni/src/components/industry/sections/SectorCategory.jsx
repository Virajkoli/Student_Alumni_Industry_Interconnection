import React, { useState } from "react";
import { Edit3, Building2, TrendingUp, MapPin, Users, X, Plus, Globe, ChartBar } from "lucide-react";

const SectorCategory = () => {
  const [editingId, setEditingId] = useState(null);
  const [sectors, setSectors] = useState([
    {
      id: 1,
      name: "Manufacturing",
      description:
        "Heavy industry, production facilities, and industrial automation systems driving economic growth.",
      companies: 2500,
      employment: "5.2M",
      growth: "+12%",
      majorCities: ["Mumbai", "Chennai", "Pune", "Gujarat"],
     
    },
    {
      id: 2,
      name: "Information Technology",
      description:
        "Software development, IT services, digital transformation, and emerging technologies sector.",
      companies: 3200,
      employment: "4.8M",
      growth: "+18%",
      majorCities: ["Bangalore", "Hyderabad", "Pune", "Chennai"],
      
      color: "green",
    },
    {
      id: 3,
      name: "Healthcare & Pharmaceuticals",
      description:
        "Medical services, pharmaceutical manufacturing, biotechnology, and healthcare innovation.",
      companies: 1800,
      employment: "3.1M",
      growth: "+15%",
      majorCities: ["Mumbai", "Hyderabad", "Delhi", "Bangalore"],
      
      color: "red",
    },
    {
      id: 4,
      name: "Financial Services",
      description:
        "Banking, insurance, fintech, investment services, and financial technology solutions.",
      companies: 1200,
      employment: "2.8M",
      growth: "+14%",
      majorCities: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
      
      color: "purple",
    },
    {
      id: 5,
      name: "Renewable Energy",
      description:
        "Solar, wind, hydroelectric power generation, and sustainable energy infrastructure development.",
      companies: 850,
      employment: "1.5M",
      growth: "+25%",
      majorCities: ["Gujarat", "Rajasthan", "Karnataka", "Tamil Nadu"],
      
      color: "emerald",
    },
    {
      id: 6,
      name: "Automotive",
      description:
        "Vehicle manufacturing, electric vehicles, automotive components, and mobility solutions.",
      companies: 950,
      employment: "2.2M",
      growth: "+8%",
      majorCities: ["Chennai", "Pune", "Gurgaon", "Bangalore"],
     
      color: "orange",
    },
  ]);

  const [editData, setEditData] = useState({
    name: "",
    description: "",
    companies: "",
    employment: "",
    growth: "",
    majorCities: "",
    color: "blue",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);

  const handleEditClick = (sector) => {
    setSelectedSector(sector);
    setEditData({
      name: sector.name,
      description: sector.description,
      companies: sector.companies.toString(),
      employment: sector.employment,
      growth: sector.growth,
      majorCities: sector.majorCities.join(", "),
      color: sector.color,
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedSector(null);
    setEditData({
      name: "",
      description: "",
      companies: "",
      employment: "",
      growth: "",
      majorCities: "",
      color: "blue",
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedSector) {
      // Edit existing sector
      setSectors(
        sectors.map((sector) =>
          sector.id === selectedSector.id
            ? {
                ...sector,
                name: editData.name,
                description: editData.description,
                companies: parseInt(editData.companies),
                employment: editData.employment,
                growth: editData.growth,
                majorCities: editData.majorCities
                  .split(",")
                  .map((city) => city.trim()),
                color: editData.color,
              }
            : sector
        )
      );
    } else {
      // Add new sector
      setSectors([
        ...sectors,
        {
          id: sectors.length + 1,
          name: editData.name,
          description: editData.description,
          companies: parseInt(editData.companies),
          employment: editData.employment,
          growth: editData.growth,
          majorCities: editData.majorCities
            .split(",")
            .map((city) => city.trim()),
          color: editData.color,
          icon: "🏢", // Default icon
        },
      ]);
    }
    setIsModalOpen(false);
    setSelectedSector(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSector(null);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      red: "from-red-500 to-red-600",
      purple: "from-purple-500 to-purple-600",
      emerald: "from-emerald-500 to-emerald-600",
      orange: "from-orange-500 to-orange-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section - More minimal and clean */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Industry Sectors</h2>
            <p className="text-gray-600 mt-1">Overview of key industry sectors and their performance</p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Sector
          </button>
        </div>

        {/* Summary Stats - More subtle and inline */}
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {sectors.reduce((sum, s) => sum + s.companies, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Companies</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">19.6M</p>
              <p className="text-sm text-gray-500">Employees</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">{sectors.length}</p>
              <p className="text-sm text-gray-500">Sectors</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ChartBar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">15.2%</p>
              <p className="text-sm text-gray-500">Avg Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sectors Grid - More minimal and elegant */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="group relative bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Sector Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getColorClasses(sector.color)} flex items-center justify-center text-2xl`}>
                  {sector.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{sector.name}</h3>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-600">{sector.growth}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleEditClick(sector)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sector.description}</p>

            {/* Key Stats */}
            <div className="flex gap-4 mb-4">
              <div>
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <Building2 className="w-4 h-4 mr-1" />
                  Companies
                </div>
                <p className="font-semibold text-gray-900">{sector.companies.toLocaleString()}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  Employment
                </div>
                <p className="font-semibold text-gray-900">{sector.employment}</p>
              </div>
            </div>

            {/* Cities */}
            <div>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                Major Hubs
              </div>
              <div className="flex flex-wrap gap-2">
                {sector.majorCities.map((city, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Keep existing modal code but update styling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedSector ? "Edit Sector" : "Add New Sector"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Fields - Modern, clean styling */}
            <form className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Basic Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sector Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Technology"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Growth Rate</label>
                    <input
                      type="text"
                      name="growth"
                      value={editData.growth}
                      onChange={(e) => setEditData({ ...editData, growth: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 12.5%"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Brief description of the sector..."
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Statistics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Companies</label>
                    <input
                      type="number"
                      name="companies"
                      value={editData.companies}
                      onChange={(e) => setEditData({ ...editData, companies: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 1000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment</label>
                    <input
                      type="text"
                      name="employment"
                      value={editData.employment}
                      onChange={(e) => setEditData({ ...editData, employment: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 2.5M"
                    />
                  </div>
                </div>
              </div>

              {/* Major Cities */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Major Hubs</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Major Cities</label>
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {editData.majorCities.split(",").map((city, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white border border-gray-200"
                      >
                        {city}
                        <button
                          type="button"
                          onClick={() => {
                            const cities = editData.majorCities.split(",");
                            cities.splice(index, 1);
                            setEditData({ ...editData, majorCities: cities.join(",") });
                          }}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      value={editData.newCity}
                      onChange={(e) => setEditData({ ...editData, newCity: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && editData.newCity.trim() !== "") {
                          setEditData({
                            ...editData,
                            majorCities: `${editData.majorCities}, ${editData.newCity.trim()}`,
                            newCity: "",
                          });
                          e.preventDefault();
                        }
                      }}
                      className="flex-1 min-w-[150px] bg-transparent border-0 focus:ring-0 text-sm p-0"
                      placeholder="Type and press Enter to add..."
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Press Enter to add a new city</p>
                </div>
              </div>

              {/* Visual */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Visual</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <input
                      type="text"
                      name="icon"
                      value={editData.icon}
                      onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Icon emoji or symbol"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                    <select
                      name="color"
                      value={editData.color}
                      onChange={(e) => setEditData({ ...editData, color: e.target.value })}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="red">Red</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {selectedSector ? "Save Changes" : "Add Sector"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorCategory;
