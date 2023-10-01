import { Layout } from 'components/layouts/Layout'
import Role from './role'
import { useOutlet } from 'react-router'
import Breadcrumb, { IBreadcrumb } from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { translate } from 'contexts/language/LanguageContext'

export const breadcrumbs: IBreadcrumb[] = [
  {
    href: '/admin',
    label: translate('ADMIN'),
  },
  {
    href: '/admin/user',
    label: translate('USER'),
  },
]

const Admin = () => {
  const outlet = useOutlet()
  
  return (
    outlet || (
      <Layout navbar={<Breadcrumb list={breadcrumbs} step={1} />}>
        <Container>
          <h1>Admin</h1>
        </Container>
      </Layout>
    )
  )
}

export { Role, Admin }
