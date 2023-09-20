import Compose from 'contexts/index'
import { useRoutes } from 'react-router-dom'
import routes from 'routes/index'

const App = () => {
  let routers = useRoutes(routes)

  return (
    <Compose components={[]}>
      {routers}
    </Compose>
  )
}

export default App
