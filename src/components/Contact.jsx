import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'
import { Eyebrow } from './SectionHeading'
import { fadeUp, interactive } from '../lib/motion'
import { profile } from '../data/portfolio'

const secondary = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
]

export default function Contact() {
  return (
    <GlassPanel
      as={motion.section}
      id="contact"
      {...fadeUp}
      className="scroll-mt-28 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6"
    >
      <div>
        <Eyebrow>Contact</Eyebrow>
        <h2 className="text-white text-3xl font-semibold tracking-tight">Let&apos;s build something</h2>
        <p className="mt-2 text-[19px] leading-[1.6] text-white/55">
          Backend work, automation builds, or both.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <motion.a
          href={`mailto:${profile.email}`}
          {...interactive}
          className="h-[62px] rounded-[14px] px-6 flex items-center gap-3
                     bg-[#b5b7be] text-night text-lg font-medium"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
          </svg>
          Email me
        </motion.a>
        {secondary.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            {...interactive}
            className="h-[62px] rounded-[14px] px-6 flex items-center gap-3
                       bg-white/10 hover:bg-white/15 transition-colors
                       text-white text-lg font-medium"
          >
            {link.label}
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </motion.a>
        ))}
      </div>
    </GlassPanel>
  )
}
