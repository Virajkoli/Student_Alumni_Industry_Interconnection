import React, { useState } from "react";
import { Edit3, Building2, TrendingUp, MapPin, Users } from "lucide-react";

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
      icon: "🏭",
      color: "blue",
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
      icon: "💻",
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
      icon: "🏥",
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
      icon: "💰",
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
      icon: "🌱",
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
      icon: "🚗",
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

  const handleEdit = (sector) => {
    setEditingId(sector.id);
    setEditData({
      name: sector.name,
      description: sector.description,
      companies: sector.companies.toString(),
      employment: sector.employment,
      growth: sector.growth,
      majorCities: sector.majorCities.join(", "),
      color: sector.color,
    });
  };

  const handleSave = () => {
    setSectors(
      sectors.map((sector) =>
        sector.id === editingId
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
    setEditingId(null);
    setEditData({
      name: "",
      description: "",
      companies: "",
      employment: "",
      growth: "",
      majorCities: "",
      color: "blue",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      name: "",
      description: "",
      companies: "",
      employment: "",
      growth: "",
      majorCities: "",
      color: "blue",
    });
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Industry Sectors & Categories
          </h2>
          <p className="text-gray-600 mt-1">
            Explore different sectors and their market dynamics
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Sector
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editingId === sector.id ? (
              // Edit Mode
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sector Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Companies
                      </label>
                      <input
                        type="number"
                        value={editData.companies}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            companies: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employment
                      </label>
                      <input
                        type="text"
                        value={editData.employment}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            employment: e.target.value,
                          })
                        }
                        placeholder="e.g., 5.2M"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Growth Rate
                    </label>
                    <input
                      type="text"
                      value={editData.growth}
                      onChange={(e) =>
                        setEditData({ ...editData, growth: e.target.value })
                      }
                      placeholder="e.g., +12%"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Major Cities (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editData.majorCities}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          majorCities: e.target.value,
                        })
                      }
                      placeholder="Mumbai, Chennai, Pune"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Theme
                    </label>
                    <select
                      value={editData.color}
                      onChange={(e) =>
                        setEditData({ ...editData, color: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="purple">Purple</option>
                      <option value="emerald">Emerald</option>
                      <option value="orange">Orange</option>
                    </select>
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                {/* Header with gradient */}
                <div
                  className={`h-24 bg-gradient-to-r ${getColorClasses(
                    sector.color
                  )} rounded-t-xl relative`}
                >
                  <button
                    onClick={() => handleEdit(sector)}
                    className="absolute top-3 right-3 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    title="Edit Sector"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <div className="absolute -bottom-6 left-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                      {sector.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {sector.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {sector.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Companies</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {sector.companies.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          Employment
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {sector.employment}
                      </p>
                    </div>
                  </div>

                  {/* Growth */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">
                        {sector.growth}
                      </span>
                    </div>
                  </div>

                  {/* Major Cities */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Major Hubs
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sector.majorCities.map((city, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overall Statistics */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sector Overview Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {sectors
                .reduce((sum, s) => sum + s.companies, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Companies</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">19.6M</p>
            <p className="text-sm text-gray-600">Total Employment</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {sectors.length}
            </p>
            <p className="text-sm text-gray-600">Active Sectors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">+15.2%</p>
            <p className="text-sm text-gray-600">Avg Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorCategory;
