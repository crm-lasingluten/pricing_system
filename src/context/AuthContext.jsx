import { createContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session ? session.user : null)
      if (session && session.user) loadProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session ? session.user : null)
      if (session && session.user) loadProfile(session.user.id)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId) {
    const { data } = await supabase
      .from('user_profiles')
      .select('*, user_business_lines(business_line_id)')
      .eq('id', userId)
      .single()
    setProfile(data)
  }

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
