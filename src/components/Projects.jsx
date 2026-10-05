import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GlassPanel from './GlassPanel'
import SectionHeading, { Chip, Eyebrow } from './SectionHeading'
import {
  entrance,
  fade,
  interactiveCard,
  interactiveGlass,
  pop,
  shadows,
  staggerItem,
  useTilt,
} from '../lib/motion'
import { projects } from '../data/portfolio'

const pad = (n) => String(n).padStart(2, '0')

const FEATURED_WIDTH = 'w-[min(36rem,80vw)]'
const GRID =
  'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), ' +
  'linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)'

// Generated cover art: two glows in the project's colors over a fine grid,
// which gives the glass plate on top something to refract.
function Poster({ project, className = '', iconClassName = 'right-6 top-8' }) {
  const [a, b] = project.colors

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden bg-[#0a0f1f] ${className}`}>
      <div
        className="absolute inset-0 opacity-75"
        style={{
          background:
            `radial-gradient(120% 90% at 15% 0%, ${a} 0%, transparent 60%), ` +
            `radial-gradient(100% 90% at 100% 100%, ${b} 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black)]"
        style={{ backgroundImage: GRID, backgroundSize: '28px 28px' }}
      />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
           strokeLinecap="round" strokeLinejoin="round"
           className={`absolute w-24 h-24 text-white/35 ${iconClassName}`}>
        <path d={project.icon} />
      </svg>
    </div>
  )
}

function TiltCard({ style, ...props }) {
  const tilt = useTilt()

  return <motion.button {...props} {...tilt.handlers} style={{ ...style, ...tilt.style }} />
}

function ProjectDetail({ project, rank, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
    >
      {/* The dim layer is a sibling, not a parent, so its fade doesn't cut the panel off from the page behind. */}
      <motion.div {...fade} onClick={onClose} className="absolute inset-0 bg-night/70 backdrop-blur-md" />

      <GlassPanel as={motion.div} {...pop} className="w-full max-w-2xl rounded-3xl">
        <div className="max-h-[85vh] overflow-y-auto rounded-[inherit]">
          <div className="relative h-44">
            <Poster
              project={project}
              className="[mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
              iconClassName="right-20 top-5"
            />
            <span className="absolute left-6 top-6 font-mono text-xs tracking-widest text-white/70">
              {pad(rank)} / {pad(projects.length)}
            </span>
          </div>

          <div className="px-6 pb-7 sm:px-8 sm:pb-8 -mt-6 relative">
            <Eyebrow>{project.kind}</Eyebrow>
            <h3 className="text-white text-3xl font-semibold tracking-tight">{project.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
            <ul className="mt-6 flex flex-col gap-3 text-[17px] leading-[1.6] text-white/70">
              {project.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-[0.7em] w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GlassPanel
          as={motion.button}
          type="button"
          onClick={onClose}
          {...interactiveGlass}
          aria-label="Close"
          className="absolute right-4 top-4 w-11 h-11 rounded-full flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
               strokeLinecap="round" className="w-5 h-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </GlassPanel>
      </GlassPanel>
    </div>
  )
}

// Horizontal row of poster cards. Opening one shows its details and tints the
// ambient background with its colors (`onTint(null)` restores the default).
export default function Projects({ onTint }) {
  const rowRef = useRef(null)
  const [pos, setPos] = useState(0)
  const [open, setOpen] = useState(null)

  // Cards differ in width (the first is featured), so positions are measured per card.
  const offset = (i) => {
    const cards = rowRef.current.children
    return cards[i].offsetLeft - cards[0].offsetLeft
  }
  const go = (i) => {
    const next = Math.max(0, Math.min(projects.length - 1, i))
    rowRef.current.scrollTo({ left: offset(next), behavior: 'smooth' })
  }
  const onScroll = () => {
    const left = rowRef.current.scrollLeft
    let nearest = 0
    projects.forEach((_, i) => {
      if (Math.abs(offset(i) - left) < Math.abs(offset(nearest) - left)) nearest = i
    })
    setPos(nearest)
  }

  const show = (project) => {
    const [a, b] = project.colors
    setOpen(project)
    onTint([a, b, b, a])
  }
  const close = () => {
    setOpen(null)
    onTint(null)
  }

  return (
    <section id="projects" className="scroll-mt-28">
      <SectionHeading eyebrow="Trending" title="Top projects">
        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-mono text-sm tracking-widest text-white/50">
            {pad(pos + 1)} / {pad(projects.length)}
          </span>
          {[-1, 1].map((dir) => (
            <GlassPanel
              as={motion.button}
              key={dir}
              type="button"
              onClick={() => go(pos + dir)}
              {...interactiveGlass}
              aria-label={dir < 0 ? 'Previous' : 'Next'}
              className="w-12 h-12 rounded-full flex items-center justify-center
                         hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d={dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
              </svg>
            </GlassPanel>
          ))}
        </div>
      </SectionHeading>

      <motion.div
        {...entrance}
        ref={rowRef}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory -mr-[var(--gutter)]
                   pt-4 -mt-4 pb-12 -mb-8 pl-3 -ml-3 scroll-pl-3
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <TiltCard
            key={project.id}
            type="button"
            onClick={() => show(project)}
            variants={staggerItem}
            {...interactiveCard}
            style={{ boxShadow: shadows.card.rest }}
            className={`relative h-80 shrink-0 snap-start overflow-hidden rounded-3xl text-left
                        border border-white/10 ${index === 0 ? FEATURED_WIDTH : 'w-64'}`}
          >
            <Poster project={project} />
            <span className="absolute left-4 top-4 font-mono text-xs tracking-widest text-white/70">
              {pad(index + 1)}
            </span>
            <GlassPanel className="absolute inset-x-3 bottom-3 rounded-2xl px-4 py-3">
              <p className="text-base font-semibold text-white truncate">{project.title}</p>
              <p className="text-sm text-white/60 truncate">{project.kind}</p>
              {index === 0 && (
                <p className="mt-1.5 text-sm text-white/55 line-clamp-2">{project.summary}</p>
              )}
            </GlassPanel>
          </TiltCard>
        ))}
        {/* spacer so the last card can scroll to the start edge */}
        <div className="shrink-0 w-[calc(100%-17rem)]" />
      </motion.div>

      <AnimatePresence>
        {open && (
          <ProjectDetail
            key={open.id}
            project={open}
            rank={projects.indexOf(open) + 1}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
