"use client";

import { useWindowManager } from "@/hooks/useWindowManager";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import AboutMe from "@/apps/AboutMe";
import Projects from "@/apps/Projects";
import Terminal from "@/apps/Terminal";
import Safari from "@/apps/Safari";
import Mail from "@/apps/Mail";
import { AppId } from "@/types";

const appComponents: Record<AppId, React.ReactNode> = {
  about: <AboutMe />,
  projects: <Projects />,
  terminal: <Terminal />,
  safari: <Safari />,
  mail: <Mail />,
};

export default function Desktop() {
  const {
    windows,
    focusedWindow,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updatePosition,
    updateSize,
  } = useWindowManager();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('/wallpaper.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Fallback gradient if no wallpaper image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] -z-10" />

      <MenuBar focusedAppTitle={focusedWindow?.title} />

      {windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={focusWindow}
          onDragStop={updatePosition}
          onResizeStop={(id, size, position) => {
            updateSize(id, size);
            updatePosition(id, position);
          }}
        >
          {appComponents[win.id]}
        </Window>
      ))}

      <Dock windows={windows} openWindow={openWindow} />
    </div>
  );
}
