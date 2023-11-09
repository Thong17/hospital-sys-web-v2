import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectUserDetail } from 'stores/user/selector'
import { getUserDelete, getUserDetail } from 'stores/user/action'
import Container from 'components/shared/Container'
import { Stack, Typography } from '@mui/material'
import PrivilegeContainer from 'components/shared/containers/PrivilegeContainer'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import ItemContainer from 'components/shared/containers/ItemContainer'
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { CustomizedIconButton, DeleteButton, EditButton } from 'components/shared/buttons/ActionButton'
import useAlert from 'hooks/useAlert'
import ActivityContainer from 'components/shared/containers/ActivityContainer'
import useLanguage from 'hooks/useLanguage'

const UserDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { id } = useParams()
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const { data } = useAppSelector(selectUserDetail)

  useEffect(() => {
    dispatch(getUserDetail({ id }))
  }, [id])

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    navigate(`/admin/user/update/${id}`)
  }

  const handleClickHistory = () => {
    navigate(`/admin/user/detail/${id}/history`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_USER_TITLE'),
      description: translate('DELETE_USER_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getUserDelete({ id: id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => navigate('/admin/user'))
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
              href: `/admin/user/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/user' }}
        />
      }
    >
      <Container>
        <TitleContainer text={translate('TITLE_USER_DETAIL') as String}>
          <Stack direction={'row'} gap={1}>
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={handleDelete} />
            <CustomizedIconButton onClick={handleClickHistory} color={theme.color.info} tooltip={translate('HISTORY_BUTTON')} icon={<RestoreRoundedIcon fontSize='small' />} />
          </Stack>
        </TitleContainer>
        <Stack direction={'column'} mb={2} sx={{ paddingTop: '20px', '& .section-container': { marginTop: '20px' } }}>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('USERNAME') as String}>
              <Typography>{data?.username || '...'}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('SEGMENT') as String}>
              <Typography>{data?.segment || '...'}</Typography>
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
            <LabelDetail label={translate('ROLE') as String}>
              <Typography>{data?.role?.name?.[lang] || data?.role?.name?.['English'] || '...'}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('STATUS') as String}>
              <ItemContainer
                text={
                  data?.status ? translate('ENABLED') : translate('DISABLED')
                }
                color={data?.status ? theme.color.success : theme.color.error}
              />
            </LabelDetail>
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row'}>
            <LabelDetail label={translate('DESCRIPTION') as String}>
              <Typography>{data?.description || '...'}</Typography>
            </LabelDetail>
          </Stack>
        </Stack>
        <PrivilegeContainer
          navigation={data?.role?.navigation}
          privilege={data?.role?.privilege}
        />
        <ActivityContainer data={data} />
      </Container>
    </Layout>
  )
}

export default UserDetail
