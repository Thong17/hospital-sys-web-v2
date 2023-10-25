import { Layout } from "components/layouts/Layout"
import Breadcrumb from "components/shared/Breadcrumb"
import { breadcrumbs } from ".."
import { translate } from "contexts/language/LanguageContext"
import RoleForm, { IRoleForm } from './form'
import { useParams } from "react-router"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "app/store"
import { selectRoleDetail } from "stores/role/selector"
import { getRoleDetail } from "stores/role/action"
import { initRole } from "./constant"
import Container from "components/shared/Container"

const RoleUpdate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { data, isLoading } = useAppSelector(selectRoleDetail)
  
  useEffect(() => {
    dispatch(getRoleDetail({ id }))
  }, [id])
  
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
        {!isLoading && <RoleForm defaultValues={mapRoleBody(data)} />}
      </Container>
    </Layout>
  )
}

const mapRoleBody = (data: any):IRoleForm => {
  if (!data) return initRole
  return {
    name: data.name,
    description: data.description,
    status: data.status,
    navigation: data.navigation ?? {},
    privilege: data.privilege ?? {},
  }
}

export default RoleUpdate