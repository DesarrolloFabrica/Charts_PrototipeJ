interface CatalogHeroProps {
  proposalTitle: string
}

// Bloque descriptivo principal con jerarquia editorial de la vista.
export function CatalogHero({ proposalTitle }: CatalogHeroProps) {
  return (
    <section className="catalog-hero" aria-label="Descripcion del catalogo">
      <span className="section-tag">CATALOGO</span>
      <h1>{proposalTitle}</h1>
      <p>
        Explora todos los modulos del ecosistema, filtra por dominio o estado de integracion
        y abre el tablero interno de cada programa.
      </p>
    </section>
  )
}
