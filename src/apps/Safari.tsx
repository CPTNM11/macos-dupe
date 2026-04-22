"use client";

const links = [
  {
    title: "GitHub",
    url: "https://github.com",
    description: "Check out my open source projects and contributions",
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com",
    description: "Connect with me professionally",
  },
  {
    title: "Blog",
    url: "#",
    description: "Read my articles about web development",
  },
];

export default function Safari() {
  return (
    <div className="flex flex-col h-full text-white">
      {/* URL bar */}
      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-gray-700">
        <div className="bg-[#1a1a1a] rounded-lg px-3 py-1.5 text-sm text-gray-400 flex items-center gap-2">
          <span className="text-gray-600">🔒</span>
          <span>portfolio.dev/links</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#1e1e1e] p-8 overflow-auto">
        <h1 className="text-xl font-semibold mb-6">Bookmarks</h1>
        <div className="grid gap-4">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-[#252525] rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <h3 className="text-blue-400 font-medium">{link.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{link.description}</p>
              <p className="text-gray-600 text-xs mt-2">{link.url}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
