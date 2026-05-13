export default function AboutApp() {
  return (
    <div className="h-full overflow-auto bg-white p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-4xl mb-4 shadow-lg">
          🧑‍💻
        </div>
        <h1 className="text-2xl font-bold text-gray-900">William</h1>
        <p className="text-indigo-600 font-medium text-sm mt-0.5">Full-Stack Developer</p>
        <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Available for work
        </span>
      </div>

      <div className="space-y-4 text-sm text-gray-600 max-w-xs mx-auto">
        <p className="leading-relaxed">
          Passionate developer crafting modern web experiences with clean code and thoughtful design. I love building things that live on the internet.
        </p>
        <p className="leading-relaxed">
          When I'm not coding, you can find me exploring the latest tech trends, doing music production or gaming. Always eager to learn and collaborate on exciting projects!
        </p>

        <div className="pt-2 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: 'Location', value: '🌍 France' },
              { label: 'Experience', value: '3+ ans' },
              { label: 'Focus', value: 'Web & Mobile' },
              { label: 'Status', value: 'Open to offers' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-2">
                <div className="text-gray-400 font-medium">{label}</div>
                <div className="text-gray-700 font-semibold mt-0.5">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'PHP', 'Symfony', 'Swift'].map(tech => (
            <span key={tech} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
