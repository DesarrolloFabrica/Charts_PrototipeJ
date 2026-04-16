import { Link, useLocation } from 'react-router-dom'

// Placeholder minimo para validar rutas mock por propuesta y dashboard.
export function PlaceholderPage() {
  const location = useLocation()

  return (
    <main className="placeholder-page">
      <p className="section-tag">RUTA MOCK</p>
      <h1>Vista en construccion</h1>
      <p>
        Esta pantalla corresponde a <strong>{location.pathname}</strong>. La navegacion base
        ya esta lista para conectar contenido real.
      </p>
      <Link to="/propuesta-1" className="back-link">
        Volver al catalogo
      </Link>
    </main>
  )
}
