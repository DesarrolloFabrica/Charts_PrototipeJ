export type ProgramCategory =
  | 'operativa'
  | 'finanzas'
  | 'impacto-social'
  | 'capital-humano'
  | 'talento-desempeno'

export type IntegrationStatus = 'estable' | 'parcial'

// Modelo base para cada tablero mostrado en el catalogo.
export interface ProgramCard {
  id: number
  name: string
  category: ProgramCategory
  categoryLabel: string
  integrationStatus: IntegrationStatus
  widgetsCount: number
  description: string
  accentColor: string
  progress: number
  route: string
}
