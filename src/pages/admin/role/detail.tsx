import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectRoleDetail } from 'stores/role/selector'
import { getRoleDelete, getRoleDetail } from 'stores/role/action'
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

const RoleDetail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { id } = useParams()
  const { theme } = useTheme()
  const { data } = useAppSelector(selectRoleDetail)

  useEffect(() => {
    dispatch(getRoleDetail({ id }))
  }, [id])

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    navigate(`/admin/role/update/${id}`)
  }

  const handleClickHistory = () => {
    navigate(`/admin/role/detail/${id}/history`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_ROLE_TITLE'),
      description: translate('DELETE_ROLE_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getRoleDelete({ id: id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => navigate('/admin/role'))
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
              href: `/admin/role/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/admin/role' }}
        />
      }
    >
      <Container>
        <TitleContainer text={translate('TITLE_ROLE_DETAIL') as String}>
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

export default RoleDetail
