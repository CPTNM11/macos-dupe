"use client";

import { useState } from "react";

interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

const projects: Project[] = [
  {
    name: "Portfolio macOS",
    description: "A macOS-inspired portfolio website built with Next.js",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Project Alpha",
    description: "A full-stack web application",
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "Project Beta",
    description: "A mobile-first responsive dashboard",
    tech: ["Vue.js", "Python", "Docker"],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex h-full text-white">
      {/* Sidebar */}
      <div className="w-48 bg-[#252525] border-r border-gray-700 p-2 shrink-0">
        <p className="text-xs text-gray-500 uppercase font-semibold px-2 mb-2">
          Projects
        </p>
        {projects.map((project, i) => (
          <button
            key={project.name}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
              selected === i
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            📁 {project.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold">{projects[selected].name}</h2>
        <p className="text-gray-400 mt-2">{projects[selected].description}</p>
        <div className="flex gap-2 mt-4 flex-wrap">
          {projects[selected].tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
        {projects[selected].url && (
          <a
            href={projects[selected].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-400 text-sm hover:underline"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
}
