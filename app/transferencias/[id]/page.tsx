'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button } from '../../components/Button'
import { transferenciaService, Transferencia } from '../../services/transferenciaService'
import { pacienteService, Paciente } from '../../services/pacienteService'
import { hospitalService, Hospital } from '../../services/hospitalService'
import { format } from 'date-fns'

export default function EditarTransferencia({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [transferencia, setTransferencia] = useState<Transferencia>({
    id: 0,
    pacienteId: 0,
    origem: '',
    destino: '',
    meioTransporte: 'ambulancia',
    status: 'pendente'
  })
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [hospitais, setHospitais] = useState<Hospital[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [popupShowed, setPopupShowed] = useState(false)
  const [savedTransferencia, setSavedTransferencia] = useState<Transferencia | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const [pacientesData, hospitaisData] = await Promise.all([
        pacienteService.listarPacientes(),
        hospitalService.listarHospitais()
      ])
      setPacientes(pacientesData)
      setHospitais(hospitaisData)

      if (params.id !== 'nova') {
        const transferenciaData = await transferenciaService.obterTransferencia(parseInt(params.id))
        if (transferenciaData) setTransferencia(transferenciaData)
      }
    }
    fetchData()
  }, [params.id])

  useEffect(() => {
    if (!showPopup && popupShowed) {
      router.push('/transferencias')
    }
  }, [showPopup])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (params.id === 'nova') {
      await transferenciaService.solicitarTransferencia(transferencia)
    } else {
      await transferenciaService.atualizarTransferencia(transferencia.id, transferencia)
    }
    setPopupShowed(true)
    setSavedTransferencia(transferencia)
    setShowPopup(true)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {params.id === 'nova' ? 'Solicitar Transferência' : 'Editar Transferência'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Select
            label="Paciente"
            id="pacienteId"
            value={transferencia.pacienteId.toString()}
            onChange={(e) => setTransferencia(prev => ({ ...prev, pacienteId: parseInt(e.target.value) }))}
            options={pacientes.map(p => ({ value: p.id.toString(), label: p.nome }))}
            required
          />
          <Select
            label="Hospital de Origem"
            id="origem"
            value={transferencia.origem}
            onChange={(e) => setTransferencia(prev => ({ ...prev, origem: e.target.value }))}
            options={hospitais.map(h => ({ value: h.nome, label: h.nome }))}
            required
          />
          <Select
            label="Hospital de Destino"
            id="destino"
            value={transferencia.destino}
            onChange={(e) => setTransferencia(prev => ({ ...prev, destino: e.target.value }))}
            options={hospitais.map(h => ({ value: h.nome, label: h.nome }))}
            required
          />
          <Select
            label="Meio de Transporte"
            id="meioTransporte"
            value={transferencia.meioTransporte}
            onChange={(e) => setTransferencia(prev => ({ ...prev, meioTransporte: e.target.value as 'ambulancia' | 'helicoptero' | 'aviao' }))}
            options={[
              { value: 'ambulancia', label: 'Ambulância' },
              { value: 'helicoptero', label: 'Helicóptero' },
              { value: 'aviao', label: 'Avião' },
            ]}
            required
          />
          {params.id !== 'nova' && (
            <Select
              label="Status"
              id="status"
              value={transferencia.status}
              onChange={(e) => setTransferencia(prev => ({ ...prev, status: e.target.value as 'pendente' | 'em_andamento' | 'concluida' }))}
              options={[
                { value: 'pendente', label: 'Pendente' },
                { value: 'em_andamento', label: 'Em Andamento' },
                { value: 'concluida', label: 'Concluída' },
              ]}
              required
            />
          )}
          {transferencia.status === 'em_andamento' && (
            <>
              <Input
                label="Horário de Saída"
                id="horarioSaida"
                type="datetime-local"
                value={transferencia.horarioSaida || ''}
                onChange={(e) => setTransferencia(prev => ({ ...prev, horarioSaida: e.target.value }))}
              />
              <Input
                label="Horário Previsto de Chegada"
                id="horarioPrevisto"
                type="datetime-local"
                value={transferencia.horarioPrevisto || ''}
                onChange={(e) => setTransferencia(prev => ({ ...prev, horarioPrevisto: e.target.value }))}
              />
            </>
          )}
          <div className="flex items-center justify-between mt-6">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="secondary" onClick={() => router.push('/transferencias')}>
              Cancelar
            </Button>
          </div>
        </form>
        {showPopup && savedTransferencia && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Transferência Salva</h2>
              <p><strong>Paciente:</strong> {savedTransferencia.pacienteId}</p>
              <p><strong>Origem:</strong> {savedTransferencia.origem}</p>
              <p><strong>Destino:</strong> {savedTransferencia.destino}</p>
              <p><strong>Meio de Transporte:</strong> {savedTransferencia.meioTransporte}</p>
              <p><strong>Status:</strong> {savedTransferencia.status}</p>
              <p><strong>Horário de Saída:</strong> {formatDate(savedTransferencia?.horarioSaida)}</p>
              <p><strong>Horário Previsto de Chegada:</strong> {formatDate(savedTransferencia?.horarioPrevisto)}</p>
              <button onClick={() => setShowPopup(false)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

