export interface Paciente {
  id: number
  nome: string
  idade: number
  condicao: string
}

const pacientes: Paciente[] = [
  { id: 1, nome: 'João Silva', idade: 45, condicao: 'Estável' },
  { id: 2, nome: 'Maria Santos', idade: 62, condicao: 'Crítica' },
  { id: 3, nome: 'Pedro Oliveira', idade: 28, condicao: 'Estável' },
]

export const pacienteService = {
  listarPacientes: async (): Promise<Paciente[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(pacientes), 500)
    })
  },

  obterPaciente: async (id: number): Promise<Paciente | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(pacientes.find(p => p.id === id)), 500)
    })
  },

  adicionarPaciente: async (paciente: Omit<Paciente, 'id'>): Promise<Paciente> => {
    return new Promise((resolve) => {
      const novoPaciente = { ...paciente, id: pacientes.length + 1 }
      pacientes.push(novoPaciente)
      setTimeout(() => resolve(novoPaciente), 500)
    })
  },

  atualizarPaciente: async (id: number, paciente: Omit<Paciente, 'id'>): Promise<Paciente> => {
    return new Promise((resolve, reject) => {
      const index = pacientes.findIndex(p => p.id === id)
      if (index !== -1) {
        pacientes[index] = { ...paciente, id }
        setTimeout(() => resolve(pacientes[index]), 500)
      } else {
        setTimeout(() => reject(new Error('Paciente não encontrado')), 500)
      }
    })
  },
}

