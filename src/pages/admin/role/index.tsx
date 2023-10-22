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
import { ActionButton } from 'components/shared/buttons/ActionButton'

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

  const handleEdit = (data: any) => {
    console.log(data)
  }

  const handleDelete = (data: any) => {
    console.log(data)
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
              rows={data?.map((item: any) => mapData(item, lang, handleEdit, handleDelete))}
              columns={[
                { label: 'No', id: 'no' },
                { label: 'Name', id: 'name' },
                { label: 'Status', id: 'status' },
                { label: 'Description', id: 'description' },
                { label: 'Action', id: 'action', align: 'right' },
              ]}
            />
          </Container>
        </Layout>
      )}
    </>
  )
}

const mapData = (item: any, lang: string, onEdit: (_data: any) => void, onDelete: (_data: any) => void) => {
  return { no: 1, name: item.name[lang] ?? item.name['English'], status: item.status, description: item.description, action: <ActionButton data={item} onDelete={onDelete} onEdit={onEdit} /> }
}

export default Role
