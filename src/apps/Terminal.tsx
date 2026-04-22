"use client";

import { useState, useEffect, useRef } from "react";

const lines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "John Doe - Full Stack Developer" },
  { prompt: true, text: "cat skills.txt" },
  {
    prompt: false,
    text: "TypeScript | React | Next.js | Node.js | Python | Docker | PostgreSQL",
  },
  { prompt: true, text: "ls experience/" },
  { prompt: false, text: "company-a/  company-b/  freelance/" },
  { prompt: true, text: "cat experience/company-a/README.md" },
  { prompt: false, text: "Software Engineer @ Company A (2022-2024)" },
  { prompt: false, text: "- Built microservices architecture" },
  { prompt: false, text: "- Led frontend migration to Next.js" },
  { prompt: true, text: "" },
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timeout = setTimeout(
        () => setVisibleLines((v) => v + 1),
        lines[visibleLines]?.prompt ? 600 : 200
      );
      return () => clearTimeout(timeout);
    }
  }, [visibleLines]);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [visibleLines]);

  return (
    <div
      ref={containerRef}
      className="h-full bg-[#1a1a2e] p-4 font-mono text-sm overflow-auto"
    >
      {lines.slice(0, visibleLines).map((line, i) => (
        <div key={i} className="leading-6">
          {line.prompt ? (
            <span>
              <span className="text-green-400">guest@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ {line.text}</span>
              {i === visibleLines - 1 && (
                <span className="animate-pulse text-white">▊</span>
              )}
            </span>
          ) : (
            <span className="text-gray-300">{line.text}</span>
          )}
        </div>
      ))}
    </div>
  );
}
