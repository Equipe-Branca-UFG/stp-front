'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../components/Button'
import { pacienteService, Paciente } from '../services/pacienteService'

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])

  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await pacienteService.listarPacientes()
      setPacientes(data)
    }
    fetchPacientes()
  }, [])

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <Link href="/pacientes/novo">
            <Button>Adicionar Paciente</Button>
          </Link>
        </div>
        <div className="mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {pacientes.map((paciente) => (
                <li key={paciente.id}>
                  <Link href={`/pacientes/${paciente.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">{paciente.nome}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            paciente.condicao === 'Estável' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {paciente.condicao}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Idade: {paciente.idade}
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
      </div>
    </div>
  )
}

