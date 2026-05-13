const skillGroups = [
  {
    category: 'Frontend',
    emoji: '🎨',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Framer Motion'],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    skills: ['Node.js', 'PHP', 'PostgreSQL', 'Redis', 'REST APIs', 'GraphQL', 'Python'],
  },
  {
    category: 'DevOps & Cloud',
    emoji: '🚀',
    color: 'bg-orange-50 text-orange-700 border-orange-100',
    skills: ['Docker', 'CI/CD', 'Vercel', 'AWS', 'GitHub Actions'],
  },
  {
    category: 'Tools',
    emoji: '🛠️',
    color: 'bg-purple-50 text-purple-700 border-purple-100',
    skills: ['VS Code', 'Git', 'Postman', 'Linear', 'Claude'],
  },
]

export default function SkillsApp() {
  return (
    <div className="h-full overflow-auto bg-white p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Skills & Tech Stack</h2>
      <div className="space-y-5">
        {skillGroups.map(group => (
          <div key={group.category}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{group.emoji}</span>
              <h3 className="font-semibold text-gray-700 text-sm">{group.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <span
                  key={skill}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${group.color} hover:brightness-95 transition-all cursor-default`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
