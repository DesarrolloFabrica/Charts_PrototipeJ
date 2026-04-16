import { NavLink } from 'react-router-dom'

const proposalItems = [
  { label: 'Inicio', to: '/propuesta-1' },
  { label: 'Programas', to: '/propuesta-2' },
  { label: 'Trazabilidad', to: '/propuesta-3' },
  { label: 'Consultas', to: '/propuesta-1' },
  { label: 'Auditoria', to: '/propuesta-2' },
  { label: 'Configuracion', to: '/propuesta-3' },
]

// Esta barra permite alternar entre propuestas visuales del mismo catalogo.
export function ProposalTabs() {
  return (
    <nav className="proposal-tabs" aria-label="Navegacion de propuestas">
      {proposalItems.map((item) => (
        <NavLink
          key={`${item.label}-${item.to}`}
          to={item.to}
          className={({ isActive }) => `proposal-tab ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
