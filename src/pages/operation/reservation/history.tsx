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
import { getReservationHistory } from 'stores/reservation/action'
import { selectReservationHistory } from 'stores/reservation/selector'
import { timeFormat } from 'utils/index'

const ReservationHistory = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectReservationHistory)

  useEffect(() => {
    dispatch(getReservationHistory({ id }))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/operation/reservation/detail/${id}/history`,
              label: translate('HISTORY'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/operation/reservation' }}
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
      title: `${translate(`${item?.type}D_BY`)} ${(item?.type === 'CREATE' ? item?.createdBy?.reservationname : item?.updatedBy?.reservationname) ?? 'Unknown'}`,
      content: description,
    }
  })

export default ReservationHistory
