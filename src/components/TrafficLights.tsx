"use client";

import { useState } from "react";

interface TrafficLightsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export default function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
}: TrafficLightsProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClose}
        className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:brightness-90 transition-all"
      >
        {hovered && (
          <svg className="w-2 h-2 text-[#4d0000]" viewBox="0 0 10 10">
            <path
              d="M1 1l8 8M9 1l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        )}
      </button>
      <button
        onClick={onMinimize}
        className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dea123] flex items-center justify-center hover:brightness-90 transition-all"
      >
        {hovered && (
          <svg className="w-2 h-2 text-[#995700]" viewBox="0 0 10 10">
            <path d="M1 5h8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </button>
      <button
        onClick={onMaximize}
        className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center hover:brightness-90 transition-all"
      >
        {hovered && (
          <svg className="w-2 h-2 text-[#006500]" viewBox="0 0 10 10">
            <path
              d="M1 3.5L5 0.5L9 3.5M1 6.5L5 9.5L9 6.5"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
