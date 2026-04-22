"use client";

import DockIcon from "./DockIcon";
import { AppId, DockItem, WindowState } from "@/types";

const dockItems: DockItem[] = [
  { id: "about", label: "About Me", icon: "👤" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "terminal", label: "Terminal", icon: "🖥️" },
  { id: "safari", label: "Safari", icon: "🧭" },
  { id: "mail", label: "Mail", icon: "✉️" },
];

interface DockProps {
  windows: WindowState[];
  openWindow: (id: AppId) => void;
}

export default function Dock({ windows, openWindow }: DockProps) {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <div className="flex items-end gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
        {dockItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            isOpen={windows.find((w) => w.id === item.id)?.isOpen ?? false}
            onClick={() => openWindow(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
