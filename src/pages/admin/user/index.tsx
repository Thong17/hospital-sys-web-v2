import { Layout } from 'components/layouts/Layout'
import Breadcrumb, { IBreadcrumb } from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import useLanguage from 'hooks/useLanguage'

const User = () => {
  const { language } = useLanguage()
  const breadcrumbs: IBreadcrumb[] = [
    {
      href: '/admin',
      label: language.ADMIN,
    },
  ]
  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} />}>
      <Container>
        <h1>User</h1>
      </Container>
    </Layout>
  )
}

export default User
