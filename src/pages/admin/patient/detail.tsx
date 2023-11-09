import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectPatientDetail } from 'stores/patient/selector'
import { getPatientDelete, getPatientDetail } from 'stores/patient/action'
import Container from 'components/shared/Container'
import { Stack, Typography } from '@mui/material'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { CustomizedIconButton, DeleteButton, EditButton } from 'components/shared/buttons/ActionButton'
import useAlert from 'hooks/useAlert'
import ActivityContainer from 'components/shared/containers/ActivityContainer'
import { calculateYearOfDate } from 'utils/index'

const PatientDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { id } = useParams()
  const { theme } = useTheme()
  const { data } = useAppSelector(selectPatientDetail)

  useEffect(() => {
    dispatch(getPatientDetail({ id }))
  }, [id])

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    navigate(`/admin/patient/update/${id}`)
  }

  const handleClickHistory = () => {
    navigate(`/admin/patient/detail/${id}/history`)
  }

  const handleClickRecord = () => {
    navigate(`/admin/patient/detail/${id}/record`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_PATIENT_TITLE'),
      description: translate('DELETE_PATIENT_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getPatientDelete({ id: id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => navigate('/admin/patient'))
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
              href: `/admin/patient/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/patient' }}
        />
      }
    >
      <Container>
        <TitleContainer text={translate('TITLE_PATIENT_DETAIL') as String}>
          <Stack direction={'row'} gap={1}>
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={handleDelete} />
            <CustomizedIconButton onClick={handleClickHistory} color={theme.color.info} tooltip={translate('HISTORY_BUTTON')} icon={<RestoreRoundedIcon fontSize='small' />} />
            <CustomizedIconButton onClick={handleClickRecord} color={theme.color.info} tooltip={translate('RECORD_BUTTON')} icon={<FolderRoundedIcon fontSize='small' />} />
          </Stack>
        </TitleContainer>
        <Stack direction={'column'} mb={2} sx={{ paddingTop: '20px', '& .section-container': { marginTop: '20px' } }}>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('FULL_NAME') as String}>
              <Typography>{data?.fullName || '...'}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('USERNAME') as String}>
              <Typography>{data?.username || '...'}</Typography>
            </LabelDetail>
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('EMAIL') as String}>
              <Typography>{data?.email || '...'}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('CONTACT') as String}>
              <Typography>{data?.contact || '...'}</Typography>
            </LabelDetail>
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('GENDER') as String}>
              <Typography>{data?.gender}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('AGE') as String}>
              <Typography>{`${calculateYearOfDate(data?.dateOfBirth)} ${translate('YEARS_OLD')}` ?? '...'}</Typography>
            </LabelDetail>
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('DESCRIPTION') as String}>
              <Typography>{data?.description || '...'}</Typography>
            </LabelDetail>
          </Stack>
        </Stack>
        <ActivityContainer data={data} />
      </Container>
    </Layout>
  )
}

export default PatientDetail
