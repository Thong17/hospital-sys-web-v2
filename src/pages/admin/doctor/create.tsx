import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import DoctorForm from './form'
import { initDoctor } from './constant'

const DoctorCreate = () => {
  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: '/admin/doctor/create',
              label: translate('CREATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/doctor' }}
        />
      }
    >
      <Container>
        <DoctorForm defaultValues={initDoctor} />
      </Container>
    </Layout>
  )
}

export default DoctorCreate
