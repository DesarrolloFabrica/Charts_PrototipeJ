import { NavLink } from 'react-router-dom'

const proposalItems = [
  { label: 'Propuesta 1', to: '/propuesta-1' },
  { label: 'Propuesta 2', to: '/propuesta-2' },
  { label: 'Propuesta 3', to: '/propuesta-3' },
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
