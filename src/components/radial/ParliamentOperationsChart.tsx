import { useEffect, useMemo, useRef, useState } from 'react'

const PARLIAMENT_SVG_URL = '/img/Dashboard/Proyeccion_Social/parliamentChart.svg'

/** Centro de referencia bajo el hemiciclo: orden angular ≈ de izquierda a derecha siguiendo la U. */
const SORT_ORIGIN_X = 500
const SORT_ORIGIN_Y = 1020

export interface ParliamentAreaSlice {
  id: string
  label: string
  /** Porcentaje del total (100) que no incluye coordinación; la suma de todas las áreas + coordinación = 100 en el padre. */
  percent: number
  color: string
}

export interface ParliamentOperationsChartProps {
  coordinationPercent: number
  coordinationColor: string
  /** Áreas operativas (planetas); sus `percent` suman `100 - coordinationPercent`. */
  areas: ParliamentAreaSlice[]
}

function readEllipse(el: SVGEllipseElement) {
  return {
    cx: Number.parseFloat(el.getAttribute('cx') ?? '0'),
    cy: Number.parseFloat(el.getAttribute('cy') ?? '0'),
    rx: Number.parseFloat(el.getAttribute('rx') ?? '0'),
    ry: Number.parseFloat(el.getAttribute('ry') ?? '0'),
    el,
  }
}

/** Reparto entero de `total` asientos según pesos (suma de pesos > 0). */
function allocateSeatCounts(total: number, weights: number[]): number[] {
  const sumW = weights.reduce((a, b) => a + b, 0)
  if (sumW <= 0) return weights.map(() => 0)
  const exact = weights.map((w) => (w / sumW) * total)
  const floors = exact.map((v) => Math.floor(v))
  const used = floors.reduce((a, b) => a + b, 0)
  const remainder = total - used
  const order = exact
    .map((v, i) => ({ i, frac: v - floors[i] }))
    .sort((a, b) => b.frac - a.frac)
  for (let k = 0; k < remainder; k++) {
    floors[order[k % order.length].i] += 1
  }
  return floors
}

/**
 * Orden visual: izquierda → derecha siguiendo la U (ángulo desde un punto bajo el centro).
 */
function sortSeatOrder(seats: ReturnType<typeof readEllipse>[]) {
  return [...seats].sort((a, b) => {
    const angA = Math.atan2(a.cy - SORT_ORIGIN_Y, a.cx - SORT_ORIGIN_X)
    const angB = Math.atan2(b.cy - SORT_ORIGIN_Y, b.cx - SORT_ORIGIN_X)
    if (angA !== angB) return angA - angB
    if (a.cy !== b.cy) return a.cy - b.cy
    return a.cx - b.cx
  })
}

/**
 * Illustrator suele exportar `.st0 { fill: ... }` en <style>; eso pisa el atributo `fill`.
 * Quitamos estilos embebidos y la clase, y aplicamos color con `style` + `data-area` para hover.
 */
function buildColoredSvgMarkup(
  svgText: string,
  coordinationColor: string,
  areas: ParliamentAreaSlice[],
  seatCounts: number[],
): string {
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml')
  const parseErr = doc.querySelector('parsererror')
  if (parseErr) throw new Error('SVG no valido')

  doc.querySelectorAll('style').forEach((s) => s.remove())

  const ellipses = [...doc.querySelectorAll('ellipse')] as SVGEllipseElement[]
  if (ellipses.length < 2) throw new Error('SVG sin elipses suficientes')

  /** Primera forma = Coordinación (según diseño en Illustrator). */
  const coordinationEl = ellipses[0]
  coordinationEl.removeAttribute('class')
  coordinationEl.setAttribute('data-area', 'coordinacion')
  coordinationEl.setAttribute(
    'style',
    `fill:${coordinationColor};stroke:rgba(255,255,255,0.35);stroke-width:2px;transform-box:fill-box;transform-origin:center;cursor:pointer;`,
  )
  coordinationEl.setAttribute('aria-label', 'Coordinacion')

  const seatEls = ellipses.slice(1).map((el) => readEllipse(el))
  const ordered = sortSeatOrder(seatEls)

  const flatColors: string[] = []
  const flatAreaIds: string[] = []
  areas.forEach((area, i) => {
    const n = seatCounts[i] ?? 0
    for (let j = 0; j < n; j++) {
      flatColors.push(area.color)
      flatAreaIds.push(area.id)
    }
  })
  while (flatColors.length < ordered.length) {
    const fallback = areas[areas.length - 1]
    flatColors.push(fallback?.color ?? '#888')
    flatAreaIds.push(fallback?.id ?? 'otros')
  }
  flatColors.length = ordered.length
  flatAreaIds.length = ordered.length

  ordered.forEach((seat, idx) => {
    const color = flatColors[idx] ?? '#888'
    const areaId = flatAreaIds[idx] ?? 'otros'
    seat.el.removeAttribute('class')
    seat.el.setAttribute('data-area', areaId)
    seat.el.setAttribute(
      'style',
      `fill:${color};stroke:rgba(255,255,255,0.22);stroke-width:0.75px;transform-box:fill-box;transform-origin:center;cursor:pointer;`,
    )
  })

  const svg = doc.documentElement
  svg.setAttribute('role', 'img')
  return svg.outerHTML
}

