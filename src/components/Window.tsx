"use client";

import dynamic from "next/dynamic";
import TrafficLights from "./TrafficLights";
import { WindowState, AppId } from "@/types";

const Rnd = dynamic(() => import("react-rnd").then((mod) => mod.Rnd), {
  ssr: false,
});

interface WindowProps {
  window: WindowState;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onDragStop: (id: AppId, position: { x: number; y: number }) => void;
  onResizeStop: (
    id: AppId,
    size: { width: number; height: number },
    position: { x: number; y: number }
  ) => void;
  children: React.ReactNode;
}

export default function Window({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragStop,
  onResizeStop,
  children,
}: WindowProps) {
  if (!win.isOpen || win.isMinimized) return null;

  return (
    <Rnd
      position={win.position}
      size={win.size}
      minWidth={300}
      minHeight={200}
      style={{ zIndex: win.zIndex }}
      dragHandleClassName="window-drag-handle"
      onMouseDown={() => onFocus(win.id)}
      onDragStop={(_e, d) => onDragStop(win.id, { x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, position) =>
        onResizeStop(
          win.id,
          { width: ref.offsetWidth, height: ref.offsetHeight },
          position
        )
      }
      disableDragging={win.isMaximized}
      enableResizing={!win.isMaximized}
    >
      <div className="flex flex-col w-full h-full rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
        {/* Title bar */}
        <div className="window-drag-handle flex items-center h-12 bg-[#2d2d2d] px-4 select-none shrink-0">
          <TrafficLights
            onClose={() => onClose(win.id)}
            onMinimize={() => onMinimize(win.id)}
            onMaximize={() => onMaximize(win.id)}
          />
          <span className="flex-1 text-center text-sm text-gray-300 font-medium">
            {win.title}
          </span>
          <div className="w-14" />
        </div>
        {/* Content */}
        <div className="flex-1 bg-[#1e1e1e] overflow-auto">{children}</div>
      </div>
    </Rnd>
  );
}
