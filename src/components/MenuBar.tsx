"use client";

import { useEffect, useState } from "react";

interface MenuBarProps {
  focusedAppTitle?: string;
}

export default function MenuBar({ focusedAppTitle }: MenuBarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-xl flex items-center justify-between px-4 z-[9999] select-none">
      <div className="flex items-center gap-4">
        {/* Apple logo */}
        <span className="text-white/90 text-sm font-medium">&#63743;</span>
        <span className="text-white/90 text-sm font-semibold">
          {focusedAppTitle || "Finder"}
        </span>
      </div>
      <div className="flex items-center gap-3 text-white/80 text-xs">
        <span>{time}</span>
      </div>
    </div>
  );
}
