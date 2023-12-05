import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { Layout } from 'components/layouts/Layout'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { Box, DialogActions, Stack } from '@mui/material'
import {
  CancelButton,
  CreateButton,
  CustomizedButton,
  OptionButton,
  SearchButton,
} from 'components/shared/buttons/CustomButton'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectRoleList } from 'stores/role/selector'
import { useEffect, useState } from 'react'
import {
  getRoleDelete,
  getRoleExport,
  getRoleImport,
  getRoleList,
  getRoleValidate,
} from 'stores/role/action'
import useLanguage from 'hooks/useLanguage'
import { ActionButton } from 'components/shared/buttons/ActionButton'
import { dateFormat, debounce } from 'utils/index'
import { useSearchParams } from 'react-router-dom'
import useAlert from 'hooks/useAlert'
import { translate } from 'contexts/language/LanguageContext'
import { convertBufferToArrayBuffer, downloadBuffer } from 'utils/index'
import ContainerDialog from 'components/shared/dialogs/Dialog'
import RoleImportTable from './components/RoleImportTable'
import TitleContainer from 'components/shared/containers/TitleContainer'
import useTheme from 'hooks/useTheme'
import useDevice from 'hooks/useDevice'
import { selectSession } from 'stores/session/selector'

const roleColumns: ITableColumn<any>[] = [
  { label: translate('NAME'), id: 'name', sort: 'desc' },
  { label: translate('STATUS'), id: 'status' },
  { label: translate('DESCRIPTION'), id: 'description' },
  { label: translate('CREATED_BY'), id: 'createdBy' },
  { label: translate('CREATED_AT'), id: 'createdAt', sort: 'desc' },
  { label: translate('ACTION'), id: 'action', align: 'right' },
]

const Role = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { theme } = useTheme()
  const { device } = useDevice()
  const { lang } = useLanguage()
  const { user } = useAppSelector(selectSession)
  const privilege = user?.privilege?.admin?.role || {}
  const { data, metaData } = useAppSelector(selectRoleList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(roleColumns)
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })
  const [importDialog, setImportDialog] = useState({ open: false, data: [] })

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
          .catch(() => {})
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
      .catch(() => {})
  }

  const handleValidationImport = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    dispatch(getRoleValidate({ file }))
      .unwrap()
      .then((response: any) => {
        if (response?.code !== 'SUCCESS') return
        setImportDialog({ open: true, data: response?.data })
      })
      .catch(() => {})
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

  const handleChangeLimit = (limit: number) => {
    handleChangeQuery({ limit })
  }

  const handleChangeSearch = debounce((value: string) => {
    handleChangeQuery({ search: value, page: 1 })
  }, 500)

  const handleRemoveImport = (data: any) => {
    confirm({
      title: translate('CONFIRM_REMOVE_TITLE'),
      description: translate('CONFIRM_REMOVE_DESCRIPTION'),
      variant: 'error',
    })
      .then(() => {
        setImportDialog((prev: any) => ({
          ...prev,
          data: prev.data?.filter((item: any) => item.data?.id !== data?.id),
        }))
      })
      .catch(() => {})
  }

  const handleImport = () => {
    const data = importDialog.data?.map((item: any) => {
      const obj = { ...item.data, _id: item.data.id }
      delete obj.id
      return obj
    })
    dispatch(getRoleImport({ data }))
      .unwrap()
      .then(() => fetchListRole(queryParams))
      .catch(() => {})
  }

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
      <ContainerDialog
        justify='center'
        isOpen={importDialog.open}
        onClose={() => setImportDialog({ open: false, data: [] })}
      >
        <Box sx={{ position: 'relative' }}>
          <RoleImportTable
            data={importDialog.data}
            onRemove={handleRemoveImport}
          />
        </Box>
        <DialogActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <CancelButton
            onClick={() => setImportDialog({ open: false, data: [] })}
          />
          <CustomizedButton
            onClick={handleImport}
            label={translate('CONFIRM')}
          />
        </DialogActions>
      </ContainerDialog>
      <Container padding='0'>
        <Box sx={{ paddingX: `${theme.responsive[device]?.padding.side}px` }}>
          <TitleContainer text={translate('TITLE_ROLE_LIST') as String}>
            <Stack direction={'row'} gap={1}>
              <SearchButton onChange={handleChangeSearch} />
              {(privilege?.import || privilege?.export) && <OptionButton
                onImport={privilege?.import && handleValidationImport}
                onExport={privilege?.export && handleExport}
              />}
              <CreateButton onClick={handleCreate} />
            </Stack>
          </TitleContainer>
        </Box>
        <Box sx={{ padding: `3px ${theme.responsive[device]?.padding.side}px` }}>
          <StickyTable
            rows={data?.map((item: any) =>
              mapData(item, lang, handleEdit, handleDelete)
            )}
            columns={columns}
            onSort={handleSort}
            count={metaData?.total}
            limit={metaData?.limit}
            skip={metaData?.skip}
            onChangeLimit={handleChangeLimit}
            onChangePage={handleChangePage}
            onClick={handleClick}
          />
        </Box>
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
    name: item.name?.[lang] ?? item.name?.['English'],
    status: item.status,
    description: item.description,
    createdAt: dateFormat(item.createdAt),
    createdBy: item.createdBy?.username,
    action: <ActionButton data={item} onDelete={onDelete} onEdit={onEdit} />,
  }
}

export default Role
