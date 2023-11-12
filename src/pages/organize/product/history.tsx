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
import { getProductHistory } from 'stores/product/action'
import { selectProductHistory } from 'stores/product/selector'
import { timeFormat } from 'utils/index'

const ProductHistory = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectProductHistory)

  useEffect(() => {
    dispatch(getProductHistory({ id }))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/organize/product/detail/${id}/history`,
              label: translate('HISTORY'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/organize/product' }}
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
      title: `${translate(`${item?.type}D_BY`)} ${(item?.type === 'CREATE' ? item?.createdBy?.username : item?.updatedBy?.username) ?? 'Unknown'}`,
      content: description,
    }
  })

export default ProductHistory
