import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'
import { interactive, interactiveGlass } from '../lib/motion'
import { profile } from '../data/portfolio'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  return (
    // The fade behind the bar keeps scrolled content from colliding with the wordmark.
    <nav className="fixed top-0 inset-x-0 z-20 px-[var(--gutter)] pt-4 pb-8
                    flex items-center justify-center sm:justify-between gap-4 pointer-events-none
                    bg-gradient-to-b from-night via-night/70 to-transparent">
      <div className="flex items-center gap-6 min-w-0 pointer-events-auto">
        <a href="#top" aria-label="Back to top" className="hidden sm:flex items-center gap-3 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <circle cx="12" cy="12" r="9" />
            <path d="M10 8.5v7l5.5-3.5z" fill="currentColor" />
          </svg>
          <span className="hidden lg:block text-xl font-medium uppercase tracking-[0.3em]">
            Rehman
          </span>
        </a>

        <GlassPanel className="h-[58px] rounded-full px-2 flex items-center gap-1">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              {...interactive}
              className="px-2.5 sm:px-5 py-2.5 rounded-full text-[13px] sm:text-[15px] font-semibold
                         text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </GlassPanel>
      </div>

      <GlassPanel
        as={motion.a}
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        {...interactiveGlass}
        aria-label="GitHub profile"
        className="hidden sm:flex w-[58px] h-[58px] shrink-0 rounded-full items-center justify-center
                   text-white/80 pointer-events-auto"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.560 9.560 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0012 2z" />
        </svg>
      </GlassPanel>
    </nav>
  )
}
