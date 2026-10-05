const STAR = 'M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z'

export function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-accent mb-2">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d={STAR} />
      </svg>
      {children}
    </p>
  )
}

export function Chip({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04]
                      px-3 py-1 text-sm text-white/80 ${className}`}>
      {children}
    </span>
  )
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="flex items-center gap-4 text-white text-3xl sm:text-[2.5rem] leading-tight
                       font-semibold tracking-tight">
          <span className="w-0.5 h-8 rounded-full bg-gradient-to-b from-accent to-indigo-500" />
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

export default SectionHeading
