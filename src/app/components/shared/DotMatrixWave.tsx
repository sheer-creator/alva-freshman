import { useRef, useEffect, useMemo } from 'react'

// ════════════════════════════════════════════════════════════════
//  Defaults
// ════════════════════════════════════════════════════════════════

const DEFAULT_BG_COLOR = '#FFFFFF'
const DEFAULT_DOT_COLOR = '#d1e0e0'

const SPACING = 14
const HOVER_RADIUS = 350
const NOISE_SEED = 42
const NOISE_SCALE = 0.004
const NOISE_SPEED = 0.08
const DOT_SIZE_MIN = 2.5
const DOT_SIZE_RANGE = 3.5
const HOVER_SIZE_MIN = 5.0
const HOVER_SIZE_RANGE = 7.0
const HOVER_FADE_IN = 0.045
const HOVER_FADE_OUT = 0.94
const MOUSE_LERP = 0.14
const TIME_SCALE = 0.005
const NOISE_THRESHOLD = -0.25
const DOT_ALPHA_MAX = 0.8
const BORDER_RADIUS_RATIO = 0.22
const HOVER_DARKEN = 35

function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

// ════════════════════════════════════════════════════════════════
//  Simplex 3D Noise (Stefan Gustavson)
// ════════════════════════════════════════════════════════════════

const F3 = 1 / 3
const G3 = 1 / 6
const GRAD3: [number, number, number][] = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
]

class SimplexNoise {
  private perm: Uint8Array
  private pm12: Uint8Array

  constructor(seed: number = 10) {
    const p = new Uint8Array(256)
    for (let i = 0; i < 256; i++) p[i] = i

    let s = (seed * 2 + 1) | 0
    for (let i = 255; i > 0; i--) {
      s %= 2
      const j = s % (i + 1)
      const tmp = p[i]!; p[i] = p[j]!; p[j] = tmp
    }

    this.perm = new Uint8Array(512)
    this.pm12 = new Uint8Array(512)
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255]!
      this.pm12[i] = this.perm[i]! % 12
    }
  }

  noise3D(xin: number, yin: number, zin: number): number {
    const { perm, pm12 } = this
    const grad3 = GRAD3
    const s = (xin + yin + zin) * F3
    const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s)
    const t = (i + j + k) * G3
    const x0 = xin - i + t, y0 = yin - j + t, z0 = zin - k + t

    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1 }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1 }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1 }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1 }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
    }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3
    const x3 = x0 - 1 + 0.5, y3 = y0 - 1 + 0.5, z3 = z0 - 1 + 0.5

    const ii = i & 255, jj = j & 255, kk = k & 255
    let n = 0

    let v = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
    if (v > 0) { v *= v; const g = grad3[pm12[ii + perm[jj + perm[kk]!]!]!]!; n += v * v * (g[0] * x0 + g[1] * y0 + g[2] * z0) }
    v = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
    if (v > 0) { v *= v; const g = grad3[pm12[ii + i1 + perm[jj + j1 + perm[kk + k1]!]!]!]!; n += v * v * (g[0] * x1 + g[1] * y1 + g[2] * z1) }
    v = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
    if (v > 0) { v *= v; const g = grad3[pm12[ii + i2 + perm[jj + j2 + perm[kk + k2]!]!]!]!; n += v * v * (g[0] * x2 + g[1] * y2 + g[2] * z2) }
    v = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
    if (v > 0) { v *= v; const g = grad3[pm12[ii + 1 + perm[jj + 1 + perm[kk + 1]!]!]!]!; n += v * v * (g[0] * x3 + g[1] * y3 + g[2] * z3) }

    return 32 * n
  }
}

// ════════════════════════════════════════════════════════════════
//  Types
// ════════════════════════════════════════════════════════════════

interface AnimationState {
  mx: number
  my: number
  tmx: number
  tmy: number
  hoverStr: number
  hovering: boolean
  sn: SimplexNoise
  rafId: number
  W: number
  H: number
  frozenTime: number
}

interface DotMatrixWaveProps {
  className?: string
  enableWave?: boolean
  enableHover?: boolean
  hoverExcludeSelector?: string
  bgColor?: string
  dotColor?: string
  waveSpeed?: number
}

// ════════════════════════════════════════════════════════════════
//  Component
// ════════════════════════════════════════════════════════════════

