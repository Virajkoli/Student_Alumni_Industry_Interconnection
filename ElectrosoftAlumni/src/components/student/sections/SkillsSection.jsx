import React, { useState } from "react";
import { Edit, Plus, X, Code } from "lucide-react";

const SkillsSection = ({ skills = [], onSkillsUpdate }) => {
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

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      onSkillsUpdate(prev => [...prev, skillInput.trim()]);
      setSkillInput("");
      setShowSkillModal(false);
    }
  };

  const handleAddSuggestedSkill = (skill) => {
    if (!skills.includes(skill)) {
      onSkillsUpdate(prev => [...prev, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onSkillsUpdate(prev => prev.filter(skill => skill !== skillToRemove));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
          <button
            onClick={() => setShowSkillModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Add skill"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {skills.length === 0 ? (
            <div className="text-center py-8">
              <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No skills added yet</p>
              <button
                onClick={() => setShowSkillModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your skills
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
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
                        .filter(skill => !skills.includes(skill))
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add Skill
                </h2>
                <button
                  onClick={() => setShowSkillModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSkillSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill *
                </label>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                          .filter(skill => !skills.includes(skill))
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
