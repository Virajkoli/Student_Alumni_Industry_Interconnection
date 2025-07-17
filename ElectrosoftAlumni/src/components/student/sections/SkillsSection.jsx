import React, { useState } from "react";
import { Edit, Plus, X, Code } from "lucide-react";
import { studentAPI } from "../../../services/apiService";

const SkillsSection = ({ skills = [], onSkillsUpdate, studentId, isOwner }) => {
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const suggestedSkills = [
    {
      category: "Frontend",
      skills: [
        "React.js",
        "Git",
        "AngularJS",
        "Databases",
        "Software Development",
      ],
    },
    {
      category: "Programming",
      skills: ["Data Structures", "C#", "Object-Oriented Programming (OOP)"],
    },
    { category: "Web", skills: ["Responsive Web Design", "Web Development"] },
  ];

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    if (skillInput.trim()) {
      try {
        await studentAPI.addSkill(studentId, {
          skill_name: skillInput.trim(),
          proficiency: "Beginner",
        });
        setSkillInput("");
        setShowSkillModal(false);
        // Reload the page to reflect changes
        window.location.reload();
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  const handleAddSuggestedSkill = async (skill) => {
    try {
      await studentAPI.addSkill(studentId, {
        skill_name: skill,
        proficiency: "Beginner",
      });
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const skillId =
        typeof skillToRemove === "object"
          ? skillToRemove.id
          : skills.find((s) => (s.skill_name || s) === skillToRemove)?.id;

      if (skillId) {
        await studentAPI.deleteSkill(studentId, skillId);
      }
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error removing skill:", error);
    }
  };

  // Helper function to get skill name from skill object or string
  const getSkillName = (skill) => {
    return typeof skill === "object" ? skill.skill_name : skill;
  };

  // Helper function to get all skill names for comparison
  const getSkillNames = () => {
    return skills.map((skill) => getSkillName(skill));
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
            Skills
          </h2>
          {isOwner && (
            <button
              onClick={() => setShowSkillModal(true)}
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
              title="Add skill"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {skills.length === 0 ? (
            <div className="text-center py-8">
              <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No skills added yet</p>
              {isOwner && (
                <button
                  onClick={() => setShowSkillModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Add your skills
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={skill.id || index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {getSkillName(skill)}
                  {isOwner && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Suggested Skills */}
          {skills.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Suggested skills based on your profile
              </h3>
              <div className="space-y-3">
                {suggestedSkills.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">
                      {category.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills
                        .filter((skill) => !getSkillNames().includes(skill))
                        .map((skill, skillIndex) => (
                          <button
                            key={skillIndex}
                            onClick={() => handleAddSuggestedSkill(skill)}
                            className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50 transition-colors"
                          >
                            + {skill}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-md"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6" style={{ borderBottom: "1px solid #DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Add Skill
                </h2>
                <button
                  onClick={() => setShowSkillModal(false)}
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

            <form onSubmit={handleSkillSubmit} className="p-6">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Skill *
                </label>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 outline-none transition-colors"
                  style={{
                    backgroundColor: "#F7FAFC",
                    border: "1px solid #DCE8F2",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#DCE8F2")}
                  placeholder="e.g. JavaScript, React, Python"
                  required
                />
              </div>

              {/* Suggested Skills in Modal */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Or choose from suggestions:
                </h3>
                <div className="space-y-3">
                  {suggestedSkills.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h4 className="text-xs font-medium text-gray-600 mb-2">
                        {category.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.skills
                          .filter((skill) => !getSkillNames().includes(skill))
                          .map((skill, skillIndex) => (
                            <button
                              key={skillIndex}
                              type="button"
                              onClick={() => {
                                handleAddSuggestedSkill(skill);
                                setShowSkillModal(false);
                              }}
                              className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50 transition-colors"
                            >
                              + {skill}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SkillsSection;
