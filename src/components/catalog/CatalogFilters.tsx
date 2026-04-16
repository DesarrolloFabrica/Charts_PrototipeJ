import type { ChangeEvent } from 'react'
import type { IntegrationStatus, ProgramCategory } from '../../types/catalog'

interface CatalogFiltersProps {
  searchTerm: string
  category: ProgramCategory | 'all'
  integration: IntegrationStatus | 'all'
  totalResults: number
  onSearchChange: (value: string) => void
  onCategoryChange: (value: ProgramCategory | 'all') => void
  onIntegrationChange: (value: IntegrationStatus | 'all') => void
}

// Filtros locales para texto, categoria e integracion de tarjetas.
export function CatalogFilters({
  searchTerm,
  category,
  integration,
  totalResults,
  onSearchChange,
  onCategoryChange,
  onIntegrationChange,
}: CatalogFiltersProps) {
  return (
    <section className="catalog-filters" aria-label="Filtros del catalogo">
      <div className="filters-grid">
        <input
          type="search"
          value={searchTerm}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)}
          placeholder="Nombre, dominio o palabra clave..."
          aria-label="Filtrar por nombre"
        />

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as ProgramCategory | 'all')}
          aria-label="Filtrar por categoria"
        >
          <option value="all">Todas las categorias</option>
          <option value="operativa">Gestion operativa</option>
          <option value="finanzas">Finanzas</option>
          <option value="impacto-social">Impacto social</option>
          <option value="capital-humano">Capital humano</option>
          <option value="talento-desempeno">Talento y desempeno</option>
        </select>

        <select
          value={integration}
          onChange={(event) => onIntegrationChange(event.target.value as IntegrationStatus | 'all')}
          aria-label="Filtrar por integracion"
        >
          <option value="all">Todos</option>
          <option value="estable">Integracion estable</option>
          <option value="parcial">Integracion parcial</option>
        </select>
      </div>

      <p className="filters-result-text">Mostrando todos los programas ({totalResults})</p>
    </section>
  )
}
