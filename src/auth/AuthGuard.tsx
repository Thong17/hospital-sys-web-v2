import Restrict from 'components/shared/Restrict'
import useAuth from 'hooks/useAuth'
import useNotify from 'hooks/useNotify'
import { FC, ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

interface IAuthRoute {
  children: ReactElement
  role: {
    route: string,
    action: string
  }
}

const AuthGuard: FC<IAuthRoute> = ({ children, role }) => {
  const { user } = useAuth()
  const { notify } = useNotify()
  const location = useLocation()
  const { route, action } = role

  const isAuthenticated = user?.privilege?.[route]?.[action] || true
  if (isAuthenticated) return <>{children}</>
  
  notify(`You don't have permission to access this page`, 'error')
  return <Restrict redirect={location.pathname} />
}

export default AuthGuard