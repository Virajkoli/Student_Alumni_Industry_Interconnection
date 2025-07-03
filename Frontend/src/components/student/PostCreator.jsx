import React, { useState } from "react";
import { Image, Video, FileText, MapPin, Users, X } from "lucide-react";

const PostCreator = () => {
  const [postText, setPostText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPollOptions, setShowPollOptions] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postText.trim()) {
      console.log("Posting:", postText);
      setPostText("");
      setIsExpanded(false);
      setShowPollOptions(false);
      setPollOptions(["", ""]);
    }
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture and Text Input */}
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            P
          </div>
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share your thoughts, achievements, or ask a question..."
              className="w-full border-none outline-none resize-none text-gray-700 placeholder-gray-500 text-sm"
              rows={isExpanded ? 3 : 1}
            />
            
            {/* Poll Options */}
            {showPollOptions && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Poll Options:</h4>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePollOption(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={addPollOption}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Option
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isExpanded && (
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                title="Add Image"
              >
                <Image className="w-4 h-4" />
                <span className="hidden sm:block">Photo</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                title="Add Video"
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:block">Video</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                title="Add Document"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:block">Document</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPollOptions(!showPollOptions)}
                className={`flex items-center gap-2 transition-colors text-sm ${
                  showPollOptions ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                title="Create Poll"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:block">Poll</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setPostText("");
                  setIsExpanded(false);
                  setShowPollOptions(false);
                  setPollOptions(["", ""]);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!postText.trim() && !(showPollOptions && pollOptions.some(opt => opt.trim()))}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostCreator;
