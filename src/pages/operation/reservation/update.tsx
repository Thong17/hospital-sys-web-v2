import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import ReservationForm, { IReservationForm } from './form'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectReservationDetail } from 'stores/reservation/selector'
import { getReservationDetail } from 'stores/reservation/action'
import { initReservation } from './constant'
import Container from 'components/shared/Container'
import { inputDateTimeFormat } from 'utils/index'

const ReservationUpdate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useAppSelector(selectReservationDetail)

  useEffect(() => {
    dispatch(getReservationDetail({ id }))
      .unwrap()
      .then(() => setIsLoading(false))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/operation/reservation/update/${id}`,
              label: translate('UPDATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/operation/reservation' }}
        />
      }
    >
      <Container>
        {!isLoading && <ReservationForm defaultValues={mapReservationBody(data)} />}
      </Container>
    </Layout>
  )
}

const mapReservationBody = (data: any): IReservationForm => {
  if (!data) return initReservation
  return {
    appointmentDate: inputDateTimeFormat(data.appointmentDate),
    patient: data.patient,
    duration: data.duration,
    specialties: data.specialties,
    doctors: data.doctors,
    category: data.category,
    note: data.note,
    status: data.status,
  }
}

export default ReservationUpdate
