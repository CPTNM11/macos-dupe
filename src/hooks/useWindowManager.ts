"use client";

import { useReducer, useCallback } from "react";
import { AppId, WindowState } from "@/types";

type Action =
  | { type: "OPEN_WINDOW"; id: AppId }
  | { type: "CLOSE_WINDOW"; id: AppId }
  | { type: "FOCUS_WINDOW"; id: AppId }
  | { type: "MINIMIZE_WINDOW"; id: AppId }
  | { type: "TOGGLE_MAXIMIZE_WINDOW"; id: AppId }
  | { type: "UPDATE_POSITION"; id: AppId; position: { x: number; y: number } }
  | { type: "UPDATE_SIZE"; id: AppId; size: { width: number; height: number } };

const initialWindows: WindowState[] = [
  {
    id: "about",
    title: "About Me",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 80 },
    size: { width: 600, height: 400 },
    defaultPosition: { x: 100, y: 80 },
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: "projects",
    title: "Projects",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 150, y: 100 },
    size: { width: 700, height: 500 },
    defaultPosition: { x: 150, y: 100 },
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: "terminal",
    title: "Terminal",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 200, y: 120 },
    size: { width: 600, height: 400 },
    defaultPosition: { x: 200, y: 120 },
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: "safari",
    title: "Safari",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 120, y: 90 },
    size: { width: 700, height: 500 },
    defaultPosition: { x: 120, y: 90 },
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: "mail",
    title: "Mail",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 180, y: 110 },
    size: { width: 600, height: 450 },
    defaultPosition: { x: 180, y: 110 },
    defaultSize: { width: 600, height: 450 },
  },
];

function getMaxZIndex(windows: WindowState[]): number {
  return Math.max(0, ...windows.map((w) => w.zIndex));
}

function reducer(state: WindowState[], action: Action): WindowState[] {
  switch (action.type) {
    case "OPEN_WINDOW":
      return state.map((w) =>
        w.id === action.id
          ? {
              ...w,
              isOpen: true,
              isMinimized: false,
              zIndex: getMaxZIndex(state) + 1,
            }
          : w
      );
    case "CLOSE_WINDOW":
      return state.map((w) =>
        w.id === action.id
          ? { ...w, isOpen: false, isMinimized: false, isMaximized: false }
          : w
      );
    case "FOCUS_WINDOW":
      return state.map((w) =>
        w.id === action.id
          ? { ...w, zIndex: getMaxZIndex(state) + 1 }
          : w
      );
    case "MINIMIZE_WINDOW":
      return state.map((w) =>
        w.id === action.id ? { ...w, isMinimized: true } : w
      );
    case "TOGGLE_MAXIMIZE_WINDOW":
      return state.map((w) =>
        w.id === action.id
          ? {
              ...w,
              isMaximized: !w.isMaximized,
              position: !w.isMaximized ? { x: 0, y: 28 } : w.defaultPosition,
              size: !w.isMaximized
                ? { width: window.innerWidth, height: window.innerHeight - 28 }
                : w.defaultSize,
            }
          : w
      );
    case "UPDATE_POSITION":
      return state.map((w) =>
        w.id === action.id ? { ...w, position: action.position } : w
      );
    case "UPDATE_SIZE":
      return state.map((w) =>
        w.id === action.id ? { ...w, size: action.size } : w
      );
    default:
      return state;
  }
}

export function useWindowManager() {
  const [windows, dispatch] = useReducer(reducer, initialWindows);

  const openWindow = useCallback(
    (id: AppId) => dispatch({ type: "OPEN_WINDOW", id }),
    []
  );
  const closeWindow = useCallback(
    (id: AppId) => dispatch({ type: "CLOSE_WINDOW", id }),
    []
  );
  const focusWindow = useCallback(
    (id: AppId) => dispatch({ type: "FOCUS_WINDOW", id }),
    []
  );
  const minimizeWindow = useCallback(
    (id: AppId) => dispatch({ type: "MINIMIZE_WINDOW", id }),
    []
  );
  const toggleMaximizeWindow = useCallback(
    (id: AppId) => dispatch({ type: "TOGGLE_MAXIMIZE_WINDOW", id }),
    []
  );
  const updatePosition = useCallback(
    (id: AppId, position: { x: number; y: number }) =>
      dispatch({ type: "UPDATE_POSITION", id, position }),
    []
  );
  const updateSize = useCallback(
    (id: AppId, size: { width: number; height: number }) =>
      dispatch({ type: "UPDATE_SIZE", id, size }),
    []
  );

  const focusedWindow = [...windows]
    .filter((w) => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  return {
    windows,
    focusedWindow,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updatePosition,
    updateSize,
  };
}
