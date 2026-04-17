import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { ProgramCard } from '../../types/catalog'

interface RadialNodeProps {
  program: ProgramCard
  isActive: boolean
  x: number
  y: number
  delayMs: number
  onSelect: (id: number) => void
}

function getProgramInitial(programName: string) {
  return programName.trim().charAt(0).toUpperCase()
}

function getPlanetImageForProgram(programName: string) {
  const normalizedName = programName.toLowerCase()
  if (normalizedName.includes('ingles')) return '/img/Dashboard/planetas/Planta_Idiomas.png'
  if (normalizedName.includes('fabrica')) return '/img/Dashboard/planetas/Planeta_Fabrica.png'
  if (normalizedName.includes('nomina')) return '/img/Dashboard/planetas/Planeta_Nomina.png'
  if (normalizedName.includes('practicas')) return '/img/Dashboard/planetas/Planeta_Practicas.png'
  if (normalizedName.includes('proyeccion social')) return '/img/Dashboard/planetas/Planeta_ProyeccionSocial.png'
  if (normalizedName.includes('presupuesto')) return '/img/Dashboard/planetas/Planeta_Presupuesto.png'
  if (normalizedName.includes('vacantes')) return '/img/Dashboard/planetas/Planeta_Vacantes.png'
  return null
}

export function RadialNode({ program, isActive, x, y, delayMs, onSelect }: RadialNodeProps) {
  const planetImagePath = getPlanetImageForProgram(program.name)
  const hasCustomPlanetImage = Boolean(planetImagePath)

  return (
    <motion.button
      type="button"
      className={`radial-orbit-node ${isActive ? 'active' : ''} ${hasCustomPlanetImage ? 'planet-image-node' : ''}`}
      onClick={() => onSelect(program.id)}
      style={{ '--accent': program.accentColor } as CSSProperties}
      aria-label={`Seleccionar ${program.name}`}
      aria-pressed={isActive}
      initial={{ opacity: 0, scale: 0.75, x, y }}
      animate={{ opacity: 1, scale: isActive ? 1.08 : 1, x, y }}
      transition={{ duration: 0.35, delay: delayMs / 1000 }}
      whileHover={{ scale: isActive ? 1.12 : 1.07 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="radial-node-planet" aria-hidden="true">
        {hasCustomPlanetImage ? (
          <img src={planetImagePath ?? undefined} alt="" className="radial-node-planet-image" />
        ) : (
          getProgramInitial(program.name)
        )}
      </span>
      <span className="radial-node-label">{program.name}</span>
    </motion.button>
  )
}

