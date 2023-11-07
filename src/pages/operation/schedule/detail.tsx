import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import { getScheduleDetail } from 'stores/schedule/action'
import Container from 'components/shared/Container'


const ScheduleDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getScheduleDetail({ id }))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/admin/schedule/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/schedule' }}
        />
      }
    >
      <Container>
        
      </Container>
    </Layout>
  )
}

export default ScheduleDetail
