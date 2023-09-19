import ConfigProvider from 'contexts/config/ConfigContext'
import Compose from 'contexts/index'
import { useRoutes } from 'react-router-dom'
import routes from 'routes/index'

const App = () => {
  let routers = useRoutes(routes)

  return (
    <Compose components={[ConfigProvider]}>
      {routers}
    </Compose>
  )
}

export default App
