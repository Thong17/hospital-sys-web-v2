import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { StickyTable } from 'components/shared/table/StickyTable'

const User = () => {
  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} selectedOption={{ navbar: '/admin/user' }} />}>
      <Container>
        <h1>Hello</h1>
        <StickyTable rows={[{ no: '1', name: 'Thong' }]} columns={[{ label: 'No', id: 'no' }, { label: 'Name', id: 'name' }]} />
      </Container>
    </Layout>
  )
}

export default User
