import { createContext, useContext, useEffect, useState } from "react";

const initialState = JSON.parse(localStorage.getItem('AuthContext')) || { accessToken: null }

const AuthContext = createContext(initialState)

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(initialState.accessToken)

  useEffect(() => {
    localStorage.setItem('AuthContext', JSON.stringify({ accessToken }))
  }, [accessToken])

  const context = {
    accessToken,
    setAccessToken
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}