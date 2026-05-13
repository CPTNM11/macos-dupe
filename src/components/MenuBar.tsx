'use client'

import { useEffect, useState } from 'react'

interface MenuBarProps {
  activeApp: string
}

export default function MenuBar({ activeApp }: MenuBarProps) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-2xl flex items-center px-4 z-[100] text-white text-xs select-none border-b border-white/10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">🍎</span>
        <span className="font-semibold text-white">{activeApp}</span>
        {['File', 'Edit', 'View', 'Window'].map(item => (
          <span key={item} className="text-white/70 hover:text-white cursor-default transition-colors hidden sm:block">
            {item}
          </span>
        ))}
      </div>
      {/* Right */}
      <div className="flex items-center gap-3 ml-auto text-white/80">
        <span title="WiFi">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 8.5C5.1 4.9 9.8 3 12 3s6.9 1.9 10.5 5.5l-1.4 1.4C17.9 6.7 14.9 5 12 5S6.1 6.7 2.9 9.9L1.5 8.5z"/>
            <path d="M4.5 11.5C7.1 8.9 9.5 7.5 12 7.5s4.9 1.4 7.5 4l-1.4 1.4C16 10.7 14 9.5 12 9.5s-4 1.2-6.1 3.4L4.5 11.5z"/>
            <path d="M7.5 14.5C9 13 10.4 12.5 12 12.5s3 .5 4.5 2l-1.4 1.4C14 14.7 13.1 14.5 12 14.5s-2 .2-3.1 1.4L7.5 14.5z"/>
            <circle cx="12" cy="19" r="1.5"/>
          </svg>
        </span>
        <span title="Batterie">
          <svg width="18" height="12" viewBox="0 0 24 16" fill="currentColor" opacity="0.8">
            <rect x="1" y="2" width="19" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="20" y="5" width="3" height="6" rx="1" fill="currentColor" opacity="0.5"/>
            <rect x="2.5" y="3.5" width="15" height="9" rx="1" fill="currentColor"/>
          </svg>
        </span>
        <span className="font-medium tabular-nums">{time}</span>
      </div>
    </div>
  )
}
