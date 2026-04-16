import { useMemo, useState } from 'react'
import type { ProgramCard } from '../types/catalog'
import { getActiveProgram } from '../utils/radialMath'

export function useRadialSelection(programs: ProgramCard[]) {
  const [activeProgramId, setActiveProgramId] = useState<number | null>(programs[0]?.id ?? null)

  const activeProgram = useMemo(
    () => getActiveProgram(programs, activeProgramId),
    [programs, activeProgramId],
  )

  return { activeProgramId: activeProgram?.id ?? null, activeProgram, setActiveProgramId }
}

