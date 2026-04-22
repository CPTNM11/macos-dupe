"use client";

import { DockItem } from "@/types";

interface DockIconProps {
  item: DockItem;
  isOpen: boolean;
  onClick: () => void;
}

export default function DockIcon({ item, isOpen, onClick }: DockIconProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center"
    >
      {/* Tooltip */}
      <span className="absolute -top-8 bg-gray-800/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {item.label}
      </span>
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-700/60 backdrop-blur-sm border border-white/10 transition-transform duration-200 group-hover:scale-125 group-hover:-translate-y-2">
        {item.icon}
      </div>
      {/* Open indicator */}
      {isOpen && (
        <div className="w-1 h-1 rounded-full bg-white/80 mt-1 absolute -bottom-2" />
      )}
    </button>
  );
}
