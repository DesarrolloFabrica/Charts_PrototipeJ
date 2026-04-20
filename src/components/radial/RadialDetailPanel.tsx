import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ProgramCard } from '../../types/catalog'
import { mockPrograms } from '../../data/mockPrograms'
import { OperationsGenderChart } from './OperationsGenderChart'
import { ParliamentOperationsChart } from './ParliamentOperationsChart'
import type { ParliamentAreaSlice } from './ParliamentOperationsChart'

interface RadialDetailPanelProps {
  activeProgram: ProgramCard
}

/** Color de acento por área (línea inferior del header). */
function getProgramHeaderColor(programName: string) {
  const normalizedName = programName.toLowerCase()
  if (normalizedName.includes('fabrica')) return '#267f77'
  if (normalizedName.includes('presupuesto')) return '#043859'
  if (normalizedName.includes('ingles')) return '#52b4f1'
  if (normalizedName.includes('proyeccion social')) return '#353f84'
  if (normalizedName.includes('nomina')) return '#023341'
  if (normalizedName.includes('practicas')) return '#f2a35e'
  if (normalizedName.includes('vacantes')) return '#6671d8'
  return '#355e9a'
}

/** Fondo del contenedor principal (header + KPIs + gráficas + CTA) por área. */
function getProgramContainerBackground(programName: string) {
  const n = programName.toLowerCase()
  if (n.includes('programa 8') || n.includes('informe 8')) return '#EEF7F6'
  if (n.includes('programa 9') || n.includes('informe 9')) return '#F5F7FA'
  if (n.includes('fabrica')) return '#EAF6F4'
  if (n.includes('presupuesto')) return '#EEF7F8'
  if (n.includes('proyeccion social')) return '#F1EFFB'
  if (n.includes('nomina')) return '#EDF8F8'
  if (n.includes('practicas')) return '#F8F3EE'
  if (n.includes('vacantes')) return '#F7F3FA'
  if (n.includes('ingles')) return '#EAF5FB'
  return '#f7f9fc'
}

interface ProgramBorderTokens {
  normal: string
  hover: string
  active: string
}

const defaultBorderTokens: ProgramBorderTokens = {
  normal: '#D9DEE5',
  hover: '#949ca6',
  active: '#2f3a58',
}

/** Bordes 1px por área: reposo, hover, interacción activa (p. ej. :active / foco). */
function getProgramBorderTokens(programName: string): ProgramBorderTokens {
  const n = programName.toLowerCase()
  if (n.includes('programa 8') || n.includes('informe 8')) {
    return { normal: '#CBE7E3', hover: '#5ec0b4', active: '#107ba7' }
  }
  if (n.includes('programa 9') || n.includes('informe 9')) {
    return { normal: '#D9DEE5', hover: '#949ca6', active: '#2f3a58' }
  }
  if (n.includes('fabrica')) {
    return { normal: '#BFE5DF', hover: '#88d5cd', active: '#4faaa1' }
  }
  if (n.includes('presupuesto')) {
    return { normal: '#BFE3E8', hover: '#0895a5', active: '#043859' }
  }
  if (n.includes('proyeccion social')) {
    return { normal: '#D9D8F5', hover: '#bbbcef', active: '#553ef1' }
  }
  if (n.includes('nomina')) {
    return { normal: '#BFE6E8', hover: '#73d9d9', active: '#037f8b' }
  }
  if (n.includes('practicas')) {
    return { normal: '#E8D8D8', hover: '#f2a35e', active: '#bb3559' }
  }
  if (n.includes('vacantes')) {
    return { normal: '#DDD8F3', hover: '#6671d8', active: '#ed4c7e' }
  }
  if (n.includes('ingles')) {
    return { normal: '#C9E3F3', hover: '#99d0f1', active: '#52b4f1' }
  }
  return defaultBorderTokens
}

interface ChartSlideBars {
  id: string
  title: string
  variant: 'bars'
  /** Altura de barras mock 0–100 */
  bars: number[]
}