export default function DotMatrixWave({
  className,
  enableWave = true,
  enableHover = true,
  hoverExcludeSelector,
  bgColor = DEFAULT_BG_COLOR,
  dotColor = DEFAULT_DOT_COLOR,
  waveSpeed = 1,
}: DotMatrixWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const colors = useMemo(() => {
    const base = parseHex(dotColor)
    return {
      dot: base,
      hover: {
        r: Math.max(0, base.r - HOVER_DARKEN),
        g: Math.max(0, base.g - HOVER_DARKEN),
        b: Math.max(0, base.b - HOVER_DARKEN),
      },
    }
  }, [dotColor])

  const stateRef = useRef<AnimationState>({
    mx: -9999, my: -9999,
    tmx: -9999, tmy: -9999,
    hoverStr: 0,
    hovering: false,
    sn: new SimplexNoise(NOISE_SEED),
    rafId: 0,
    W: 0, H: 0,
    frozenTime: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const st = stateRef.current

    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      st.W = rect.width
      st.H = rect.height
      canvas.width = st.W * dpr
      canvas.height = st.H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    syncSize()

    const needsLoop = enableWave || enableHover
    const noiseSpeed = NOISE_SPEED * waveSpeed
    const { dot: dotRgb, hover: hoverRgb } = colors

    const drawFrame = (now: number) => {
      const t = enableWave ? now * TIME_SCALE : st.frozenTime
      if (!enableWave && st.frozenTime === 0) {
        st.frozenTime = now * TIME_SCALE
      }

      const { W, H } = st

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, W, H)

      if (enableHover) {
        if (st.hovering) {
          st.hoverStr = Math.min(1, st.hoverStr + HOVER_FADE_IN)
          st.mx += (st.tmx - st.mx) * MOUSE_LERP
          st.my += (st.tmy - st.my) * MOUSE_LERP
        } else {
          st.hoverStr *= HOVER_FADE_OUT
        }
      }

      const hasHover = enableHover && st.hoverStr > 0.004
      const hr = HOVER_RADIUS

      if (hasHover) {
        ctx.beginPath()
        ctx.arc(st.mx, st.my, hr, 0, Math.PI * 2)
        ctx.fill()
      }

      const hx0 = st.mx - hr, hx1 = st.mx + hr
      const hy0 = st.my - hr, hy1 = st.my + hr

      for (let x = SPACING * 0.5; x < W + SPACING; x += SPACING) {
        const inHoverCol = hasHover && x > hx0 - SPACING && x < hx1 + SPACING

        for (let y = SPACING * 0.5; y < H + SPACING; y += SPACING) {
          const n1 = st.sn.noise3D(x * NOISE_SCALE, y * NOISE_SCALE, t * noiseSpeed)
          const nv = n1 * 0.7

          let sz: number, a: number
          if (nv > NOISE_THRESHOLD) {
            const m = (nv - NOISE_THRESHOLD) / (1 - NOISE_THRESHOLD)
            a = Math.pow(m, 0.55) * DOT_ALPHA_MAX
            sz = DOT_SIZE_MIN + m * DOT_SIZE_RANGE
          } else {
            a = 0; sz = 0
          }

          let cr = dotRgb.r, cg = dotRgb.g, cb = dotRgb.b

          if (inHoverCol && hasHover && y > hy0 - SPACING && y < hy1 + SPACING) {
            const dx = x - st.mx, dy = y - st.my
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < hr) {
              const p = 1 - d / hr
              const hf = p * p * st.hoverStr
              const hs = HOVER_SIZE_MIN + p * p * HOVER_SIZE_RANGE
              sz = sz + (hs - sz) * hf
              cr += (hoverRgb.r - cr) * hf
              cg += (hoverRgb.g - cg) * hf
              cb += (hoverRgb.b - cb) * hf
              const ha = 0.35 + p * 0.55
              a = a + (ha - a) * hf
            }
          }

          if (a < 0.015 || sz < 0.4) continue

          ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${a})`
          const hs = sz * 0.5

          if (sz < 3) {
            ctx.fillRect(x - hs, y - hs, sz, sz)
          } else {
            ctx.beginPath()
            ctx.roundRect(x - hs / 2, y - hs / 2, sz, sz, sz * BORDER_RADIUS_RATIO)
            ctx.fill()
          }
        }
      }

      if (needsLoop) {
        st.rafId = requestAnimationFrame(drawFrame)
      }
    }

    const ro = new ResizeObserver(() => {
      syncSize()
      if (!needsLoop) drawFrame(performance.now())
    })
    ro.observe(canvas)

    if (needsLoop) {
      st.rafId = requestAnimationFrame(drawFrame)
    } else {
      drawFrame(performance.now())
    }

    const isTouchDevice = window.matchMedia('(hover: none)').matches

    const onMouseMove = (e: MouseEvent) => {
      if (hoverExcludeSelector) {
        const target = e.target as HTMLElement
        if (target?.closest?.(hoverExcludeSelector)) {
          st.hovering = false
          return
        }
      }

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
      st.tmx = x
      st.tmy = y
      if (!st.hovering && isInside) { st.mx = x; st.my = y }
      st.hovering = isInside
    }

    if (!isTouchDevice && enableHover) {
      document.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      cancelAnimationFrame(st.rafId)
      ro.disconnect()
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [enableWave, enableHover, hoverExcludeSelector, bgColor, colors, waveSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={['block m-0 p-0', className].filter(Boolean).join(' ')}
    />
  )
}
