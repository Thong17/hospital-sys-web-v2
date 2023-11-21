import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectUserInfo } from 'stores/user/selector'
import { getUserInfo } from 'stores/user/action'
import Container from 'components/shared/Container'
import { mapPatientBody } from '../patient/update'
import PatientForm from '../patient/form'
import DoctorForm from '../doctor/form'
import { mapDoctorBody } from '../doctor/update'

const UserUpdate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useAppSelector(selectUserInfo)

  useEffect(() => {
    dispatch(getUserInfo({ id }))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => {})
  }, [id])

  const renderUserForm = (type: string) => {
    switch (true) {
      case type === 'PATIENT':
        return <PatientForm defaultValues={mapPatientBody(data?.info)} />

      case type === 'DOCTOR':
        return <DoctorForm defaultValues={mapDoctorBody(data?.info)} />
    
      default:
        return <></>
    }
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/admin/user/update/${id}`,
              label: translate('UPDATE'),
            },
            {
              id: 'info',
              href: `/admin/user/update/${id}/info`,
              label: translate('INFO'),
            },
          ]}
          step={4}
          selectedOption={{ navbar: '/admin/user' }}
        />
      }
    >
      <Container>
        {!isLoading && renderUserForm(data?.user?.segment)}
      </Container>
    </Layout>
  )
}

export default UserUpdate
