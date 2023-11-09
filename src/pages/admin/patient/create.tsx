import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import PatientForm from './form'
import { initPatient } from './constant'

const PatientCreate = () => {
  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: '/admin/patient/create',
              label: translate('CREATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/patient' }}
        />
      }
    >
      <Container>
        <PatientForm defaultValues={initPatient} />
      </Container>
    </Layout>
  )
}

export default PatientCreate