interface ChartSlideGenderOperations {
  id: string
  title: string
  variant: 'gender-operations'
  menPercent: number
  womenPercent: number
}

interface ChartSlideParliament {
  id: string
  title: string
  variant: 'parliament-operations'
  coordinationPercent: number
  coordinationColor: string
  areas: ParliamentAreaSlice[]
}

type ChartSlide = ChartSlideBars | ChartSlideGenderOperations | ChartSlideParliament

interface ProgramKpi {
  id: string
  label: string
  value: number
}

interface ProgramStateSegment {
  id: string
  label: string
  value: number
}

interface ProgramPalette {
  accent: string
  kpi: string[]
  chart: string[]
}

function getProgramPalette(programName: string): ProgramPalette {
  const normalizedName = programName.toLowerCase()

  if (normalizedName.includes('fabrica')) {
    return {
      accent: '#267f77',
      kpi: ['#2b9e91', '#36b8a9', '#48c9ba'],
      chart: ['#2a8f84', '#38a89b', '#46bdb0', '#57cfc2', '#34a59a', '#299084', '#4cc3b5'],
    }
  }
  if (normalizedName.includes('presupuesto')) {
    return {
      accent: '#043859',
      kpi: ['#0a4f7c', '#14649a', '#1f79b8'],
      chart: ['#0c4d78', '#17608f', '#1f72a8', '#2b86c2', '#3898d7', '#4aa7e3', '#62b7ee'],
    }
  }
  if (normalizedName.includes('ingles')) {
    return {
      accent: '#52b4f1',
      kpi: ['#4aa9e6', '#5cb8f3', '#75c5f7'],
      chart: ['#4faef0', '#64baf3', '#79c6f7', '#8ad0fb', '#5db2ed', '#74c1f4', '#89cff9'],
    }
  }
  if (normalizedName.includes('proyeccion social')) {
    return {
      accent: '#353f84',
      kpi: ['#4450a0', '#5562bb', '#6a76cd'],
      chart: ['#3f4a96', '#505cad', '#616ec1', '#7381d3', '#5965b4', '#4c58a5', '#6875c8'],
    }
  }
  if (normalizedName.includes('nomina')) {
    return {
      accent: '#023341',
      kpi: ['#0a4d61', '#136176', '#1d768d'],
      chart: ['#0b4d62', '#146078', '#1d748f', '#2a88a5', '#379ab6', '#4caec9', '#68c1d7'],
    }
  }
  if (normalizedName.includes('practicas')) {
    return {
      accent: '#f2a35e',
      kpi: ['#ef9b52', '#f4ad72', '#f7be8f'],
      chart: ['#ee9a50', '#f2a762', '#f5b475', '#f7c288', '#f1a35d', '#f6b97e', '#f9cb9b'],
    }
  }
  if (normalizedName.includes('vacantes')) {
    return {
      accent: '#6671d8',
      kpi: ['#6d79e0', '#7f89e7', '#9099ed'],
      chart: ['#6d78df', '#7e88e6', '#8f98ec', '#a1a9f1', '#7b85e2', '#6f7ada', '#99a2ed'],
    }
  }

  return {
    accent: '#355e9a',
    kpi: ['#3f6bad', '#4f7dc1', '#6090d2'],
    chart: ['#3f6eae', '#4d7fc0', '#5f91d2', '#74a4df', '#4d7abc', '#5e8ece', '#76a5e0'],
  }
}

function accentColorForProgramName(name: string): string {
  const p = mockPrograms.find((x) => x.name.toLowerCase() === name.toLowerCase())
  return p?.accentColor ?? '#7381d3'
}

