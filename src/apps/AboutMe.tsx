"use client";

export default function AboutMe() {
  return (
    <div className="p-6 text-white">
      <div className="flex items-start gap-6">
        {/* Avatar placeholder */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl shrink-0">
          👤
        </div>
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-400 mt-1">Full Stack Developer</p>
          <div className="mt-4 space-y-2 text-sm text-gray-300">
            <p>
              Passionate developer with experience in building modern web
              applications. I love creating intuitive user experiences and
              solving complex problems.
            </p>
          </div>
        </div>
      </div>

      {/* System info style */}
      <div className="mt-8 border-t border-gray-700 pt-4">
        <h2 className="text-sm text-gray-400 mb-3">System Information</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-500">OS</span>
          <span className="text-gray-300">Developer v1.0</span>
          <span className="text-gray-500">Languages</span>
          <span className="text-gray-300">TypeScript, Python, Go</span>
          <span className="text-gray-500">Frameworks</span>
          <span className="text-gray-300">React, Next.js, Node.js</span>
          <span className="text-gray-500">Location</span>
          <span className="text-gray-300">Paris, France</span>
          <span className="text-gray-500">Status</span>
          <span className="text-green-400">Available for work</span>
        </div>
      </div>
    </div>
  );
}
