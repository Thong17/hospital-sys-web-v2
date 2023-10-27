import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectRoleDetail } from 'stores/role/selector'
import { getRoleDetail } from 'stores/role/action'
import Container from 'components/shared/Container'
import { LocaleDetail } from 'components/shared/containers/LocaleContainer'
import { Stack, Typography } from '@mui/material'
import PrivilegeContainer from 'components/shared/containers/PrivilegeContainer'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import ItemContainer from 'components/shared/containers/ItemContainer'
import useTheme from 'hooks/useTheme'

const RoleDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { theme } = useTheme()
  const { data } = useAppSelector(selectRoleDetail)

  console.log(data)

  useEffect(() => {
    dispatch(getRoleDetail({ id }))
  }, [id])

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
        <Stack direction={'row'}>
          <LocaleDetail label={translate('NAME') as String} data={data?.name} />
          <Stack sx={{ width: '100%' }}>
            <LabelDetail label={translate('DESCRIPTION') as String}>
              <Typography>{data?.description}</Typography>
            </LabelDetail>
            <LabelDetail label={translate('STATUS') as String}>
              <ItemContainer text={data?.status ? translate('ENABLED') : translate('DISABLED')} color={data?.status ? theme.color.success : theme.color.error} />
            </LabelDetail>
          </Stack>
        </Stack>
        <PrivilegeContainer navigation={data?.navigation} privilege={data?.privilege} />
      </Container>
    </Layout>
  )
}

export default RoleDetail
