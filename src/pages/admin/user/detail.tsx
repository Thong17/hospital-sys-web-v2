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
import { LocaleDetail } from 'components/shared/containers/LocaleContainer'
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

const UserDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { id } = useParams()
  const { theme } = useTheme()
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
        <Stack direction={'row'} mb={2}>
          <LocaleDetail label={translate('NAME') as String} data={data?.name} />
          <Stack sx={{ width: '100%' }}>
            <LabelDetail label={translate('DESCRIPTION') as String}>
              <Typography>{data?.description || '...'}</Typography>
            </LabelDetail>
            <LabelDetail marginTop='10px' label={translate('STATUS') as String}>
              <ItemContainer
                text={
                  data?.status ? translate('ENABLED') : translate('DISABLED')
                }
                color={data?.status ? theme.color.success : theme.color.error}
              />
            </LabelDetail>
          </Stack>
        </Stack>
        <PrivilegeContainer
          navigation={data?.navigation}
          privilege={data?.privilege}
        />
        <ActivityContainer data={data} />
      </Container>
    </Layout>
  )
}

export default UserDetail
