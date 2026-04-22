export type AppId = "about" | "projects" | "terminal" | "safari" | "mail";

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

export interface DockItem {
  id: AppId;
  label: string;
  icon: string;
}
