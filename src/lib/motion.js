import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 25 },
  smooth: { type: 'spring', stiffness: 300, damping: 30 },
  bouncy: { type: 'spring', stiffness: 500, damping: 18 },
}

// Resting and lifted shadows share the same layer structure so framer-motion
// can interpolate between them instead of snapping.
const glassLayers = (outer) =>
  `${outer}, inset 0px 1px 0px rgba(255,255,255,0.08), inset 0px -1px 0px rgba(0,0,0,0.12), ` +
  'inset 0px 10px 16px -10px rgba(255,255,255,0.04), inset 0px -10px 16px -10px rgba(0,0,0,0.12)'
const cardLayers = (outer) => `${outer}, inset 0px 1px 0px rgba(255,255,255,0.15)`

const REST = '0px 8px 32px rgba(0,0,0,0.5)'
const GLASS_REST = '0px 4px 20px rgba(0,0,0,0.3)'
const LIFT = '0px 18px 44px rgba(0,0,0,0.65)'

export const shadows = {
  glass: { rest: glassLayers(GLASS_REST), lift: glassLayers(LIFT) },
  card: { rest: cardLayers(REST), lift: cardLayers(LIFT) },
}

// Hover / tap. `hover` is for elements with no resting shadow; surfaces that
// already have one use the matching variant (and set shadows.*.rest in `style`).
export const hover = { scale: 1.03, boxShadow: LIFT }
export const hoverGlass = { scale: 1.03, boxShadow: shadows.glass.lift }
export const hoverCard = { scale: 1.03, boxShadow: shadows.card.lift }
export const tap = { scale: 0.97 }

// Spread onto a motion element: <motion.button {...interactive} />
export const interactive = { whileHover: hover, whileTap: tap, transition: springs.snappy }
export const interactiveGlass = { ...interactive, whileHover: hoverGlass }
export const interactiveCard = { ...interactive, whileHover: hoverCard }

// Staggered entrance: children fade in and rise 12px, 40ms apart.
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: springs.smooth },
}

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true } }

// Spread onto a section so its `staggerItem` descendants animate in on scroll.
export const entrance = { variants: staggerContainer, ...inView }
// Same, for a standalone element that fades and rises by itself.
export const fadeUp = { variants: staggerItem, ...inView }

// Overlays: `fade` on the dimmed backdrop, `pop` on the dialog itself.
// Both need an <AnimatePresence> ancestor for the exit to play.
export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}
export const pop = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 16 },
  transition: springs.smooth,
}

// Subtle 3D tilt that turns the element to face the cursor.
// Usage: const tilt = useTilt(); <motion.div style={tilt.style} {...tilt.handlers} />
export function useTilt(max = 7) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), springs.smooth)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), springs.smooth)

  const handlers = {
    onPointerMove: (e) => {
      if (e.pointerType !== 'mouse') return
      const rect = e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - rect.left) / rect.width - 0.5)
      y.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    onPointerLeave: () => {
      x.set(0)
      y.set(0)
    },
  }

  return { style: { rotateX, rotateY, transformPerspective: 800 }, handlers }
}
