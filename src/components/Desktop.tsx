'use client'

import { useState, useCallback } from 'react'
import MenuBar from './MenuBar'
import Dock from './Dock'
import Window from './Window'
import AboutApp from './apps/AboutApp'
import ProjectsApp from './apps/ProjectsApp'
import SkillsApp from './apps/SkillsApp'
import ContactApp from './apps/ContactApp'
import TerminalApp from './apps/TerminalApp'

type AppId = 'about' | 'projects' | 'skills' | 'contact' | 'terminal'

interface AppWindow {
  id: AppId
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

const APP_META: Record<AppId, {
  title: string
  emoji: string
  label: string
  defaultSize: { width: number; height: number }
  defaultPos: { x: number; y: number }
}> = {
  about: {
    title: 'About Me',
    emoji: '🧑‍💻',
    label: 'About',
    defaultSize: { width: 320, height: 430 },
    defaultPos: { x: 80, y: 60 },
  },
  projects: {
    title: 'Projects',
    emoji: '📁',
    label: 'Projects',
    defaultSize: { width: 420, height: 500 },
    defaultPos: { x: 180, y: 80 },
  },
  skills: {
    title: 'Skills',
    emoji: '⚡',
    label: 'Skills',
    defaultSize: { width: 360, height: 420 },
    defaultPos: { x: 260, y: 70 },
  },
  contact: {
    title: 'Contact',
    emoji: '✉️',
    label: 'Contact',
    defaultSize: { width: 320, height: 360 },
    defaultPos: { x: 360, y: 90 },
  },
  terminal: {
    title: 'Terminal',
    emoji: '⌨️',
    label: 'Terminal',
    defaultSize: { width: 520, height: 320 },
    defaultPos: { x: 460, y: 60 },
  },
}

const INITIAL_WINDOWS: AppWindow[] = [
  { id: 'about',    isOpen: true,  isMinimized: false, isMaximized: false, position: APP_META.about.defaultPos,    size: APP_META.about.defaultSize,    zIndex: 12 },
  { id: 'terminal', isOpen: true,  isMinimized: false, isMaximized: false, position: APP_META.terminal.defaultPos, size: APP_META.terminal.defaultSize, zIndex: 11 },
  { id: 'projects', isOpen: false, isMinimized: false, isMaximized: false, position: APP_META.projects.defaultPos, size: APP_META.projects.defaultSize, zIndex: 10 },
  { id: 'skills',   isOpen: false, isMinimized: false, isMaximized: false, position: APP_META.skills.defaultPos,   size: APP_META.skills.defaultSize,   zIndex: 9 },
  { id: 'contact',  isOpen: false, isMinimized: false, isMaximized: false, position: APP_META.contact.defaultPos,  size: APP_META.contact.defaultSize,  zIndex: 8 },
]

function renderApp(id: AppId) {
  switch (id) {
    case 'about':    return <AboutApp />
    case 'projects': return <ProjectsApp />
    case 'skills':   return <SkillsApp />
    case 'contact':  return <ContactApp />
    case 'terminal': return <TerminalApp />
  }
}

export default function Desktop() {
  const [windows, setWindows] = useState<AppWindow[]>(INITIAL_WINDOWS)
  const [activeId, setActiveId] = useState<AppId | null>('about')
  const [zTop, setZTop] = useState(13)

  const bringToFront = useCallback((id: AppId) => {
    setZTop(z => {
      const next = z + 1
      setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: next } : w))
      return next
    })
    setActiveId(id)
  }, [])

  const openApp = useCallback((id: AppId) => {
    setWindows(ws => ws.map(w => {
      if (w.id !== id) return w
      if (w.isOpen && !w.isMinimized) return w
      return { ...w, isOpen: true, isMinimized: false }
    }))
    bringToFront(id)
  }, [bringToFront])

  const closeApp = useCallback((id: AppId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w))
    setActiveId(null)
  }, [])

  const minimizeApp = useCallback((id: AppId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isMinimized: true } : w))
    setActiveId(null)
  }, [])

  const maximizeApp = useCallback((id: AppId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
  }, [])

  const moveApp = useCallback((id: AppId, position: { x: number; y: number }) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, position } : w))
  }, [])

  const dockApps = (Object.keys(APP_META) as AppId[]).map(id => ({
    id,
    emoji: APP_META[id].emoji,
    label: APP_META[id].label,
    isOpen: windows.find(w => w.id === id)?.isOpen ?? false,
  }))

  const activeTitle = activeId ? APP_META[activeId].title : 'Bureau'

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0b0b1a 0%, #1a0533 18%, #2d0f6b 36%, #5a2d82 54%, #b83266 72%, #e05a2b 86%, #f0932b 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl" />
      </div>

      <MenuBar activeApp={activeTitle} />

      {/* Windows layer */}
      <div className="absolute inset-0 overflow-hidden">
        {windows.map(win => {
          if (!win.isOpen) return null
          const meta = APP_META[win.id]
          return (
            <Window
              key={win.id}
              title={meta.title}
              emoji={meta.emoji}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              position={win.position}
              size={win.size}
              zIndex={win.zIndex}
              isActive={activeId === win.id}
              onFocus={() => bringToFront(win.id)}
              onClose={() => closeApp(win.id)}
              onMinimize={() => minimizeApp(win.id)}
              onMaximize={() => maximizeApp(win.id)}
              onMove={pos => moveApp(win.id, pos)}
            >
              {renderApp(win.id)}
            </Window>
          )
        })}
      </div>

      <Dock apps={dockApps} onOpen={id => openApp(id as AppId)} />
    </div>
  )
}
