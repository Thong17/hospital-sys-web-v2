import Compose from 'contexts/index'
import WebProvider from 'contexts/web/WebContext'
import { useRoutes } from 'react-router-dom'
import routes from 'routes/index'

const App = () => {
  let routers = useRoutes(routes)

  return (
    <Compose components={[WebProvider]}>
      {routers}
    </Compose>
  )
}

export default App
