export interface Hospital {
  id: number
  nome: string
  endereco: string
  telefone: string
  capacidade: number
  ocupacao: number
}

const hospitais: Hospital[] = [
  { id: 1, nome: 'Hospital A', endereco: 'Rua X, 123', telefone: '(11) 1234-5678', capacidade: 100, ocupacao: 75 },
  { id: 2, nome: 'Hospital B', endereco: 'Av. Y, 456', telefone: '(11) 2345-6789', capacidade: 150, ocupacao: 100 },
  { id: 3, nome: 'Hospital C', endereco: 'Praça Z, 789', telefone: '(11) 3456-7890', capacidade: 80, ocupacao: 50 },
]

export const hospitalService = {
  listarHospitais: async (): Promise<Hospital[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hospitais), 500)
    })
  },

  obterHospital: async (id: number): Promise<Hospital | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hospitais.find(h => h.id === id)), 500)
    })
  },
}

