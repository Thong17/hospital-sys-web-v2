import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import Container from 'components/shared/Container'
import { Stack, Typography } from '@mui/material'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { CustomizedIconButton, DeleteButton, EditButton } from 'components/shared/buttons/ActionButton'
import useAlert from 'hooks/useAlert'
import ActivityContainer from 'components/shared/containers/ActivityContainer'
import { calculateDuration } from 'utils/index'
import { getPaymentDelete, getPaymentDetail } from 'stores/payment/action'
import { selectPaymentDetail } from 'stores/payment/selector'

const PaymentDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { id } = useParams()
  const { theme } = useTheme()
  const { data } = useAppSelector(selectPaymentDetail)

  useEffect(() => {
    dispatch(getPaymentDetail({ id }))
  }, [id])

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    navigate(`/operation/payment/update/${id}`)
  }

  const handleClickHistory = () => {
    navigate(`/operation/payment/detail/${id}/history`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_PAYMENT_TITLE'),
      description: translate('DELETE_PAYMENT_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getPaymentDelete({ id: id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => navigate('/operation/payment'))
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
              href: `/operation/payment/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/operation/payment' }}
        />
      }
    >
      <Container>
        <TitleContainer text={translate('TITLE_PAYMENT_DETAIL') as String}>
          <Stack direction={'row'} gap={1}>
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={handleDelete} />
            <CustomizedIconButton onClick={handleClickHistory} color={theme.color.info} tooltip={translate('HISTORY_BUTTON')} icon={<RestoreRoundedIcon fontSize='small' />} />
          </Stack>
        </TitleContainer>
        <Stack direction={'column'} mb={2} sx={{ paddingTop: '20px', '& .section-container': { marginTop: '20px' } }}>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('APPOINTMENT_DATE') as String}>
              <Typography>{data?.appointmentDate || '...'}</Typography>
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
              <Typography>{`${data?.patient?.lastName} ${data?.patient?.firstName}`}</Typography>
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
        <ActivityContainer data={data} />
      </Container>
    </Layout>
  )
}

export default PaymentDetail
