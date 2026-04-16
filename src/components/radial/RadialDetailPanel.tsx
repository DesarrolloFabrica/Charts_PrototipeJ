import { Activity, ArrowRight, LayoutGrid, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ProgramCard } from '../../types/catalog'

interface RadialDetailPanelProps {
  activeProgram: ProgramCard
}

const integrationLabel = {
  estable: 'Integracion estable',
  parcial: 'Integracion parcial',
}

export function RadialDetailPanel({ activeProgram }: RadialDetailPanelProps) {
  return (
    <section className="radial-detail-panel" aria-label="Detalle del programa seleccionado">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProgram.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          <span className="section-tag">PROGRAMA ACTIVO</span>
          <h3>{activeProgram.name}</h3>
          <p>{activeProgram.description}</p>

          <div className="radial-metrics-grid">
            <article className="radial-metric-card">
              <div className="metric-head"><Activity size={15} /><span>Ejecucion</span></div>
              <strong>{activeProgram.progress}%</strong>
            </article>
            <article className="radial-metric-card">
              <div className="metric-head"><LayoutGrid size={15} /><span>Widgets activos</span></div>
              <strong>{activeProgram.widgetsCount}</strong>
            </article>
            <article className="radial-metric-card">
              <div className="metric-head"><ShieldCheck size={15} /><span>Integracion</span></div>
              <strong>{integrationLabel[activeProgram.integrationStatus]}</strong>
            </article>
            <article className="radial-metric-card">
              <div className="metric-head"><Activity size={15} /><span>Categoria</span></div>
              <strong>{activeProgram.categoryLabel}</strong>
            </article>
          </div>

          <div className="radial-cta-row">
            <Link to={activeProgram.route} className="dashboard-cta">
              Entrar al tablero
              <span className="cta-icon"><ArrowRight size={14} /></span>
            </Link>
            <button type="button" className="more-info-button">Mas informacion</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

