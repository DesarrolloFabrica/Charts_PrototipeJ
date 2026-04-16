interface CatalogSectionHeaderProps {
  results: number
}

export function CatalogSectionHeader({ results }: CatalogSectionHeaderProps) {
  return (
    <header className="catalog-section-header">
      <div>
        <span className="section-tag">LISTADO</span>
        <h2>Todos los tableros</h2>
        <p>
          Tarjetas alineadas con la misma jerarquia de producto; el acento cromatico
          corresponde a cada programa.
        </p>
      </div>
      <span className="results-counter">{results} resultados</span>
    </header>
  )
}
