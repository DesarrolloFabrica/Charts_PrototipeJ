import { ArrowRight, LayoutGrid } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProgramCard } from '../../types/catalog'

interface DashboardCardProps {
  program: ProgramCard
}

const integrationLabel = {
  estable: 'Integracion estable',
  parcial: 'Integracion parcial',
}

// Tarjeta reutilizable para cada tablero dentro de la grilla responsiva.
export function DashboardCard({ program }: DashboardCardProps) {
  return (
    <article className="dashboard-card" style={{ '--accent': program.accentColor } as React.CSSProperties}>
      <div className="dashboard-card__top">
        <span className="dashboard-icon" aria-hidden="true">
          <LayoutGrid size={16} />
        </span>
        <span className="dashboard-badge">{program.categoryLabel}</span>
      </div>

      <h3>{program.name}</h3>
      <p>{program.description}</p>

      <div className="dashboard-meta">
        <span>{program.widgetsCount} widgets</span>
        <span>{integrationLabel[program.integrationStatus]}</span>
      </div>

      <div className="dashboard-progress" aria-hidden="true">
        <div className="dashboard-progress__bar" style={{ width: `${program.progress}%` }} />
      </div>

      <Link to={program.route} className="dashboard-cta" aria-label={`Entrar al tablero ${program.name}`}>
        Entrar al tablero
        <span className="cta-icon">
          <ArrowRight size={14} />
        </span>
      </Link>
    </article>
  )
}