/** Porcentajes mock por área (planetas); suman 100 con coordinación. */
function getParliamentSlideMock(program: ProgramCard): Omit<ChartSlideParliament, 'id' | 'title' | 'variant'> {
  const coordinationPercent = 10 + (program.id % 10)
  const rest = 100 - coordinationPercent
  const labels = ['Ingles', 'Fabrica', 'Presupuestos', 'Nomina', 'Practicas', 'Vacantes', 'Proyeccion social'] as const
  const weights = [22, 18, 17, 15, 14, 9, 5]
  const sumW = weights.reduce((a, b) => a + b, 0)
  const raw = weights.map((w) => (w / sumW) * rest)
  const pcts = raw.map((v) => Math.floor(v))
  let diff = rest - pcts.reduce((a, b) => a + b, 0)
  const fracOrder = raw
    .map((v, i) => ({ i, f: v - Math.floor(v) }))
    .sort((a, b) => b.f - a.f)
  for (let k = 0; k < diff; k++) {
    pcts[fracOrder[k % fracOrder.length].i] += 1
  }
  const areas: ParliamentAreaSlice[] = labels.map((label, i) => ({
    id: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    percent: pcts[i] ?? 0,
    color: accentColorForProgramName(label),
  }))
  return {
    coordinationPercent,
    coordinationColor: '#4a4578',
    areas,
  }
}

/** Slides mock por programa; solo UI, sin datos reales. */
function getChartSlides(program: ProgramCard): ChartSlide[] {
  const seed = program.id % 3
  const baseBars = [42, 68, 55, 80, 48, 72, 60].map((v) => (v + seed * 7) % 92)

  if (program.name.toLowerCase().includes('proyeccion social')) {
    const gSeed = program.id % 7
    /** Porcentaje hombres (mujeres = 100 - men siempre). */
    const men = 32 + ((gSeed * 5) % 37)
    const parliament = getParliamentSlideMock(program)
    return [
      {
        id: 'dir-ops-genero',
        title: 'Dirección de operaciones',
        variant: 'gender-operations',
        menPercent: men,
        womenPercent: 100 - men,
      },
      {
        id: 'dir-ops-parlamento',
        title: 'Composicion direccion de operaciones',
        variant: 'parliament-operations',
        coordinationPercent: parliament.coordinationPercent,
        coordinationColor: parliament.coordinationColor,
        areas: parliament.areas,
      },
      {
        id: 'trend-ps',
        title: 'Tendencia operativa',
        variant: 'bars',
        bars: [...baseBars].reverse(),
      },
      {
        id: 'mix-ps',
        title: 'Composicion',
        variant: 'bars',
        bars: baseBars.map((v) => (v + 15) % 95),
      },
    ]
  }

  return [
    {
      id: 'kpi',
      title: 'Indicadores clave',
      variant: 'bars',
      bars: baseBars,
    },
    {
      id: 'trend',
      title: 'Tendencia operativa',
      variant: 'bars',
      bars: [...baseBars].reverse(),
    },
    {
      id: 'mix',
      title: 'Composicion',
      variant: 'bars',
      bars: baseBars.map((v) => (v + 15) % 95),
    },
  ]
}

function getProgramKpis(program: ProgramCard): ProgramKpi[] {
  return [
    { id: 'projects', label: 'Total Proyectos', value: program.widgetsCount + (program.id % 4) + 6 },
    { id: 'modules', label: 'Total Modulos', value: program.widgetsCount + 4 },
    { id: 'charts', label: 'Total Graficos', value: program.widgetsCount + 9 },
    { id: 'materials', label: 'Total Materias', value: program.widgetsCount + (program.id % 6) },
    { id: 'close-rate', label: 'Tasas de cierre', value: 70 + (program.progress % 25) },
    { id: 'requests', label: 'Solicitudes vencidas', value: (program.id * 3) % 19 + 2 },
  ]
}

