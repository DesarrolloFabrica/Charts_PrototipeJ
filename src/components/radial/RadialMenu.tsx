import type { ProgramCard } from '../../types/catalog'
import { getRadialPoint } from '../../utils/radialMath'
import { RadialCenter } from './RadialCenter'
import { RadialNode } from './RadialNode'

interface RadialMenuProps {
  programs: ProgramCard[]
  activeProgramId: number | null
  onSelectProgram: (id: number) => void
}

const ORBIT_RADIUS = 300
const PLANET_OFFSET_X = -70
const PLANET_OFFSET_Y = -80

export function RadialMenu({ programs, activeProgramId, onSelectProgram }: RadialMenuProps) {
  const activeProgram = programs.find((program) => program.id === activeProgramId) ?? programs[0] ?? null
  const axisLines = Array.from({ length: 8 }, (_, index) => index * 45)

  if (!activeProgram) return <div className="radial-menu-stage radial-menu-empty">No hay programas para mostrar.</div>

  return (
    <div className="radial-menu-stage" aria-label="Menu radial interactivo de programas">
      <div className="radial-orbit-field">
        <div className="radial-scan-sweep" aria-hidden="true" />
        {axisLines.map((angle) => (
          <span key={angle} className="radial-axis-line" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }} aria-hidden="true" />
        ))}
        <div className="radial-track track-outer" aria-hidden="true" />
        <div className="radial-track track-mid" aria-hidden="true" />
        <div className="radial-track track-inner" aria-hidden="true" />

        {programs.map((program, index) => {
          const { x, y } = getRadialPoint(index, programs.length, ORBIT_RADIUS)
          return (
            <RadialNode
              key={program.id}
              program={program}
              isActive={program.id === activeProgram.id}
              x={x + PLANET_OFFSET_X}
              y={y + PLANET_OFFSET_Y}
              delayMs={index * 55}
              onSelect={onSelectProgram}
            />
          )
        })}

        <RadialCenter activeProgram={activeProgram} />
      </div>
    </div>
  )
}

