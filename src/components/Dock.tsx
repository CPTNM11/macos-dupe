'use client'

import { useState } from 'react'

export interface DockApp {
  id: string
  emoji: string
  label: string
  isOpen: boolean
}

interface DockProps {
  apps: DockApp[]
  onOpen: (id: string) => void
}

export default function Dock({ apps, onOpen }: DockProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const getScale = (i: number) => {
    if (hovered === null) return 1
    const d = Math.abs(i - hovered)
    if (d === 0) return 1.55
    if (d === 1) return 1.25
    if (d === 2) return 1.08
    return 1
  }

  const getTranslateY = (i: number) => {
    if (hovered === null) return 0
    const d = Math.abs(i - hovered)
    if (d === 0) return -10
    if (d === 1) return -5
    if (d === 2) return -2
    return 0
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-end gap-1.5 px-3 py-2 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {apps.map((app, i) => (
          <div
            key={app.id}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onOpen(app.id)}
          >
            {/* Tooltip */}
            <div
              className={`absolute bottom-full mb-2 px-2 py-0.5 bg-black/80 text-white text-[11px] font-medium rounded-md whitespace-nowrap pointer-events-none transition-all duration-100 ${
                hovered === i ? 'opacity-100 -translate-y-0' : 'opacity-0 translate-y-1'
              }`}
              style={{
                   transform: `scale(${getScale(i)}) translateY(${getTranslateY(i)}px) translateY(-10px)`,
                 }}
            >
              {app.label}
            </div>
            {/* Icon */}
            <div
              className="flex items-center justify-center w-14 h-14 rounded-2xl cursor-pointer transition-all duration-150 ease-out"
              style={{
                transform: `scale(${getScale(i)}) translateY(${getTranslateY(i)}px)`,
                transformOrigin: 'bottom center',
                fontSize: 32,
              }}
            >
              {app.emoji}
            </div>
            {/* Open dot */}
            <div className={`w-1 h-1 rounded-full mt-0.5 transition-opacity ${app.isOpen ? 'bg-white/80 opacity-100' : 'opacity-0'}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
