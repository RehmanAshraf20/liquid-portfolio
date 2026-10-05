import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'
import { Chip, Eyebrow } from './SectionHeading'
import { entrance, interactive, interactiveGlass, staggerItem } from '../lib/motion'
import { certifications, experience, profile, projects } from '../data/portfolio'

const current = experience[0]

const stats = [
  { label: 'Projects', value: projects.length },
  { label: 'Roles', value: experience.length },
  { label: 'Certificates', value: certifications.length },
]

const BARS = [0.5, 1, 0.65, 0.85]

function Equalizer() {
  return (
    <span aria-hidden="true" className="flex items-end gap-[3px] h-4">
      {BARS.map((peak, i) => (
        <motion.span
          key={i}
          className="w-[3px] h-full origin-bottom rounded-full bg-accent"
          animate={{ scaleY: [0.3, peak, 0.45, peak * 0.7, 0.3] }}
          transition={{ duration: 1.2 + i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </span>
  )
}

// The current role, styled like a streaming app's "now playing" widget.
function NowPlaying() {
  return (
    <GlassPanel
      as={motion.aside}
      variants={staggerItem}
      className="w-full lg:w-[22rem] rounded-3xl p-6"
    >
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
        <Equalizer />
        Now playing
      </div>
      <p className="mt-4 text-xl font-semibold tracking-tight text-white">{current.role}</p>
      <p className="mt-1 text-sm text-white/60">
        {current.type} · {current.org}
      </p>

      <div className="mt-5 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-accent to-indigo-500" />
      </div>
      <p className="mt-2 font-mono text-xs tracking-widest text-white/50">{current.period}</p>

      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd className="font-mono text-2xl text-white">{String(stat.value).padStart(2, '0')}</dd>
            <dt className="mt-1 text-xs text-white/50">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </GlassPanel>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen px-[var(--gutter)] pt-36 pb-16 flex items-end">
      <motion.div
        {...entrance}
        className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
      >
        <div className="min-w-0">
          <motion.div variants={staggerItem}>
            <Eyebrow>Featured</Eyebrow>
          </motion.div>
          <motion.h1
            variants={staggerItem}
            className="text-white text-[2.75rem] sm:text-[4.5rem] font-semibold tracking-tight leading-none"
          >
            {profile.name}
          </motion.h1>
          <motion.div
            variants={staggerItem}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-white/55"
          >
            <Chip>{profile.role}</Chip>
            <span>{profile.focus}</span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.800 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              {profile.location}
            </span>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="mt-4 max-w-xl text-[19px] leading-[1.6] text-white/55"
          >
            {profile.summary}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              variants={staggerItem}
              {...interactive}
              className="h-[62px] rounded-[14px] px-7 flex items-center gap-3
                         bg-[#b5b7be] text-night text-lg font-medium"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M8 5v14l11-7z" />
              </svg>
              View projects
            </motion.a>
            <GlassPanel
              as={motion.a}
              href="#contact"
              variants={staggerItem}
              {...interactiveGlass}
              className="h-[62px] rounded-[14px] px-6 flex items-center gap-3
                         text-white text-lg font-medium"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
              </svg>
              Get in touch
            </GlassPanel>
          </div>
        </div>

        <NowPlaying />
      </motion.div>
    </section>
  )
}
