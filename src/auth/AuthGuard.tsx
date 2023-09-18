import { useAppSelector } from 'app/store'
import Restrict from 'components/shared/Restrict'
import useNotify from 'hooks/useNotify'
import { FC, ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { selectSession } from 'stores/session/selector'

interface IAuthRoute {
  children: ReactElement
  role?: {
    route: string,
    action: string
  }
}

const AuthGuard: FC<IAuthRoute> = ({ children, role }) => {
  const { user } = useAppSelector(selectSession)
  const { notify } = useNotify()
  const location = useLocation()
  if (!role && user) return <>{children}</>
  if (role && user) {
    const { route, action } = role
    const isAuthenticated = user.privilege?.[route]?.[action]
    if (isAuthenticated) return <>{children}</>
  }
  notify(`You don't have permission to access this page`, 'error')
  return <Restrict redirect={location.pathname} />
}

export default AuthGuard