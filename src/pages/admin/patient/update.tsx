import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import PatientForm, { IPatientForm } from './form'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectPatientDetail } from 'stores/patient/selector'
import { getPatientDetail } from 'stores/patient/action'
import { initPatient } from './constant'
import Container from 'components/shared/Container'
import { inputDateFormat } from 'utils/index'

const PatientUpdate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useAppSelector(selectPatientDetail)

  useEffect(() => {
    dispatch(getPatientDetail({ id }))
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
              href: `/admin/patient/update/${id}`,
              label: translate('UPDATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/patient' }}
        />
      }
    >
      <Container>
        {!isLoading && <PatientForm defaultValues={mapPatientBody(data)} />}
      </Container>
    </Layout>
  )
}

export const mapPatientBody = (data: any): IPatientForm => {
  if (!data) return initPatient
  return {
    fullName: data.fullName,
    dateOfBirth: inputDateFormat(data.dateOfBirth),
    gender: data.gender,
    contact: data.contact,
    email: data.email,
    description: data.description,
    status: data.status,
  }
}

export default PatientUpdate
