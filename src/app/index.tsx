import AlertProvider from 'contexts/alert/AlertContext'
import AuthProvider from 'contexts/auth/AuthContext'
import Compose from 'contexts/index'
import WebProvider from 'contexts/web/WebContext'
import { useRoutes } from 'react-router-dom'
import routes from 'routes/index'

const App = () => {
  let routers = useRoutes(routes)

  return (
    <Compose components={[WebProvider, AlertProvider, AuthProvider]}>
      {routers}
    </Compose>
  )
}

export default App
