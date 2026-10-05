import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['rgb(147, 51, 234)', 'rgb(29, 78, 216)', 'rgb(8, 145, 178)', 'rgb(79, 70, 229)']

const BLOBS = [
  {
    className: 'top-[-20%] left-[-15%] w-[70vmax] h-[70vmax]',
    duration: 22,
    x: ['0vw', '18vw', '-6vw', '0vw'],
    y: ['0vh', '12vh', '24vh', '0vh'],
    scale: [1, 1.2, 0.9, 1],
    borderRadius: ['42% 58% 63% 37%', '60% 40% 38% 62%', '35% 65% 55% 45%', '42% 58% 63% 37%'],
  },
  {
    className: 'top-[-10%] right-[-20%] w-[60vmax] h-[60vmax]',
    duration: 27,
    x: ['0vw', '-20vw', '-8vw', '0vw'],
    y: ['0vh', '20vh', '-6vh', '0vh'],
    scale: [1, 0.85, 1.15, 1],
    borderRadius: ['55% 45% 40% 60%', '38% 62% 60% 40%', '62% 38% 45% 55%', '55% 45% 40% 60%'],
  },
  {
    className: 'bottom-[-25%] left-[-10%] w-[65vmax] h-[65vmax]',
    duration: 30,
    x: ['0vw', '14vw', '28vw', '0vw'],
    y: ['0vh', '-18vh', '-4vh', '0vh'],
    scale: [1, 1.15, 0.95, 1],
    borderRadius: ['48% 52% 35% 65%', '65% 35% 58% 42%', '40% 60% 62% 38%', '48% 52% 35% 65%'],
  },
  {
    className: 'bottom-[-20%] right-[-15%] w-[55vmax] h-[55vmax]',
    duration: 20,
    x: ['0vw', '-12vw', '-24vw', '0vw'],
    y: ['0vh', '-22vh', '-8vh', '0vh'],
    scale: [1, 0.9, 1.25, 1],
    borderRadius: ['60% 40% 52% 48%', '42% 58% 36% 64%', '56% 44% 64% 36%', '60% 40% 52% 48%'],
  },
]

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

// Sparse starfield: pseudo-random 1–3px dots at 30–60% opacity. Each star
// drifts slowly upward (vx/vy in px per second) and twinkles on its own cycle.
const STARS = Array.from({ length: 90 }, (_, i) => {
  const rand = (n) => {
    const v = Math.sin(i * 127.1 + n * 311.7) * 43758.5453
    return v - Math.floor(v)
  }
  return {
    x: rand(2),
    y: rand(3),
    radius: 0.75 + rand(1),
    alpha: 0.3 + rand(4) * 0.3,
    vx: (rand(5) - 0.5) * 8,
    vy: -(3 + rand(6) * 9),
    twinkle: 0.4 + rand(7) * 1.2,
    phase: rand(8) * Math.PI * 2,
  }
})

const STAR_COLOR = 'rgb(190, 210, 255)'

const wrap = (value, size) => ((value % size) + size) % size

// Star positions are a pure function of elapsed time, so a resize needs no
// bookkeeping: the next frame simply lays them out for the new size.
function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0

    const draw = (ms) => {
      const t = ms / 1000
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = STAR_COLOR
      for (const star of STARS) {
        ctx.globalAlpha = star.alpha * (0.55 + 0.45 * Math.sin(t * star.twinkle + star.phase))
        ctx.beginPath()
        ctx.arc(
          wrap(star.x * width + star.vx * t, width),
          wrap(star.y * height + star.vy * t, height),
          star.radius,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
      if (!reduceMotion) frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduceMotion) draw(0)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// `colors` tints the four blobs; pass a new array to cross-fade to another palette.
function AmbientBackground({ colors = COLORS }) {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-night pointer-events-none">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute opacity-[0.12] blur-[120px] will-change-transform ${blob.className}`}
          initial={false}
          animate={{
            x: blob.x,
            y: blob.y,
            scale: blob.scale,
            borderRadius: blob.borderRadius,
            backgroundColor: colors[i],
          }}
          transition={{
            default: { duration: blob.duration, repeat: Infinity, ease: 'easeInOut' },
            backgroundColor: { duration: 1.5, ease: 'easeInOut' },
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: NOISE }} />
      <Starfield />
    </div>
  )
}

export default AmbientBackground
