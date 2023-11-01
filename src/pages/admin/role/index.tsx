import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { Layout } from 'components/layouts/Layout'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { Stack, Typography } from '@mui/material'
import {
  CreateButton,
  OptionButton,
  SearchButton,
} from 'components/shared/buttons/CustomButton'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectRoleList } from 'stores/role/selector'
import { useEffect, useState } from 'react'
import { getRoleDelete, getRoleExport, getRoleList, getRoleValidate } from 'stores/role/action'
import useLanguage from 'hooks/useLanguage'
import { ActionButton } from 'components/shared/buttons/ActionButton'
import { dateFormat, debounce } from 'utils/index'
import { useSearchParams } from 'react-router-dom'
import useAlert from 'hooks/useAlert'
import { translate } from 'contexts/language/LanguageContext'
import { convertBufferToArrayBuffer, downloadBuffer } from 'utils/index'
import useNotify from 'hooks/useNotify'
import ContainerDialog from 'components/shared/dialogs/Dialog'
import RoleImportTable from './components/RoleImportTable'

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
  const confirm = useAlert()
  const { notify } = useNotify()
  const { lang } = useLanguage()
  const { data, metaData } = useAppSelector(selectRoleList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(roleColumns)
  const [queryParams, setQueryParams] = useSearchParams()
  const [importDialog, setImportDialog] = useState({ open: true, data: [] })

  const fetchListRole = (queryParams: any) => {
    dispatch(getRoleList({ params: queryParams }))
  }

  useEffect(() => {
    fetchListRole(queryParams)
  }, [queryParams])

  const handleCreate = () => {
    navigate('/admin/role/create')
  }

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    navigate(`/admin/role/update/${data._id}`)
  }

  const handleClick = (data: any) => {
    navigate(`/admin/role/detail/${data._id}`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_ROLE_TITLE'),
      description: translate('DELETE_ROLE_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getRoleDelete({ id: data._id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => fetchListRole(queryParams))
          .catch(console.error)
      })
      .catch(() => {})
  }

  const handleExport = () => {
    dispatch(getRoleExport({ params: queryParams }))
      .unwrap()
      .then((data: any) => {
        if (data?.code !== 'SUCCESS') return
        downloadBuffer(convertBufferToArrayBuffer(data?.file?.data), data?.name)
      })
      .catch((error: any) => notify(error?.response?.data?.message, 'error'))
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    dispatch(getRoleValidate({ file }))
      .unwrap()
      .then((response: any) => {
        if (response?.code !== 'SUCCESS') return
        setImportDialog({ open: true, data: response?.data })
      })
      .catch(console.error)
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

  const handleChangeSearch = debounce((value: string) => {
    handleChangeQuery({ search: value, page: 0 })
  }, 500)

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={breadcrumbs}
          step={2}
          selectedOption={{ navbar: '/admin/role' }}
        />
      }
    >
      <ContainerDialog justify='center' isOpen={importDialog.open} onClose={() => setImportDialog({ open: false, data: [] })}>
        <RoleImportTable data={importDialog.data} />
      </ContainerDialog>
      <Container>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          py={1}
        >
          <Typography>Role</Typography>
          <Stack direction={'row'} gap={1}>
            <SearchButton onChange={handleChangeSearch} />
            <OptionButton onImport={handleImport} onExport={handleExport} />
            <CreateButton onClick={handleCreate} />
          </Stack>
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
          onClick={handleClick}
        />
      </Container>
    </Layout>
  )
}

const mapData = (
  item: any,
  lang: string,
  onEdit: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
) => {
  return {
    _id: item._id,
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
