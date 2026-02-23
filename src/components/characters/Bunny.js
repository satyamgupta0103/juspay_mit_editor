import React from "react";

export default function Bunny({ message }) {
  return (
    <div className="relative select-none pointer-events-none">
      {message && (
        <div className="absolute -top-8 left-0 bg-white px-2 py-1 text-xs rounded shadow">
          {message}
        </div>
      )}

      <svg width="90" height="90" viewBox="0 0 100 100">
        <ellipse cx="35" cy="20" rx="8" ry="22" fill="#EEE" />
        <ellipse cx="65" cy="20" rx="8" ry="22" fill="#EEE" />
        <circle cx="50" cy="55" r="35" fill="#F5F5F5" />
        <circle cx="40" cy="50" r="4" />
        <circle cx="60" cy="50" r="4" />
        <circle cx="50" cy="65" r="6" fill="pink" />
      </svg>
    </div>
  );
}
