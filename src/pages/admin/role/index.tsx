import Breadcrumb from "components/shared/Breadcrumb"
import Container from "components/shared/Container"
import { breadcrumbs } from ".."
import { Layout } from "components/layouts/Layout"

const Role = () => {
  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} selectedOption={{ navbar: '/admin/role' }} />}>
      <Container>
        <h1>Role</h1>
      </Container>
    </Layout>
  )
}

export default Role