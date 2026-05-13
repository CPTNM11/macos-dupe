'use client'

import { useEffect, useState } from 'react'

const LINES = [
  { text: 'Last login: ' + new Date().toDateString(), color: 'text-gray-500', delay: 0 },
  { text: '', color: '', delay: 200 },
  { text: 'william@portfolio ~ % whoami', color: 'text-green-400', delay: 400 },
  { text: 'william — full-stack developer 👨‍💻', color: 'text-gray-200', delay: 700 },
  { text: '', color: '', delay: 900 },
  { text: 'william@portfolio ~ % cat about.txt', color: 'text-green-400', delay: 1100 },
  { text: 'Building the web, one commit at a time.', color: 'text-gray-200', delay: 1400 },
  { text: 'Open to work: ✅', color: 'text-gray-200', delay: 1600 },
  { text: '', color: '', delay: 1800 },
  { text: 'william@portfolio ~ % ls projects/', color: 'text-green-400', delay: 2000 },
  { text: '\x1b[34mportfolio-os/\x1b[0m  \x1b[34me-commerce/\x1b[0m  \x1b[34mai-powered fitness app/\x1b[0m', color: 'text-blue-400', delay: 2300 },
  { text: '', color: '', delay: 2500 },
  { text: 'william@portfolio ~ % echo $STATUS', color: 'text-green-400', delay: 2700 },
  { text: 'Available for new opportunities !', color: 'text-yellow-300', delay: 3000 },
  { text: '', color: '', delay: 3200 },
  { text: 'william@portfolio ~ % █', color: 'text-green-400', delay: 3400 },
]

export default function TerminalApp() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= LINES.length) return
    const next = LINES[visible]
    const timer = setTimeout(() => setVisible(v => v + 1), next.delay === 0 ? 0 : (LINES[visible]?.delay ?? 200) - (LINES[visible - 1]?.delay ?? 0))
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <div className="h-full bg-[#1e1e1e] p-4 font-mono text-sm overflow-auto">
      <div className="space-y-0.5">
        {LINES.slice(0, visible).map((line, i) => (
          <div key={i} className={`leading-6 whitespace-pre ${line.color || 'text-gray-300'}`}>
            {line.text === '' ? <span>&nbsp;</span> : line.text.replace(/\x1b\[\d+m/g, '')}
          </div>
        ))}
      </div>
    </div>
  )
}
