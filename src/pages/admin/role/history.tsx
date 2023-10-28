import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { useParams } from 'react-router'
import { translate } from 'contexts/language/LanguageContext'
import TimelineContainer from 'components/shared/containers/TimelineContainer'
import Container from 'components/shared/Container'

const RoleHistory = () => {
  const { id } = useParams()
  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/admin/role/detail/${id}/history`,
              label: translate('HISTORY'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/role' }}
        />
      }
    >
      <Container>
        <h1>Hello</h1>
        <TimelineContainer /></Container>
    </Layout>
  )
}

export default RoleHistory
