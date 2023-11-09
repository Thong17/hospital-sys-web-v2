import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import UserForm, { IUserForm } from './form'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectUserDetail } from 'stores/user/selector'
import { getUserDetail } from 'stores/user/action'
import { initUser } from './constant'
import Container from 'components/shared/Container'

const UserUpdate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useAppSelector(selectUserDetail)

  useEffect(() => {
    dispatch(getUserDetail({ id }))
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
              href: `/admin/user/update/${id}`,
              label: translate('UPDATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/user' }}
        />
      }
    >
      <Container>
        {!isLoading && <UserForm defaultValues={mapUserBody(data)} />}
      </Container>
    </Layout>
  )
}

const mapUserBody = (data: any): IUserForm => {
  if (!data) return initUser
  return {
    username: data.username,
    role: data.role?._id ?? '',
    segment: data.segment,
    email: data.email,
    contact: data.contact,
    description: data.description,
    status: data.status,
    password: ''
  }
}

export default UserUpdate
