export interface Transferencia {
  id: number
  pacienteId: number
  origem: string
  destino: string
  meioTransporte: 'ambulancia' | 'helicoptero' | 'aviao'
  status: 'pendente' | 'em_andamento' | 'concluida'
  horarioSaida?: string
  horarioPrevisto?: string
}

const transferencias: Transferencia[] = [
  { id: 1, pacienteId: 1, origem: 'Hospital A', destino: 'Hospital B', meioTransporte: 'ambulancia', status: 'pendente' },
  { id: 2, pacienteId: 2, origem: 'Hospital C', destino: 'Hospital D', meioTransporte: 'helicoptero', status: 'em_andamento', horarioSaida: '2023-05-10T10:00:00', horarioPrevisto: '2023-05-10T11:30:00' },
]

export const transferenciaService = {
  listarTransferencias: async (): Promise<Transferencia[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(transferencias), 500)
    })
  },

  obterTransferencia: async (id: number): Promise<Transferencia | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(transferencias.find(t => t.id === id)), 500)
    })
  },

  solicitarTransferencia: async (transferencia: Omit<Transferencia, 'id' | 'status'>): Promise<Transferencia> => {
    return new Promise((resolve) => {
      const novaTransferencia = { ...transferencia, id: transferencias.length + 1, status: 'pendente' }
      transferencias.push(novaTransferencia)
      setTimeout(() => resolve(novaTransferencia), 500)
    })
  },

  atualizarTransferencia: async (id: number, transferencia: Partial<Transferencia>): Promise<Transferencia> => {
    return new Promise((resolve, reject) => {
      const index = transferencias.findIndex(t => t.id === id)
      if (index !== -1) {
        transferencias[index] = { ...transferencias[index], ...transferencia }
        setTimeout(() => resolve(transferencias[index]), 500)
      } else {
        setTimeout(() => reject(new Error('Transferência não encontrada')), 500)
      }
    })
  },
}

