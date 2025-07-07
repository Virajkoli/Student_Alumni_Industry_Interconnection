import React, { useState, useRef } from "react";
import { Image, Video, FileText, MapPin, Users, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const PostCreator = ({ onPostCreated }) => {
  const [postText, setPostText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPollOptions, setShowPollOptions] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postText.trim() && selectedFiles.length === 0) {
      alert("Please add some content or media to your post");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add text content
      if (postText.trim()) {
        formData.append("content", postText);
      }

      // Add poll options if any
      if (showPollOptions && pollOptions.some((opt) => opt.trim())) {
        formData.append(
          "pollOptions",
          JSON.stringify(pollOptions.filter((opt) => opt.trim()))
        );
      }

      // Add media files
      selectedFiles.forEach((file) => {
        formData.append("media", file);
      });

      // Make API call
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      console.log("Post created successfully:", data);

      // Reset form
      setPostText("");
      setIsExpanded(false);
      setShowPollOptions(false);
      setPollOptions(["", ""]);
      setSelectedFiles([]);

      // Notify parent component
      if (onPostCreated) {
        onPostCreated(data);
      }

      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(`Failed to create post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
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

  const handleFileSelect = (type) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept =
        type === "image" ? "image/*" : type === "video" ? "video/*" : "*/*";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getUserInitials = () => {
    if (user && user.fullName) {
      return user.fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture and Text Input */}
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {getUserInitials()}
          </div>
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share your thoughts, achievements, or ask a question..."
              className="w-full border-none outline-none resize-none text-gray-700 placeholder-gray-500 text-sm"
              rows={isExpanded ? 3 : 1}
              disabled={isSubmitting}
            />

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Selected Files:
                </h4>
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 flex-1">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      disabled={isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Poll Options */}
            {showPollOptions && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Poll Options:
                </h4>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSubmitting}
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePollOption(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                onClick={() => handleFileSelect("image")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                title="Add Image"
                disabled={isSubmitting}
              >
                <Image className="w-4 h-4" />
                <span className="hidden sm:block">Photo</span>
              </button>
              <button
                type="button"
                onClick={() => handleFileSelect("video")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                title="Add Video"
                disabled={isSubmitting}
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:block">Video</span>
              </button>
              <button
                type="button"
                onClick={() => handleFileSelect("document")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                title="Add Document"
                disabled={isSubmitting}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:block">Document</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPollOptions(!showPollOptions)}
                className={`flex items-center gap-2 transition-colors text-sm ${
                  showPollOptions
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                title="Create Poll"
                disabled={isSubmitting}
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
                  setSelectedFiles([]);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  (!postText.trim() &&
                    selectedFiles.length === 0 &&
                    !(
                      showPollOptions && pollOptions.some((opt) => opt.trim())
                    )) ||
                  isSubmitting
                }
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
      />
    </div>
  );
};

export default PostCreator;
