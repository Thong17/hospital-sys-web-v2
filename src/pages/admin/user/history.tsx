import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { useParams } from 'react-router'
import { translate } from 'contexts/language/LanguageContext'
import TimelineContainer, {
  ITimelineItem,
} from 'components/shared/containers/TimelineContainer'
import Container from 'components/shared/Container'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getUserHistory } from 'stores/user/action'
import { selectUserHistory } from 'stores/user/selector'
import { timeFormat } from 'utils/index'

const UserHistory = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectUserHistory)

  useEffect(() => {
    dispatch(getUserHistory({ id }))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/admin/user/detail/${id}/history`,
              label: translate('HISTORY'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/user' }}
        />
      }
    >
      <Container>
        <TimelineContainer data={mapData(data)} />
      </Container>
    </Layout>
  )
}

const mapData = (data: any): ITimelineItem[] =>
  data?.map((item: any) => {
    const description = item?.data
    return {
      timeline: `${timeFormat(item?.updatedAt, 'YYYY MMM DD')}\n${timeFormat(item?.updatedAt)}`,
      actionType: item?.type,
      title: `${translate(`${item?.type}_BY`)}  ${item?.createdBy?.username}`,
      content: description,
    }
  })

export default UserHistory
