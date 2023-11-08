import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getScheduleDetail } from 'stores/schedule/action'
import Container from 'components/shared/Container'
import { selectScheduleDetail } from 'stores/schedule/selector'
import ScheduleInfo from './components/ScheduleInfo'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createPatientHistorySchema } from './constant'


const ScheduleDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { data } = useAppSelector(selectScheduleDetail)
  const {
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(createPatientHistorySchema)
  })
  console.log(data)

  useEffect(() => {
    dispatch(getScheduleDetail({ id }))
  }, [id])

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/operation/schedule/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/operation/schedule' }}
        />
      }
    >
      <Container>
        <ScheduleInfo data={data} />
        <form onSubmit={handleSubmit(onSubmit)}>

        </form>
      </Container>
    </Layout>
  )
}

export default ScheduleDetail
