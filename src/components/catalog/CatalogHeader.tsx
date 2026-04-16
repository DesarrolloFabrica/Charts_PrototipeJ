import { Bell, ChevronDown } from 'lucide-react'

export function CatalogHeader() {
  return (
    <header className="catalog-header" aria-label="Cabecera del catalogo ODP CUN">
      <div className="header-block">
        <p className="header-system">SISTEMA ODP CUN</p>
        <p className="header-breadcrumb">Charts &gt; Programas</p>
      </div>

      <div className="header-search-wrap">
        <input
          className="header-search"
          type="search"
          placeholder="Buscar proyectos, paneles o metricas..."
          aria-label="Buscar proyectos"
        />
      </div>

      <div className="header-actions">
        <button type="button" className="icon-button" aria-label="Alertas">
          <Bell size={16} />
        </button>
        <button type="button" className="icon-button" aria-label="Perfil de usuario">
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  )
}
