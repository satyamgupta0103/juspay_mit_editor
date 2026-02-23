import React from "react";

export default function Dog({ message }) {
  return (
    <div className="relative select-none pointer-events-none">
      {message && (
        <div className="absolute -top-8 left-0 bg-white px-2 py-1 text-xs rounded shadow">
          {message}
        </div>
      )}

      <svg width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#8B5A2B" />
        <ellipse cx="30" cy="35" rx="10" ry="18" fill="#5A3A1B" />
        <ellipse cx="70" cy="35" rx="10" ry="18" fill="#5A3A1B" />
        <circle cx="40" cy="50" r="5" />
        <circle cx="60" cy="50" r="5" />
        <ellipse cx="50" cy="65" rx="15" ry="8" fill="#000" />
      </svg>
    </div>
  );
}
