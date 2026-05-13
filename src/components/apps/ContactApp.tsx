const contacts = [
  {
    label: 'Email',
    value: 'williamhoangpro@gmail.com',
    emoji: '✉️',
    gradient: 'from-red-400 to-pink-500',
    href: 'mailto:williamhoangpro@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/CPTNM11',
    emoji: '🐙',
    gradient: 'from-gray-600 to-gray-800',
    href: 'https://github.com/CPTNM11',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/williamhoang',
    emoji: '💼',
    gradient: 'from-blue-500 to-blue-700',
    href: 'https://www.linkedin.com/in/william-hoang-85a386265/',
  }
]

export default function ContactApp() {
  return (
    <div className="h-full overflow-auto bg-white p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-1">Get in Touch</h2>
      <p className="text-gray-500 text-xs mb-5 leading-relaxed">
        Always open to new opportunities and collaborations. Don't hesitate to reach out!
      </p>

      <div className="space-y-2">
        {contacts.map(contact => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
              {contact.emoji}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{contact.label}</div>
              <div className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors truncate font-medium">
                {contact.value}
              </div>
            </div>
            <span className="ml-auto text-gray-300 group-hover:text-indigo-400 transition-colors text-sm">↗</span>
          </a>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 text-center">
        <p className="text-xs text-indigo-600 font-medium">Open to freelance !</p>
      </div>
    </div>
  )
}
