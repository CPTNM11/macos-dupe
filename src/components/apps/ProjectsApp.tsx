const projects = [
  {
    name: 'Portfolio OS',
    description: 'A macOS-inspired interactive portfolio built with Next.js and Tailwind CSS.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    emoji: '🖥️',
    gradient: 'from-blue-400 to-indigo-600',
    link: '#',
  },
  {
    name: '3D modeled E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory and payment integration. With 3D product visualization.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    emoji: '🛍️',
    gradient: 'from-emerald-400 to-teal-600',
    link: '#',
  },
  {
    name: 'AI Powered Fitness App',
    description: 'Tracking Fitness App connected to Claude with persistent memory and context.',
    tech: ['Next.js', 'Swift', 'React', 'Claude'],
    emoji: '💪',
    gradient: 'from-purple-400 to-violet-600',
    link: '#',
  }
]

export default function ProjectsApp() {
  return (
    <div className="h-full overflow-auto bg-white p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Projects</h2>
      <div className="space-y-2.5">
        {projects.map(project => (
          <div
            key={project.name}
            className="rounded-xl border border-gray-100 p-3.5 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
                {project.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                  <span className="text-gray-300 group-hover:text-indigo-400 transition-colors text-xs">→</span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
