'use client'

import { useRef, useCallback } from 'react'

interface WindowProps {
  title: string
  emoji: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  isActive: boolean
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onMove: (position: { x: number; y: number }) => void
  children: React.ReactNode
}

export default function Window({
  title, emoji, isMinimized, isMaximized,
  position, size, zIndex, isActive,
  onFocus, onClose, onMinimize, onMaximize, onMove,
  children,
}: WindowProps) {
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null)

  const handleTitlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    if (isMaximized) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, winX: position.x, winY: position.y }
    onFocus()
  }, [isMaximized, position, onFocus])

  const handleTitlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    onMove({
      x: Math.max(0, dragRef.current.winX + e.clientX - dragRef.current.startX),
      y: Math.max(28, dragRef.current.winY + e.clientY - dragRef.current.startY),
    })
  }, [onMove])

  const handleTitlePointerUp = useCallback(() => {
    dragRef.current = null
  }, [])

  if (isMinimized) return null

  const style: React.CSSProperties = isMaximized
    ? { position: 'absolute', top: 28, left: 0, width: '100%', height: 'calc(100vh - 28px - 80px)', zIndex }
    : { position: 'absolute', top: position.y, left: position.x, width: size.width, height: size.height, zIndex }

  return (
    <div
      style={style}
      className="flex flex-col rounded-xl overflow-hidden shadow-2xl border border-black/10"
      onPointerDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={`relative flex items-center h-9 px-3 select-none cursor-default transition-colors ${
          isActive ? 'bg-[#ebebeb]' : 'bg-[#d8d8d8]'
        }`}
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
        onDoubleClick={onMaximize}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 z-10">
          <button
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 flex items-center justify-center group flex-shrink-0"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onClose() }}
            title="Close"
          >
            <span className="hidden group-hover:block text-[7px] text-[#4d0000] font-bold leading-none">✕</span>
          </button>
          <button
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 flex items-center justify-center group flex-shrink-0"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onMinimize() }}
            title="Minimize"
          >
            <span className="hidden group-hover:block text-[7px] text-[#4d3300] font-bold leading-none">−</span>
          </button>
          <button
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 flex items-center justify-center group flex-shrink-0"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onMaximize() }}
            title="Maximize"
          >
            <span className="hidden group-hover:block text-[7px] text-[#003d00] font-bold leading-none">+</span>
          </button>
        </div>
        {/* Centered title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-xs font-medium flex items-center gap-1.5 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
            <span>{emoji}</span>
            <span>{title}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
