import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'

const User = () => {
  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} />}>
      <Container>
        <h1>User</h1>
      </Container>
    </Layout>
  )
}

export default User