function escapeAreaSelector(id: string) {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(id)
  return id.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export function ParliamentOperationsChart({
  coordinationPercent,
  coordinationColor,
  areas,
}: ParliamentOperationsChartProps) {
  const [markup, setMarkup] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const weights = useMemo(() => areas.map((a) => a.percent), [areas])
  const seatTotal = 99

  const seatCounts = useMemo(() => allocateSeatCounts(seatTotal, weights), [weights])

  useEffect(() => {
    let cancelled = false
    setError(null)
    setMarkup(null)
    fetch(PARLIAMENT_SVG_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`No se pudo cargar el SVG (${r.status})`)
        return r.text()
      })
      .then((text) => {
        if (cancelled) return
        const html = buildColoredSvgMarkup(text, coordinationColor, areas, seatCounts)
        setMarkup(html)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Error al cargar la grafica')
      })
    return () => {
      cancelled = true
    }
  }, [coordinationColor, areas, seatCounts.join(',')])

  /** Hover: agrandar todos los puntos (y el óvalo) del mismo `data-area`. */
  useEffect(() => {
    if (!markup) return
    const root = wrapRef.current
    if (!root) return

    const clear = () => {
      root.querySelectorAll('.parliament-hover').forEach((n) => n.classList.remove('parliament-hover'))
    }

    let lastArea: string | null = null

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (!t?.closest) return
      const node = t.closest('[data-area]')
      if (!node || !(node instanceof SVGElement)) return
      const area = node.getAttribute('data-area')
      if (!area || area === lastArea) return
      lastArea = area
      clear()
      root.querySelectorAll(`[data-area="${escapeAreaSelector(area)}"]`).forEach((n) => n.classList.add('parliament-hover'))
    }

    const onLeave = () => {
      lastArea = null
      clear()
    }

    root.addEventListener('mouseover', onOver)
    root.addEventListener('mouseleave', onLeave)
    return () => {
      root.removeEventListener('mouseover', onOver)
      root.removeEventListener('mouseleave', onLeave)
      clear()
    }
  }, [markup])

  const legend = useMemo(
    () => [{ id: 'coord', label: 'Coordinacion', pct: coordinationPercent, color: coordinationColor }, ...areas.map((a) => ({ ...a, pct: a.percent }))],
    [coordinationPercent, coordinationColor, areas],
  )

  return (
    <div className="parliament-ops-chart">
      {error ? <p className="parliament-ops-error">{error}</p> : null}
      {markup ? (
        <div ref={wrapRef} className="parliament-ops-svg-wrap" dangerouslySetInnerHTML={{ __html: markup }} />
      ) : !error ? (
        <p className="parliament-ops-loading">Cargando grafica…</p>
      ) : null}
      <ul className="parliament-ops-legend" aria-label="Leyenda por area">
        {legend.map((item) => (
          <li key={item.id}>
            <span className="parliament-ops-swatch" style={{ background: item.color }} />
            <span className="parliament-ops-legend-label">{item.label}</span>
            <span className="parliament-ops-legend-pct">{Math.round(item.pct)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
