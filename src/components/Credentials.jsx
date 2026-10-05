import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'
import SectionHeading from './SectionHeading'
import { entrance, staggerItem } from '../lib/motion'
import { certifications, education } from '../data/portfolio'

const pad = (n) => String(n).padStart(2, '0')

export default function Credentials() {
  return (
    <section id="credentials" className="scroll-mt-28">
      <SectionHeading eyebrow="Credits" title="Education & certifications" />
      <motion.div {...entrance} className="grid lg:grid-cols-[2fr_3fr] gap-5">
        <GlassPanel
          as={motion.div}
          variants={staggerItem}
          className="rounded-3xl p-6 sm:p-7 flex flex-col"
        >
          <p className="font-mono text-xs tracking-widest text-white/50">{education.year}</p>
          <h3 className="mt-1 text-white text-xl font-bold tracking-tight">{education.degree}</h3>
          <p className="mt-1 text-base text-white/60">{education.school}</p>

          <div className="mt-auto pt-8">
            <p className="flex items-baseline gap-2 text-white">
              <span className="font-mono text-5xl">{education.cgpa.toFixed(2)}</span>
              <span className="font-mono text-sm tracking-widest text-white/50">
                / {education.scale.toFixed(2)} CGPA
              </span>
            </p>
            <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-indigo-500"
                style={{ width: `${(education.cgpa / education.scale) * 100}%` }}
              />
            </div>
          </div>
        </GlassPanel>

        <GlassPanel as={motion.div} variants={staggerItem} className="rounded-3xl p-3 sm:p-4">
          <ol>
            {certifications.map((cert, i) => (
              <li
                key={cert}
                className="flex items-center gap-4 rounded-2xl px-3 py-3 text-[17px] text-white/80
                           hover:bg-white/[0.06] transition-colors"
              >
                <span className="font-mono text-xs tracking-widest text-white/50">{pad(i + 1)}</span>
                {cert}
              </li>
            ))}
          </ol>
        </GlassPanel>
      </motion.div>
    </section>
  )
}
