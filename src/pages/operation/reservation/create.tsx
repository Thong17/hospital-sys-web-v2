import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import ReservationForm from './form'
import { initReservation } from './constant'

const ReservationCreate = () => {
  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: '/operation/reservation/create',
              label: translate('CREATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/operation/reservation' }}
        />
      }
    >
      <Container>
        <ReservationForm defaultValues={initReservation} />
      </Container>
    </Layout>
  )
}

export default ReservationCreate
