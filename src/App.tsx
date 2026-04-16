import { Navigate, Route, Routes } from 'react-router-dom'
import { ProgramsCatalogPage } from './pages/ProgramsCatalogPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/propuesta-1" replace />} />
      <Route path="/propuesta-1" element={<ProgramsCatalogPage proposalLabel="Propuesta 1" />} />
      <Route path="/propuesta-2" element={<ProgramsCatalogPage proposalLabel="Propuesta 2" />} />
      <Route path="/propuesta-3" element={<ProgramsCatalogPage proposalLabel="Propuesta 3" />} />
      <Route path="/dashboard/:slug" element={<PlaceholderPage />} />
      <Route path="*" element={<PlaceholderPage />} />
    </Routes>
  )
}