function getProgramStateSegments(program: ProgramCard): ProgramStateSegment[] {
  const seed = (program.id * 17) % 21
  const sinIniciar = 34 + (seed % 12)
  const entregados = 18 + ((seed * 3) % 11)
  const abiertos = 12 + ((seed * 5) % 9)
  const enRevision = 10 + ((seed * 7) % 8)
  const subtotal = sinIniciar + entregados + abiertos + enRevision
  const enCurso = 100 - subtotal

  return [
    { id: 'sin-iniciar', label: 'Sin iniciar', value: sinIniciar },
    { id: 'entregados', label: 'Entregados', value: entregados },
    { id: 'abiertos', label: 'Abiertos', value: abiertos },
    { id: 'en-revision', label: 'En revision', value: enRevision },
    { id: 'en-curso', label: 'En curso', value: enCurso },
  ]
}

function getHeaderObjectImage(programName: string) {
  const normalizedName = programName.toLowerCase()
  if (normalizedName.includes('ingles')) return '/img/Dashboard/ObjetosTarjeta/Im.png'
  if (normalizedName.includes('vacantes')) return '/img/Dashboard/ObjetosTarjeta/Lupa.png'
  if (normalizedName.includes('nomina')) return '/img/Dashboard/ObjetosTarjeta/Peso.png'
  if (normalizedName.includes('proyeccion social')) return '/img/Dashboard/ObjetosTarjeta/Personas.png'
  if (normalizedName.includes('practicas')) return '/img/Dashboard/ObjetosTarjeta/Birrete.png'
  return null
}

interface ProgramActiveBodyProps {
  activeProgram: ProgramCard
  headerColor: string
  borderTokens: ProgramBorderTokens
}

/**
 * Contenido del panel; se monta con `key` desde el padre para reiniciar el carrusel
 * al cambiar de programa sin efectos ni setState durante render.
 */
