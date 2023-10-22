import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { Layout } from 'components/layouts/Layout'
import { StickyTable } from 'components/shared/table/StickyTable'
import { Stack, Typography } from '@mui/material'
import { CreateButton } from 'components/shared/buttons/CustomButton'
import { useNavigate, useOutlet } from 'react-router'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectRoleList } from 'stores/role/selector'
import { useEffect } from 'react'
import { getRoleList } from 'stores/role/action'
import useLanguage from 'hooks/useLanguage'

const Role = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const outlet = useOutlet()
  const { lang } = useLanguage()
  const { data } = useAppSelector(selectRoleList)

  useEffect(() => {
    dispatch(getRoleList())
  }, [])
  
  const handleCreate = () => {
    navigate('/admin/role/create')
  }

  return (
    <>
      {outlet ?? (
        <Layout
          navbar={
            <Breadcrumb
              list={breadcrumbs}
              step={2}
              selectedOption={{ navbar: '/admin/role' }}
            />
          }
        >
          <Container>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              py={1}
            >
              <Typography>Role</Typography>
              <CreateButton onClick={handleCreate} />
            </Stack>
            <StickyTable
              rows={data?.map((item: any) => mapData(item, lang))}
              columns={[
                { label: 'No', id: 'no' },
                { label: 'Name', id: 'name' },
                { label: 'Status', id: 'status' },
                { label: 'Description', id: 'description' },
              ]}
            />
          </Container>
        </Layout>
      )}
    </>
  )
}

const mapData = (item: any, lang: string) => {
  return { no: 1, name: item.name[lang] ?? item.name['English'], status: item.status, description: item.description }
}

export default Role
