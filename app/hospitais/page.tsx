'use client'

import { useState, useEffect } from 'react'
import { hospitalService, Hospital } from '../services/hospitalService'

export default function Hospitais() {
  const [hospitais, setHospitais] = useState<Hospital[]>([])

  useEffect(() => {
    const fetchHospitais = async () => {
      const data = await hospitalService.listarHospitais()
      setHospitais(data)
    }
    fetchHospitais()
  }, [])

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hospitais</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {hospitais.map((hospital) => (
              <li key={hospital.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{hospital.nome}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        hospital.ocupacao / hospital.capacidade < 0.8 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {hospital.ocupacao}/{hospital.capacidade} leitos ocupados
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {hospital.endereco}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        {hospital.telefone}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

