import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { ProgramCard } from '../../types/catalog'

interface RadialCenterProps {
  activeProgram: ProgramCard
}

function getCenterPlanetImage(programName: string) {
  const normalizedName = programName.toLowerCase()
  if (normalizedName.includes('ingles')) return '/img/Planta_Idiomas.png'
  if (normalizedName.includes('fabrica')) return '/img/Planeta_Fabrica.png'
  if (normalizedName.includes('nomina')) return '/img/Planeta_Nomina.png'
  if (normalizedName.includes('practicas')) return '/img/Planeta_Practicas.png'
  if (normalizedName.includes('proyeccion social')) return '/img/Planeta_ProyeccionSocial.png'
  if (normalizedName.includes('presupuesto')) return '/img/Planeta_Presupuesto.png'
  if (normalizedName.includes('vacantes')) return '/img/Planeta_Vacantes.png'
  return null
}

export function RadialCenter({ activeProgram }: RadialCenterProps) {
  const centerPlanetImage = getCenterPlanetImage(activeProgram.name)
  const hasCustomCenterImage = Boolean(centerPlanetImage)

  return (
    <div className="radial-center-anchor">
      <motion.div
        className={`radial-main-center ${hasCustomCenterImage ? 'factory-center-image-mode' : ''}`}
        style={{ '--accent': activeProgram.accentColor } as CSSProperties}
        key={activeProgram.id}
        initial={{ opacity: 0.65, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="radial-center-pulse" aria-hidden="true" />
        {hasCustomCenterImage ? (
          <img src={centerPlanetImage ?? undefined} alt="" className="radial-center-factory-image" />
        ) : (
          <>
            <span className="radial-center-tag">Area activa</span>
            <h4>{activeProgram.name}</h4>
            <p>{activeProgram.categoryLabel}</p>
          </>
        )}
      </motion.div>
    </div>
  )
}

