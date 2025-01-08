import Link from 'next/link'

const pacientes = [
  { id: 1, nome: 'João Silva', idade: 45, condicao: 'Estável' },
  { id: 2, nome: 'Maria Santos', idade: 62, condicao: 'Crítica' },
  { id: 3, nome: 'Pedro Oliveira', idade: 28, condicao: 'Estável' },
]

export default function ListaPacientes() {
  return (
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
  )
}

