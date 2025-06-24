import React, { useState } from "react";
import { Camera, Video, FileText, Smile } from "lucide-react";

const PostCreator = () => {
  const [postText, setPostText] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          I
        </div>
        <div className="flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share industry news, jobs, or updates..."
            className="w-full min-h-[60px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            rows="3"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Camera className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Photo</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Video className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Video</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Document</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Smile className="w-4 h-4" />
              </button>
            </div>
            <button
              disabled={!postText.trim()}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                postText.trim()
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
