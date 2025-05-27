import React from "react";

const VoiceAssistantPanel = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Voice Assistant</h3>
        <button className="text-gray-400 hover:text-white">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
        <p className="text-sm">Listening...</p>
      </div>
      <div>
        <p className="text-sm text-yellow-300">Suggestion: Ask if there are any fires nearby.</p>
      </div>
    </div>
  );
};

export default VoiceAssistantPanel;