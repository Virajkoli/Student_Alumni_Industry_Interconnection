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
      blue: {
        gradient: "from-blue-500 to-blue-600",
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "group-hover:bg-blue-100",
      },
      green: {
        gradient: "from-green-500 to-green-600",
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        hover: "group-hover:bg-green-100",
      },
      red: {
        gradient: "from-red-500 to-red-600",
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-200",
        hover: "group-hover:bg-red-100",
      },
      purple: {
        gradient: "from-purple-500 to-purple-600",
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        hover: "group-hover:bg-purple-100",
      },
      emerald: {
        gradient: "from-emerald-500 to-emerald-600",
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-200",
        hover: "group-hover:bg-emerald-100",
      },
      orange: {
        gradient: "from-orange-500 to-orange-600",
        bg: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "group-hover:bg-orange-100",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style={{ backgroundColor: "#F7FAFC" }}>
      {/* Header Section - Clean and Professional */}
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#1F2D3D" }}>Industry Sectors</h2>
            
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
            style={{ backgroundColor: "#6EA9CB" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#5a8fa8"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#6EA9CB"}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Sector
          </button>
        </div>
        
       
      </div>

      {/* Sectors Grid - 2 cards per row */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="rounded-xl border transition-all duration-200 group"
            style={{ 
              backgroundColor: "white",
              borderColor: "#B5D3E7"
            }}
            onMouseEnter={(e) => e.target.style.borderColor = "#6EA9CB"}
            onMouseLeave={(e) => e.target.style.borderColor = "#B5D3E7"}
          >
            {/* Card Header */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="text-3xl p-3 rounded-lg" style={{ backgroundColor: "#DCE8F2" }}>{sector.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
                      {sector.name}
                    </h3>
                    <div className="inline-flex items-center mt-2 text-sm font-medium px-2.5 py-1 rounded-full" style={{ color: "#1F2D3D", backgroundColor: "#DCE8F2" }}>
                      <TrendingUp className="w-4 h-4 mr-1.5" />
                      {sector.growth} Growth
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleEditClick(sector)}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: "#1F2D3D", opacity: "0.6" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#6EA9CB";
                    e.target.style.backgroundColor = "#DCE8F2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#1F2D3D";
                    e.target.style.opacity = "0.6";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm leading-relaxed border-t pt-4" style={{ color: "#1F2D3D", opacity: "0.7", borderColor: "#DCE8F2" }}>
                {sector.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" style={{ color: "#1F2D3D", opacity: "0.4" }} />
                  <div>
                    <div className="text-lg font-semibold" style={{ color: "#1F2D3D" }}>
                      {sector.companies.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: "#1F2D3D", opacity: "0.5" }}>Companies</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: "#1F2D3D", opacity: "0.4" }} />
                  <div>
                    <div className="text-lg font-semibold" style={{ color: "#1F2D3D" }}>
                      {sector.employment}
                    </div>
                    <div className="text-xs" style={{ color: "#1F2D3D", opacity: "0.5" }}>Employees</div>
                  </div>
                </div>
              </div>

              {/* Major Cities */}
              <div className="border-t pt-4" style={{ borderColor: "#DCE8F2" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4" style={{ color: "#1F2D3D", opacity: "0.4" }} />
                  <span className="text-sm font-medium" style={{ color: "#1F2D3D" }}>Major Hubs</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sector.majorCities.map((city, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm transition-colors duration-200"
                      style={{ backgroundColor: "#DCE8F2", color: "#1F2D3D" }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#B5D3E7"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#DCE8F2"}
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Keep existing modal code but update styling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "white" }}>
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
                  {selectedSector ? "Edit Sector" : "Add New Sector"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: "#1F2D3D", opacity: "0.4" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#6EA9CB";
                    e.target.style.backgroundColor = "#DCE8F2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#1F2D3D";
                    e.target.style.opacity = "0.4";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Fields - Modern, clean styling */}
            <form className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium" style={{ color: "#1F2D3D" }}>Basic Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#1F2D3D" }}>Sector Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{ 
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#6EA9CB"}
                      onBlur={(e) => e.target.style.borderColor = "#B5D3E7"}
                      placeholder="e.g., Technology"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#1F2D3D" }}>Growth Rate</label>
                    <input
                      type="text"
                      name="growth"
                      value={editData.growth}
                      onChange={(e) => setEditData({ ...editData, growth: e.target.value })}
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{ 
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#6EA9CB"}
                      onBlur={(e) => e.target.style.borderColor = "#B5D3E7"}
                      placeholder="e.g., 12.5%"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#1F2D3D" }}>Description</label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg shadow-sm outline-none"
                    style={{ 
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                      border: "1px solid #B5D3E7"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#6EA9CB"}
                    onBlur={(e) => e.target.style.borderColor = "#B5D3E7"}
                    placeholder="Brief description of the sector..."
                  />
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
                className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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
