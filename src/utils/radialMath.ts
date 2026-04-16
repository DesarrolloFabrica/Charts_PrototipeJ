import type { ProgramCard } from '../types/catalog'

export interface RadialPoint {
  x: number
  y: number
}

// Distribuye elementos equidistantes en una circunferencia.
export function getRadialPoint(index: number, total: number, radius: number): RadialPoint {
  const safeTotal = Math.max(total, 1)
  const angle = (index / safeTotal) * Math.PI * 2 - Math.PI / 2
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}

export function getActiveProgram(programs: ProgramCard[], activeProgramId: number | null) {
  return programs.find((program) => program.id === activeProgramId) ?? programs[0] ?? null
}

