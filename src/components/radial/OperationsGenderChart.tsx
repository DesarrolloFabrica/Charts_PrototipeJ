import type { CSSProperties } from 'react'

const SILUETA_HOMBRE = '/img/Dashboard/Proyeccion_Social/siluetaH.svg'
const SILUETA_MUJER = '/img/Dashboard/Proyeccion_Social/SiluetaM.svg'

export interface OperationsGenderChartProps {
  menPercent: number
  womenPercent: number
  /** Relleno silueta hombre (índigo / lavanda área) */
  menFillColor: string
  /** Relleno silueta mujer (violeta suave área) */
  womenFillColor: string
  /** Silueta “vacía” (contraste sobre fondo oscuro) */
  emptyColor?: string
}

function clampPct(n: number) {
  if (Number.isNaN(n) || n < 0) return 0
  if (n > 100) return 100
  return n
}

function maskLayers(src: string): Pick<
  CSSProperties,
  'WebkitMaskImage' | 'maskImage' | 'WebkitMaskRepeat' | 'maskRepeat' | 'WebkitMaskPosition' | 'maskPosition'
> {
  return {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center bottom',
    maskPosition: 'center bottom',
  }
}

function SilhouetteColumn({
  src,
  percent,
  label,
  fillColor,
  emptyColor,
}: {
  src: string
  percent: number
  label: string
  fillColor: string
  emptyColor: string
}) {
  const p = clampPct(percent)
  const mask = maskLayers(src)
  /** Recorte inferior exacto: p% de altura visible; evita errores del degradado + máscara. */
  const topCropPct = Math.min(100, Math.max(0, 100 - p))

  return (
    <div className="gender-ops-figure">
      <span className="gender-ops-pct" aria-hidden="true">
        {Math.round(p)}%
      </span>
      <div className="gender-ops-silhouette-stack">
        <div className="gender-ops-sil-layer gender-ops-sil-base" style={{ ...mask, backgroundColor: emptyColor }} />
        <div
          className="gender-ops-sil-layer gender-ops-sil-fill"
          style={
            {
              ...mask,
              backgroundColor: fillColor,
              clipPath: `inset(${topCropPct}% 0 0 0)`,
              WebkitClipPath: `inset(${topCropPct}% 0 0 0)`,
            } as CSSProperties
          }
        />
      </div>
      <span className="gender-ops-label">{label}</span>
    </div>
  )
}

/**
 * Comparación hombres vs mujeres (dirección de operaciones) con siluetas SVG en `public/`.
 */
export function OperationsGenderChart({
  menPercent,
  womenPercent,
  menFillColor,
  womenFillColor,
  emptyColor = '#4a4568',
}: OperationsGenderChartProps) {
  const total = menPercent + womenPercent
  /** Parte hombres 0–1; si los datos no cuadran, se normaliza al total declarado. */
  const menShare = total > 0 ? menPercent / total : 0.5
  /** Enteros que suman 100: la mujer es siempre el complemento del hombre. */
  const menDisplay = Math.round(menShare * 100)
  const womenDisplay = 100 - menDisplay
  /** Mismo valor que el número mostrado para que el relleno coincida con la etiqueta. */
  const menFill = menDisplay
  const womenFill = womenDisplay

  return (
    <div
      className="gender-ops-chart"
      role="img"
      aria-label={`Distribución dirección de operaciones: ${menDisplay} por ciento hombres, ${womenDisplay} por ciento mujeres`}
    >
      <SilhouetteColumn
        src={SILUETA_HOMBRE}
        percent={menFill}
        label="Hombres"
        fillColor={menFillColor}
        emptyColor={emptyColor}
      />
      <SilhouetteColumn
        src={SILUETA_MUJER}
        percent={womenFill}
        label="Mujeres"
        fillColor={womenFillColor}
        emptyColor={emptyColor}
      />
    </div>
  )
}
