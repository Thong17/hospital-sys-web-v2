import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { Layout } from 'components/layouts/Layout'
import { StickyTable } from 'components/shared/table/StickyTable'
import { Stack, Typography } from '@mui/material'
import { CreateButton } from 'components/shared/buttons/CustomButton'
import { useNavigate, useOutlet } from 'react-router'

const Role = () => {
  const navigate = useNavigate()
  const outlet = useOutlet()

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
              rows={[{ no: '1', name: 'Thong' }]}
              columns={[
                { label: 'No', id: 'no' },
                { label: 'Name', id: 'name' },
              ]}
            />
          </Container>
        </Layout>
      )}
    </>
  )
}

export default Role
