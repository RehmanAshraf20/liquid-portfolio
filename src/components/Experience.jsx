import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'
import SectionHeading, { Chip } from './SectionHeading'
import { entrance, staggerItem } from '../lib/motion'
import { experience } from '../data/portfolio'

const pad = (n) => String(n).padStart(2, '0')

// Roles listed like the episodes of a season, newest first.
export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-28">
      <SectionHeading eyebrow="Career" title="Experience">
        <span className="hidden sm:block font-mono text-sm tracking-widest text-white/50">
          {pad(experience.length)} roles
        </span>
      </SectionHeading>

      <motion.div {...entrance} className="flex flex-col gap-5">
        {experience.map((job, index) => (
          <GlassPanel
            as={motion.article}
            key={job.role}
            variants={staggerItem}
            className="rounded-3xl p-6 sm:p-7 grid gap-x-6 gap-y-3 md:grid-cols-[3.5rem_1fr]"
          >
            <span className="font-mono text-sm tracking-widest text-white/50 md:pt-1.5">
              E{pad(index + 1)}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="flex flex-wrap items-center gap-3 text-white text-xl font-semibold tracking-tight">
                    {job.role}
                    {job.type && <Chip>{job.type}</Chip>}
                  </h3>
                  <p className="mt-1 text-base text-white/60">{job.org}</p>
                </div>
                <p className="flex items-center gap-2 font-mono text-sm tracking-widest text-white/50">
                  {job.current && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  {job.period}
                </p>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-[17px] leading-[1.6] text-white/60">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-[0.7em] w-1.5 h-1.5 shrink-0 rounded-full bg-white/25" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </GlassPanel>
        ))}
      </motion.div>
    </section>
  )
}
