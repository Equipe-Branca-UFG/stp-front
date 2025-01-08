'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button } from '../../components/Button'
import { pacienteService, Paciente } from '../../services/pacienteService'

export default function EditarPaciente({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [paciente, setPaciente] = useState<Paciente>({
    id: 0,
    nome: '',
    idade: 0,
    condicao: 'Estável'
  })

  useEffect(() => {
    const fetchPaciente = async () => {
      if (params.id !== 'novo') {
        const data = await pacienteService.obterPaciente(parseInt(params.id))
        if (data) setPaciente(data)
      }
    }
    fetchPaciente()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (params.id === 'novo') {
      await pacienteService.adicionarPaciente(paciente)
    } else {
      await pacienteService.atualizarPaciente(paciente.id, paciente)
    }
    router.push('/pacientes')
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {params.id === 'novo' ? 'Adicionar Paciente' : 'Editar Paciente'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Input
            label="Nome"
            id="nome"
            value={paciente.nome}
            onChange={(e) => setPaciente(prev => ({ ...prev, nome: e.target.value }))}
            required
          />
          <Input
            label="Idade"
            id="idade"
            type="number"
            value={paciente.idade.toString()}
            onChange={(e) => setPaciente(prev => ({ ...prev, idade: parseInt(e.target.value) }))}
            required
          />
          <Select
            label="Condição"
            id="condicao"
            value={paciente.condicao}
            onChange={(e) => setPaciente(prev => ({ ...prev, condicao: e.target.value }))}
            options={[
              { value: 'Estável', label: 'Estável' },
              { value: 'Crítica', label: 'Crítica' },
            ]}
            required
          />
          <div className="flex items-center justify-between mt-6">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="secondary" onClick={() => router.push('/pacientes')}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

