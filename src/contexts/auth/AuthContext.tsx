import { createContext, useEffect } from 'react'

import Loading from 'components/shared/Loading'
import { useAppDispatch, useAppSelector } from 'app/store'
import { initialState } from 'stores/session/slice'
import { selectSession } from 'stores/session/selector'
import { getProfile } from 'stores/session/action'
import { Box } from '@mui/material'

export const AuthContext = createContext({
  ...initialState,
})

const AuthProvider = ({ children }: any) => {
  const { user, status } = useAppSelector(selectSession)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  return (
    <AuthContext.Provider value={{ ...user }}>
      {status === 'LOADING' && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'black'
          }}
        >
          <Loading />
        </Box>
      )}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
