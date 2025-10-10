import React from "react";

export default function ChatMessage({ name, message, profileImageUrl }) {
  return (
    <div className="flex items-start p-2 my-1 bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-lg shadow-sm transition-colors duration-150">
      <img
        src={
          profileImageUrl ||
          "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        }
        alt="user"
        className="h-8 w-8 rounded-full mr-3 border border-gray-700 shadow-sm"
      />
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-indigo-400">{name}</span>
        <span className="text-sm text-gray-200 break-words leading-relaxed">
          {message}
        </span>
      </div>
    </div>
  );
}
