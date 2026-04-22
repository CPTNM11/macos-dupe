"use client";

import { useState } from "react";

export default function Mail() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center">
          <p className="text-4xl mb-4">✅</p>
          <p className="text-lg font-medium">Message sent!</p>
          <p className="text-gray-400 text-sm mt-2">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            New Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-white">
      {/* Toolbar */}
      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-gray-700 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="border-b border-gray-700 px-4 py-2 flex items-center gap-2">
          <span className="text-gray-500 text-sm">To:</span>
          <span className="text-gray-300 text-sm">hello@johndoe.dev</span>
        </div>
        <div className="border-b border-gray-700 px-4 py-2">
          <input
            type="text"
            placeholder="Subject"
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
          />
        </div>
        <textarea
          placeholder="Write your message..."
          className="flex-1 bg-[#1e1e1e] p-4 text-sm text-white placeholder-gray-500 outline-none resize-none"
        />
      </form>
    </div>
  );
}
