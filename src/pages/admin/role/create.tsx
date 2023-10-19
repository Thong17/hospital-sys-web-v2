import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import RoleForm from './form'

const RoleCreate = () => {
  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: '/admin/role/create',
              label: translate('CREATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/role' }}
        />
      }
    >
      <Container>
        <RoleForm />
      </Container>
    </Layout>
  )
}

export default RoleCreate