function ProgramActiveBody({ activeProgram, headerColor, borderTokens }: ProgramActiveBodyProps) {
  const slides = useMemo(() => getChartSlides(activeProgram), [activeProgram])
  const kpis = useMemo(() => getProgramKpis(activeProgram), [activeProgram])
  const stateSegments = useMemo(() => getProgramStateSegments(activeProgram), [activeProgram])
  const palette = useMemo(() => getProgramPalette(activeProgram.name), [activeProgram.name])
  const headerObjectImage = useMemo(() => getHeaderObjectImage(activeProgram.name), [activeProgram.name])
  const [slideIndex, setSlideIndex] = useState(0)

  const currentSlide = slides[slideIndex] ?? slides[0]

  const goPrev = () => {
    setSlideIndex((i) => (i - 1 + slides.length) % slides.length)
  }

  const goNext = () => {
    setSlideIndex((i) => (i + 1) % slides.length)
  }

  return (
    <motion.div
      className="program-active-layout"
      style={
        {
          '--program-accent': palette.accent,
          '--panel-border': borderTokens.normal,
          '--panel-border-hover': borderTokens.hover,
          '--panel-border-active': borderTokens.active,
        } as CSSProperties
      }
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
    >
      {/* 1) Header: título + descripción corta; acento solo en borde inferior */}
      <header className="active-program-header" style={{ '--header-color': headerColor } as CSSProperties}>
        <div className="active-program-header-main">
          <span className="section-tag">PROGRAMA ACTIVO</span>
          <h3>{activeProgram.name}</h3>
          <p>{activeProgram.description}</p>
        </div>
        <div className="active-program-header-media" aria-hidden="true">
          {headerObjectImage ? <img src={headerObjectImage} alt="" className="active-program-header-media-image" /> : null}
        </div>
      </header>

      {/* 2) KPIs compactos estilo tablero */}
      <section className="program-kpis-board" aria-label="Resumen de estado del proyecto">
        <div className="program-kpis-grid">
          {kpis.map((kpi, index) => (
            <article
              key={kpi.id}
              className="program-kpi-card"
              style={{ '--kpi-accent': palette.kpi[index % palette.kpi.length] } as CSSProperties}
            >
              <p className="program-kpi-value">{kpi.value}</p>
              <h4>{kpi.label}</h4>
            </article>
          ))}
        </div>
        {/* El progreso queda aislado como señal primaria, sin competir con las tarjetas KPI. */}
        <div className="program-state-wrap">
          <div className="program-state-label">Resumen de Estado de Proyectos</div>
          <div className="program-state-track" role="img" aria-label="Barra de estado compuesta por segmentos que suman 100 por ciento">
            {stateSegments.map((segment, index) => (
              <span
                key={segment.id}
                className="program-state-segment"
                style={
                  {
                    width: `${segment.value}%`,
                    '--state-segment-color': palette.chart[index % palette.chart.length],
                  } as CSSProperties
                }
              >
                {segment.value}%
              </span>
            ))}
          </div>
          <div className="program-state-legend" aria-label="Leyenda de segmentos de estado">
            {stateSegments.map((segment, index) => (
              <span key={`legend-${segment.id}`} className="program-state-legend-item">
                <span
                  className="program-state-legend-dot"
                  style={{ '--state-segment-color': palette.chart[index % palette.chart.length] } as CSSProperties}
                />
                {segment.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Un solo bloque de gráficas para evitar "cajas dentro de cajas". */}
      <section className="program-carousel" aria-label="Carrusel de graficas">
        <h4 className="program-carousel-title">Graficas</h4>
        <div className="program-carousel-track">
          <button type="button" className="carousel-nav carousel-nav-left" onClick={goPrev} aria-label="Grafica anterior">
            <ChevronLeft size={20} />
          </button>

          <div className="carousel-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                className="carousel-slide"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h5>{currentSlide.title}</h5>
                {currentSlide.variant === 'gender-operations' ? (
                  <>
                    <OperationsGenderChart
                      menPercent={currentSlide.menPercent}
                      womenPercent={currentSlide.womenPercent}
                      menFillColor={palette.chart[1]}
                      womenFillColor={palette.chart[3]}
                    />
                    <p className="carousel-caption">
                      Datos ilustrativos — personal de dirección de operaciones (hombres vs mujeres).
                    </p>
                  </>
                ) : currentSlide.variant === 'parliament-operations' ? (
                  <>
                    <ParliamentOperationsChart
                      coordinationPercent={currentSlide.coordinationPercent}
                      coordinationColor={currentSlide.coordinationColor}
                      areas={currentSlide.areas}
                    />
                    <p className="carousel-caption">
                      Cada punto del hemiciclo es un asiento simbolico; el ovalo es Coordinacion. Porcentajes mock por
                      area (suman 100%).
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mock-bar-chart" role="img" aria-label={`Grafica mock: ${currentSlide.title}`}>
                      {currentSlide.bars.map((h, i) => (
                        <span
                          key={`${currentSlide.id}-bar-${i}`}
                          className="mock-bar"
                          style={{ height: `${h}%`, '--bar-color': palette.chart[i % palette.chart.length] } as CSSProperties}
                        />
                      ))}
                    </div>
                    <p className="carousel-caption">Mock visual — reemplazar por gráficas reales.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button type="button" className="carousel-nav carousel-nav-right" onClick={goNext} aria-label="Grafica siguiente">
            <ChevronRight size={20} />
          </button>
        </div>
        <footer className="program-footer">
          <button type="button" className="program-more-info-btn">
            Mas informacion
          </button>
        </footer>
      </section>
    </motion.div>
  )
}

export function RadialDetailPanel({ activeProgram }: RadialDetailPanelProps) {
  const headerColor = getProgramHeaderColor(activeProgram.name)
  const containerBackground = getProgramContainerBackground(activeProgram.name)
  const borderTokens = getProgramBorderTokens(activeProgram.name)

  return (
    <section
      className="radial-detail-panel"
      aria-label="Detalle del programa seleccionado"
      style={{ backgroundColor: containerBackground } as CSSProperties}
    >
      <AnimatePresence mode="wait">
        <ProgramActiveBody
          key={activeProgram.id}
          activeProgram={activeProgram}
          headerColor={headerColor}
          borderTokens={borderTokens}
        />
      </AnimatePresence>
    </section>
  )
}
