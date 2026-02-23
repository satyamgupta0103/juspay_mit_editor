import React from "react";

export default function Panda({ message }) {
  return (
    <div className="relative select-none pointer-events-none">
      {message && (
        <div className="absolute -top-8 left-0 bg-white px-2 py-1 text-xs rounded shadow">
          {message}
        </div>
      )}

      <svg width="90" height="90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="#FFF"
          stroke="#000"
          strokeWidth="4"
        />
        <circle cx="35" cy="45" r="10" fill="#000" />
        <circle cx="65" cy="45" r="10" fill="#000" />
        <circle cx="40" cy="50" r="4" fill="#FFF" />
        <circle cx="60" cy="50" r="4" fill="#FFF" />
        <ellipse cx="50" cy="65" rx="10" ry="6" fill="#000" />
      </svg>
    </div>
  );
}
