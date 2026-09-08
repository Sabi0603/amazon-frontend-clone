import { useEffect, useState } from 'react'
import AuthContext from './AuthContext.jsx'
import { getStoredData, removeStoredData, setStoredData, STORAGE_KEYS } from '../utils/storage.js'

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => getStoredData(STORAGE_KEYS.AUTH, {
    isAuthenticated: false,
    user: null,
  }))
  useEffect(() => {
    if (authState.isAuthenticated) {
      setStoredData(STORAGE_KEYS.AUTH, authState)
    } else {
      removeStoredData(STORAGE_KEYS.AUTH)
    }
  }, [authState])
  const login = async (identifier, password) => {
    if (!identifier.trim() || !password) {
      throw new Error('Enter your email or mobile number and password.')
    }

    const name = identifier.includes('@') ? identifier.split('@')[0] : identifier
    const user = { email: identifier, name }
    setAuthState({ isAuthenticated: true, user })
    return user
  }

  const register = async ({ name, identifier, password }) => {
    if (!name.trim() || !identifier.trim() || !password) {
      throw new Error('Complete all required fields.')
    }

    const user = { email: identifier, name: name.trim() }
    setAuthState({ isAuthenticated: true, user })
    return user
  }

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null })
    removeStoredData(STORAGE_KEYS.AUTH)
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        isAuthenticated: authState.isAuthenticated,
        login,
        logout,
        register,
        user: authState.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }