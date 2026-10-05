import { useEffect, useId, useRef, useState } from 'react'
import { shadows } from '../lib/motion'

// SVG filters inside backdrop-filter only render in Chromium. Everywhere else
// the panel keeps the plain blur + saturate from the Tailwind classes.
const SUPPORTS_REFRACTION =
  typeof navigator !== 'undefined' &&
  /\bChrome\//.test(navigator.userAgent) &&
  typeof ResizeObserver !== 'undefined'

const REFRACTION_SCALE = 50
const MAX_BEZEL = 16

const SURFACE = `group/glass isolate backdrop-blur-[24px] backdrop-saturate-[180%] bg-white/[0.05]
                 border border-transparent`

// Default look: ice-like glass. Almost no blur, so whatever is behind stays
// sharp and only bends at the bezel; a slight dim keeps text on top readable.
// Pass `clear={false}` for the old frosted surface.
const CLEAR_SURFACE = `group/glass isolate backdrop-blur-[1.5px] backdrop-saturate-[160%]
                       backdrop-brightness-[0.82] bg-white/[0.03] border border-transparent`
const FROSTED_FILTER = 'blur(24px) saturate(180%)'
const CLEAR_FILTER = 'blur(1.5px) saturate(160%) brightness(0.82)'

const CLEAR_BORDER_BACKGROUND =
  'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.05) 60%, rgba(190,225,255,0.35) 100%)'

// Wet rim: a bright top-left edge, a cool bottom-right one, and a soft inner sheen.
const CLEAR_RIM_STYLE = {
  boxShadow:
    'inset 1px 1px 0.5px rgba(255,255,255,0.4), inset -1px -1px 0.5px rgba(190,225,255,0.22), ' +
    'inset 0 0 14px rgba(255,255,255,0.07)',
}

const BORDER_STYLE = {
  padding: 1,
  background:
    'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0.06) 100%)',
  mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
}

const GLOW_STYLE = {
  background:
    'radial-gradient(260px circle at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,0.08), transparent 70%)',
}

// Displacement map: red encodes the x offset, green the y offset. A blurred
// neutral-grey centre cancels the offset everywhere except a thin bezel, so
// only the edges bend the backdrop inward.
function buildRefractionMap({ w, h, r }) {
  const bezel = Math.min(MAX_BEZEL, Math.min(w, h) / 4)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
    <defs>
      <linearGradient id='x' x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0' stop-color='#f00'/><stop offset='1' stop-color='#000'/>
      </linearGradient>
      <linearGradient id='y' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stop-color='#0f0'/><stop offset='1' stop-color='#000'/>
      </linearGradient>
      <filter id='b' x='-50%' y='-50%' width='200%' height='200%'>
        <feGaussianBlur stdDeviation='${bezel / 2}'/>
      </filter>
    </defs>
    <rect width='${w}' height='${h}' fill='#000'/>
    <rect width='${w}' height='${h}' fill='url(#x)'/>
    <rect width='${w}' height='${h}' fill='url(#y)' style='mix-blend-mode:screen'/>
    <rect x='${bezel}' y='${bezel}' width='${w - bezel * 2}' height='${h - bezel * 2}'
          rx='${Math.max(r - bezel, 0)}' fill='#808080' filter='url(#b)'/>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function GlassPanel({
  as: Component = 'div',
  clear = true,
  className = '',
  style,
  onPointerMove,
  children,
  ...rest
}) {
  const layersRef = useRef(null)
  const filterId = `glass-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const [box, setBox] = useState(null)

  useEffect(() => {
    if (!SUPPORTS_REFRACTION) return
    const el = layersRef.current
    const observer = new ResizeObserver(() => {
      const w = Math.round(el.offsetWidth)
      const h = Math.round(el.offsetHeight)
      if (!w || !h) return
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0
      const r = Math.min(radius, Math.min(w, h) / 2)
      setBox((prev) => (prev && prev.w === w && prev.h === h && prev.r === r ? prev : { w, h, r }))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = (e) => {
    const rect = layersRef.current.getBoundingClientRect()
    layersRef.current.style.setProperty('--gx', `${e.clientX - rect.left}px`)
    layersRef.current.style.setProperty('--gy', `${e.clientY - rect.top}px`)
    onPointerMove?.(e)
  }

  // Absolute layers need a positioned parent, but must not override a caller's own positioning.
  const positioned = /(^|\s)(fixed|absolute|sticky|relative)(\s|$)/.test(className)

  return (
    <Component
      {...rest}
      onPointerMove={handlePointerMove}
      className={`${clear ? CLEAR_SURFACE : SURFACE} ${positioned ? '' : 'relative'} ${className}`}
      style={{
        boxShadow: shadows.glass.rest,
        ...style,
        ...(box && {
          backdropFilter: `url(#${filterId}) ${clear ? CLEAR_FILTER : FROSTED_FILTER}`,
        }),
      }}
    >
      <div
        ref={layersRef}
        aria-hidden="true"
        className="absolute -inset-px -z-10 rounded-[inherit] overflow-hidden pointer-events-none"
      >
        {box && (
          <svg width="0" height="0" className="absolute">
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feImage
                href={buildRefractionMap(box)}
                x="0"
                y="0"
                width={box.w}
                height={box.h}
                preserveAspectRatio="none"
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={REFRACTION_SCALE}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover/glass:opacity-100 transition-opacity duration-300"
          style={GLOW_STYLE}
        />
        <div className="absolute inset-x-0 top-0 h-1/2 max-h-24 bg-gradient-to-b from-white/[0.04] to-transparent" />
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={clear ? { ...BORDER_STYLE, background: CLEAR_BORDER_BACKGROUND } : BORDER_STYLE}
        />
        {clear && <div className="absolute inset-0 rounded-[inherit]" style={CLEAR_RIM_STYLE} />}
      </div>
      {children}
    </Component>
  )
}

export default GlassPanel
