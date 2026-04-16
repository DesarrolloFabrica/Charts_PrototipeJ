import { useMemo, useState } from 'react'
import { CatalogFilters } from '../components/catalog/CatalogFilters'
import { CatalogHeader } from '../components/catalog/CatalogHeader'
import { CatalogHero } from '../components/catalog/CatalogHero'
import { CatalogSectionHeader } from '../components/catalog/CatalogSectionHeader'
import { DashboardCard } from '../components/catalog/DashboardCard'
import { ProposalTabs } from '../components/catalog/ProposalTabs'
import { RadialProgramsShowcase } from '../components/radial/RadialProgramsShowcase'
import { mockPrograms } from '../data/mockPrograms'
import { useRadialSelection } from '../hooks/useRadialSelection'
import type { IntegrationStatus, ProgramCategory } from '../types/catalog'

interface ProgramsCatalogPageProps {
  proposalLabel: string
}

// Vista principal del catalogo con filtros locales y lista de tableros.
export function ProgramsCatalogPage({ proposalLabel }: ProgramsCatalogPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState<ProgramCategory | 'all'>('all')
  const [integration, setIntegration] = useState<IntegrationStatus | 'all'>('all')

  // Memo para evitar recalculo de la lista al renderizar componentes no relacionados.
  const filteredPrograms = useMemo(() => {
    return mockPrograms.filter((program) => {
      const normalizedSearch = searchTerm.trim().toLowerCase()
      const matchesSearch =
        normalizedSearch.length === 0 ||
        program.name.toLowerCase().includes(normalizedSearch) ||
        program.description.toLowerCase().includes(normalizedSearch) ||
        program.categoryLabel.toLowerCase().includes(normalizedSearch)

      const matchesCategory = category === 'all' || program.category === category
      const matchesIntegration = integration === 'all' || program.integrationStatus === integration

      return matchesSearch && matchesCategory && matchesIntegration
    })
  }, [searchTerm, category, integration])

  // Ocultar temporalmente Programa 8 y 9 sin borrar mock original.
  const visiblePrograms = useMemo(
    () => filteredPrograms.filter((program) => ![8, 9].includes(program.id)),
    [filteredPrograms],
  )

  const isProposalOne = proposalLabel === 'Propuesta 1'
  const { activeProgramId, setActiveProgramId } = useRadialSelection(visiblePrograms)

  return (
    <main className="catalog-page">
      <CatalogHeader />
      <ProposalTabs />
      <CatalogHero proposalTitle={`Programas y tableros disponibles (${proposalLabel})`} />

      <CatalogFilters
        searchTerm={searchTerm}
        category={category}
        integration={integration}
        totalResults={visiblePrograms.length}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategory}
        onIntegrationChange={setIntegration}
      />

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
