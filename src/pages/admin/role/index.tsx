import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { Layout } from 'components/layouts/Layout'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { Stack, Typography } from '@mui/material'
import { CreateButton } from 'components/shared/buttons/CustomButton'
import { useNavigate, useOutlet } from 'react-router'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectRoleList } from 'stores/role/selector'
import { useEffect, useState } from 'react'
import { getRoleList } from 'stores/role/action'
import useLanguage from 'hooks/useLanguage'
import { ActionButton } from 'components/shared/buttons/ActionButton'
import { dateFormat } from 'utils/index'
import { useSearchParams } from 'react-router-dom'

const roleColumns: ITableColumn<any>[] = [
  { label: 'No', id: 'no' },
  { label: 'Name', id: 'name', sort: 'desc' },
  { label: 'Status', id: 'status' },
  { label: 'Description', id: 'description' },
  { label: 'Created\u00a0By', id: 'createdBy' },
  { label: 'Created\u00a0At', id: 'createdAt', sort: 'desc' },
  { label: 'Action', id: 'action', align: 'right' },
]

const Role = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const outlet = useOutlet()
  const { lang } = useLanguage()
  const { data, metaData } = useAppSelector(selectRoleList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(roleColumns)
  const [queryParams, setQueryParams] = useSearchParams()

  useEffect(() => {
    dispatch(getRoleList({ params: queryParams }))
  }, [queryParams])

  const handleCreate = () => {
    navigate('/admin/role/create')
  }

  const handleEdit = (data: any) => {
    console.log(data)
  }

  const handleDelete = (data: any) => {
    console.log(data)
  }

  const handleSort = (column: any) => {
    const toggleSort = (value: 'asc' | 'desc') => {
      if (value === 'asc') return 'desc'
      return 'asc'
    }
    const sort = toggleSort(column.sort)
    handleChangeQuery({ [column.id]: sort })
    setColumns((prev: any) =>
      prev.map((item: any) =>
        item.id === column.id ? { ...item, sort } : item
      )
    )
  }

  const handleChangeQuery = (newQuery: any) => {
    const query = Object.fromEntries(queryParams.entries())
    setQueryParams({ ...query, ...newQuery })
  }

  const handleChangePage = (page: string) => {
    handleChangeQuery({ page, limit: metaData?.limit })
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
              rows={data?.map((item: any) =>
                mapData(item, lang, handleEdit, handleDelete)
              )}
              columns={columns}
              onSort={handleSort}
              count={metaData?.total}
              limit={metaData?.limit}
              skip={metaData?.skip}
              onChangePage={handleChangePage}
            />
          </Container>
        </Layout>
      )}
    </>
  )
}

const mapData = (
  item: any,
  lang: string,
  onEdit: (_data: any) => void,
  onDelete: (_data: any) => void
) => {
  return {
    no: 1,
    name: item.name[lang] ?? item.name['English'],
    status: item.status,
    description: item.description,
    createdAt: dateFormat(item.createdAt),
    createdBy: item.createdBy,
    action: <ActionButton data={item} onDelete={onDelete} onEdit={onEdit} />,
  }
}

export default Role
