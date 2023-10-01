import { Layout } from 'components/layouts/Layout'
import Role from './role'
import { useOutlet } from 'react-router'

const Admin = () => {
  const outlet = useOutlet()
  return (
    outlet || (
      <Layout>
        <h1>Admin</h1>
      </Layout>
    )
  )
}

export { Role, Admin }
