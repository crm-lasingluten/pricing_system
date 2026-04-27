import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const links = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/productos', label: 'Productos', icon: '📦' },
  { to: '/costos', label: 'Estructura de Costos', icon: '⚙️' },
  { to: '/canales', label: 'Canales', icon: '🔗' },
  { to: '/listas', label: 'Listas de Precio', icon: '💰' },
  { to: '/comparativo', label: 'Comparativo', icon: '📊' },
  { to: '/imprimir', label: 'Imprimir Formato', icon: '🖨️' },
  { to: '/bitacora', label: 'Bitacora PDF', icon: '📄' },
]

export default function Sidebar() {
  const { profile, signOut } = useContext(AuthContext)
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-6 border-b">
        <h2 className="font-bold text-gray-800 text-lg">Precios</h2>
        <p className="text-xs text-gray-400 mt-1">{profile?.role || 'usuario'}</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ' +
              (isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50')
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={signOut}
          className="w-full text-sm text-gray-500 hover:text-red-500 py-2"
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  )
}
