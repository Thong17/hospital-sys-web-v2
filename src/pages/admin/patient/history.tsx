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
import { getPatientHistory } from 'stores/patient/action'
import { selectPatientHistory } from 'stores/patient/selector'
import { timeFormat } from 'utils/index'

const PatientHistory = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectPatientHistory)

  useEffect(() => {
    dispatch(getPatientHistory({ id }))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/admin/patient/detail/${id}/history`,
              label: translate('HISTORY'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/patient' }}
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
      title: `${translate(`${item?.type}D_BY`)} ${(item?.type === 'CREATE' ? item?.createdBy?.patientname : item?.updatedBy?.patientname) ?? 'Unknown'}`,
      content: description,
    }
  })

export default PatientHistory
