import { useMemo } from 'react'
import type { ProgramCard } from '../../types/catalog'
import { getActiveProgram } from '../../utils/radialMath'
import { RadialDetailPanel } from './RadialDetailPanel'
import { RadialMenu } from './RadialMenu'

interface RadialProgramsShowcaseProps {
  programs: ProgramCard[]
  activeProgramId: number | null
  onSelectProgram: (id: number) => void
}

export function RadialProgramsShowcase({
  programs,
  activeProgramId,
  onSelectProgram,
}: RadialProgramsShowcaseProps) {
  const activeProgram = useMemo(
    () => getActiveProgram(programs, activeProgramId),
    [programs, activeProgramId],
  )

  if (!activeProgram) return <section className="radial-showcase radial-showcase-empty">Sin resultados.</section>

  return (
    <section className="radial-showcase">
      <div className="radial-showcase-left">
        {/* Encabezado compacto para que el foco visual sea el radial, no el bloque de texto. */}
        <header className="radial-showcase-heading">
          <span className="section-tag">EXPLORACION RADIAL</span>
          <h3 className="radial-showcase-title">Navega por programas</h3>
          <p className="radial-showcase-copy">
            Selecciona un nodo para enfocar el area y actualizar automaticamente el panel de metricas del lado derecho.
          </p>
        </header>
        <RadialMenu programs={programs} activeProgramId={activeProgram.id} onSelectProgram={onSelectProgram} />
      </div>
      <RadialDetailPanel activeProgram={activeProgram} />
    </section>
  )
}

