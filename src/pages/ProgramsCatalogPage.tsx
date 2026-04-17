import { useMemo } from 'react'
import { CatalogHeader } from '../components/catalog/CatalogHeader'
import { CatalogHero } from '../components/catalog/CatalogHero'
import { CatalogSectionHeader } from '../components/catalog/CatalogSectionHeader'
import { DashboardCard } from '../components/catalog/DashboardCard'
import { ProposalTabs } from '../components/catalog/ProposalTabs'
import { RadialProgramsShowcase } from '../components/radial/RadialProgramsShowcase'
import { mockPrograms } from '../data/mockPrograms'
import { useRadialSelection } from '../hooks/useRadialSelection'

interface ProgramsCatalogPageProps {
  proposalLabel: string
}

// Vista principal del catalogo con filtros locales y lista de tableros.
export function ProgramsCatalogPage({ proposalLabel }: ProgramsCatalogPageProps) {
  // Ocultar temporalmente Programa 8 y 9 sin borrar mock original.
  const visiblePrograms = useMemo(
    () => mockPrograms.filter((program) => ![8, 9].includes(program.id)),
    [],
  )

  const isProposalOne = proposalLabel === 'Propuesta 1'
  const { activeProgramId, setActiveProgramId } = useRadialSelection(visiblePrograms)

  return (
    <main className="catalog-page">
      <CatalogHeader />
      <ProposalTabs />
      <CatalogHero proposalTitle={`Programas y tableros disponibles (${proposalLabel})`} />

      <section className="catalog-listing" aria-label="Listado de tableros">
        <CatalogSectionHeader results={visiblePrograms.length} />
        {isProposalOne ? (
          <RadialProgramsShowcase
            programs={visiblePrograms}
            activeProgramId={activeProgramId}
            onSelectProgram={setActiveProgramId}
          />
        ) : (
          <div className="cards-grid">
            {visiblePrograms.map((program) => (
              <DashboardCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
