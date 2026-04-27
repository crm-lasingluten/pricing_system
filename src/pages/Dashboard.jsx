import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'

export default function Dashboard() {
  const { profile } = useContext(AuthContext)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Bienvenido, {profile?.full_name || 'Usuario'} 👋
            </h1>
            <p className="text-gray-500">Sistema de Cálculo de Precios</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Productos', icon: '📦' },
                { label: 'Listas de Precio', icon: '💰' },
                { label: 'PDFs Generados', icon: '📄' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
