import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectReservationDetail } from 'stores/reservation/selector'
import { getReservationDelete, getReservationDetail } from 'stores/reservation/action'
import Container from 'components/shared/Container'
import { Stack, Typography } from '@mui/material'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { CustomizedIconButton, DeleteButton, EditButton } from 'components/shared/buttons/ActionButton'
import useAlert from 'hooks/useAlert'
import ActivityContainer from 'components/shared/containers/ActivityContainer'
import { calculateDuration, timeFormat } from 'utils/index'
import { RecordDetail } from 'pages/admin/patient/record'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded'

const ReservationDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { id } = useParams()
  const { theme } = useTheme()
  const { data, records } = useAppSelector(selectReservationDetail)

  useEffect(() => {
    dispatch(getReservationDetail({ id }))
  }, [id])

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    navigate(`/operation/reservation/update/${id}`)
  }

  const handleClickHistory = () => {
    navigate(`/operation/reservation/detail/${id}/history`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_RESERVATION_TITLE'),
      description: translate('DELETE_RESERVATION_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getReservationDelete({ id: id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => navigate('/operation/reservation'))
          .catch(console.error)
      })
      .catch(() => {})
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/operation/reservation/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/operation/reservation' }}
        />
      }
    >
      <Container>
        <TitleContainer text={translate('TITLE_RESERVATION_DETAIL') as String}>
          <Stack direction={'row'} gap={1}>
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={handleDelete} />
            <CustomizedIconButton onClick={handleClickHistory} color={theme.color.info} tooltip={translate('HISTORY_BUTTON')} icon={<RestoreRoundedIcon fontSize='small' />} />
          </Stack>
        </TitleContainer>
        <Stack direction={'column'} mb={2} sx={{ paddingTop: '20px', '& .section-container': { marginTop: '20px' } }}>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('APPOINTMENT_DATE') as String}>
              <Typography>{timeFormat(data?.appointmentDate, 'DD MMM, YYYY h:mm A') || '...'}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('DURATION') as String}>
              <Typography>{calculateDuration(data?.duration) || '...'}</Typography>
            </LabelDetail>
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('CATEGORY') as String}>
              <Typography>{data?.category || '...'}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('STAGE') as String}>
              <Typography>{data?.stage || '...'}</Typography>
            </LabelDetail>
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('PATIENT_NAME') as String}>
              <Typography>{`${data?.patient?.fullName || data?.patient?.username}`}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('PATIENT_CONTACT') as String}>
              <Typography>{data?.patient?.contact || '...'}</Typography>
            </LabelDetail>
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('NOTE') as String}>
              <Typography>{data?.note || '...'}</Typography>
            </LabelDetail>
          </Stack>
        </Stack>
        
        <Stack direction={'row'} alignItems={'center'}>
          <ArrowRightRoundedIcon fontSize='large' sx={{ color: theme.text.tertiary, marginLeft: '-15px' }} />
          <Typography>{translate('PATIENT_RECORDS')}</Typography>
        </Stack>
        <Stack direction={'column'} py={2} gap={2}>
          {records?.map((item: any, key: number) => {
            return <RecordDetail data={item} key={key} />
          })}
        </Stack>
        <ActivityContainer data={data} />
      </Container>
    </Layout>
  )
}

export default ReservationDetail
