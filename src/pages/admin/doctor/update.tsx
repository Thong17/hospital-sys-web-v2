import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import DoctorForm, { IDoctorForm } from './form'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectDoctorDetail } from 'stores/doctor/selector'
import { getDoctorDetail } from 'stores/doctor/action'
import { initDoctor } from './constant'
import Container from 'components/shared/Container'
import { inputDateFormat } from 'utils/index'

const DoctorUpdate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useAppSelector(selectDoctorDetail)

  useEffect(() => {
    dispatch(getDoctorDetail({ id }))
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
              href: `/admin/doctor/update/${id}`,
              label: translate('UPDATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/doctor' }}
        />
      }
    >
      <Container>
        {!isLoading && <DoctorForm defaultValues={mapDoctorBody(data)} />}
      </Container>
    </Layout>
  )
}

const mapDoctorBody = (data: any): IDoctorForm => {
  if (!data) return initDoctor
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    email: data.email,
    contact: data.contact,
    specialties: data.specialties as string[],
    shift: data.shift,
    dateOfBirth: inputDateFormat(data.dateOfBirth),
    startTime: data.startTime,
    endTime: data.endTime,
    status: data.status,
    description: data.description,
  }
}

export default DoctorUpdate
