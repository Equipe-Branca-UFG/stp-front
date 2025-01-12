'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../components/Button'
import { transferenciaService, Transferencia } from '../services/transferenciaService'

export default function Transferencias() {
  const [transferencias, setTransferencias] = useState<Transferencia[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [nomePaciente, setNomePaciente] = useState<number | null>(null)

  useEffect(() => {
    const fetchTransferencias = async () => {
      const data = await transferenciaService.listarTransferencias()
      setTransferencias(data)
    }
    fetchTransferencias()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      transferencias.forEach(transferencia => {
        if (transferencia.horarioPrevisto) {
          const horarioPrevisto = new Date(transferencia.horarioPrevisto)
          if (now >= horarioPrevisto && transferencia.status === 'em_andamento') {
            setNomePaciente(transferencia.pacienteId)
            setShowNotification(true)
          }
        }
      })
    }, 60000)

    return () => clearInterval(interval)
  }, [transferencias])

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Transferências</h1>
          <Link href="/transferencias/nova">
            <Button>Solicitar Transferência</Button>
          </Link>
        </div>
        <div className="mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {transferencias.map((transferencia) => (
                <li key={transferencia.id}>
                  <Link href={`/transferencias/${transferencia.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          Transferência #{transferencia.id}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transferencia.status === 'concluida' ? 'bg-green-100 text-green-800' :
                            transferencia.status === 'em_andamento' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {transferencia.status === 'concluida' ? 'Concluída' :
                             transferencia.status === 'em_andamento' ? 'Em Andamento' :
                             'Pendente'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            De: {transferencia.origem} | Para: {transferencia.destino}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            Meio de Transporte: {transferencia.meioTransporte}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {showNotification && (
          <div className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded shadow-md">
            <p>A transferência do paciente {nomePaciente} foi concluída!</p>
            <button onClick={() => setShowNotification(false)} className="mt-2 bg-white text-green-500 font-bold py-1 px-2 rounded">
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}