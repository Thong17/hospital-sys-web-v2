import { Layout } from "components/layouts/Layout"
import Breadcrumb from "components/shared/Breadcrumb"
import { breadcrumbs } from ".."
import { translate } from "contexts/language/LanguageContext"
import { useParams } from "react-router"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "app/store"
import { selectRoleDetail } from "stores/role/selector"
import { getRoleDetail } from "stores/role/action"
import Container from "components/shared/Container"

const RoleDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { data } = useAppSelector(selectRoleDetail)

  console.log(data)
  
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
              href: `/admin/role/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/role' }}
        />
      }
    >
      <Container>
        
      </Container>
    </Layout>
  )
}

export default RoleDetail