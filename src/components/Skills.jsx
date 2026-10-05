import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'
import SectionHeading, { Chip } from './SectionHeading'
import { entrance, interactiveGlass, staggerItem, useTilt } from '../lib/motion'
import { skills } from '../data/portfolio'

const pad = (n) => String(n).padStart(2, '0')

function SkillTile({ group, index }) {
  const tilt = useTilt(5)

  return (
    <GlassPanel
      as={motion.div}
      variants={staggerItem}
      {...interactiveGlass}
      {...tilt.handlers}
      style={tilt.style}
      className="rounded-3xl p-6"
    >
      <p className="font-mono text-xs tracking-widest text-white/50">{pad(index + 1)}</p>
      <h3 className="mt-1 text-white text-xl font-bold tracking-tight">{group.area}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </div>
    </GlassPanel>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-28">
      <SectionHeading eyebrow="Browse" title="Pick a stack" />
      <motion.div {...entrance} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {skills.map((group, i) => (
          <SkillTile key={group.area} group={group} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
