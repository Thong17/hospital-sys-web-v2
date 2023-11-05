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

  if (status === 'LOADING')
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Loading />
      </Box>
    )
  return (
    <AuthContext.Provider value={{ ...user }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
