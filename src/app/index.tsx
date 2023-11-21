import AlertProvider from 'contexts/alert/AlertContext'
import AuthProvider from 'contexts/auth/AuthContext'
import Compose from 'contexts/index'
import ThemesProvider from 'contexts/theme/ThemeContext'
import WebProvider from 'contexts/web/WebContext'
import { useRoutes } from 'react-router-dom'
import routes from 'routes/index'

const App = () => {
  let routers = useRoutes(routes)

  return (
    <Compose components={[WebProvider, AlertProvider, AuthProvider, ThemesProvider]}>
      {routers}
    </Compose>
  )
}

export default App
