import { createContext, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store'
import { initialState } from 'stores/session/slice'
import { selectSession } from 'stores/session/selector'
import { getProfile } from 'stores/session/action'

export const AuthContext = createContext({
  ...initialState,
})

const AuthProvider = ({ children }: any) => {
  const { user } = useAppSelector(selectSession)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  return (
    <AuthContext.Provider value={{ ...user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
