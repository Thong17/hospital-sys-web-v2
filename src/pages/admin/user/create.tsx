import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import UserForm from './form'
import { initUser } from './constant'

const UserCreate = () => {
  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: '/admin/user/create',
              label: translate('CREATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/user' }}
        />
      }
    >
      <Container>
        <UserForm defaultValues={initUser} />
      </Container>
    </Layout>
  )
}

export default UserCreate
