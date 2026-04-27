import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function TopBar() {
  const { profile } = useContext(AuthContext)

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{profile?.full_name || 'Usuario'}</p>
          <p className="text-xs text-gray-400">{profile?.role || ''}</p>
        </div>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {profile?.full_name?.[0] || 'U'}
        </div>
      </div>
    </div>
  )
}
