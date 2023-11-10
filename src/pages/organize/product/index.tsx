import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { Box, DialogActions, Stack } from '@mui/material'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { CancelButton, CreateButton, CustomizedButton, OptionButton, SearchButton } from 'components/shared/buttons/CustomButton'
import useDevice from 'hooks/useDevice'
import { translate } from 'contexts/language/LanguageContext'
import { useAppDispatch, useAppSelector } from 'app/store'
import { useEffect, useState } from 'react'
import { ActionButton } from 'components/shared/buttons/ActionButton'
import { convertBufferToArrayBuffer, debounce, downloadBuffer } from 'utils/index'
import { useNavigate } from 'react-router'
import useAlert from 'hooks/useAlert'
import { useSearchParams } from 'react-router-dom'
import ContainerDialog from 'components/shared/dialogs/Dialog'
import ProductImportTable from './components/ProductImportTable'
import { selectProductList } from 'stores/product/selector'
import { getProductDelete, getProductExport, getProductImport, getProductList, getProductValidate } from 'stores/product/action'

const productColumns: ITableColumn<any>[] = [
  { label: translate('USERNAME'), id: 'username', sort: 'desc' },
  { label: translate('FULL_NAME'), id: 'fullName', sort: 'desc' },
  { label: translate('GENDER'), id: 'gender' },
  { label: translate('RATE'), id: 'rate' },
  { label: translate('STATUS'), id: 'status' },
  { label: translate('ACTION'), id: 'action', align: 'right' },
]

const mapData = (
  item: any,
  onEdit: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
) => {
  return {
    _id: item._id,
    username: item.username,
    fullName: item.fullName,
    gender: item.gender,
    rate: item.rate,
    status: item.status,
    action: <ActionButton data={item} onDelete={onDelete} onEdit={onEdit} />,
  }
}

const Product = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { theme } = useTheme()
  const { device } = useDevice()
  const { data, metaData } = useAppSelector(selectProductList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(productColumns)
  const [queryParams, setQueryParams] = useSearchParams()
  const [importDialog, setImportDialog] = useState({ open: false, data: [] })

  const fetchListProduct = (queryParams: any) => {
    dispatch(getProductList({ params: queryParams }))
  }

  useEffect(() => {
    fetchListProduct(queryParams)
  }, [queryParams])

  const handleCreate = () => {
    navigate('/organize/product/create')
  }

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    navigate(`/organize/product/update/${data._id}`)
  }

  const handleClick = (data: any) => {
    navigate(`/organize/product/detail/${data._id}`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_PRODUCT_TITLE'),
      description: translate('DELETE_PRODUCT_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getProductDelete({ id: data._id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => fetchListProduct(queryParams))
          .catch(() => {})
      })
      .catch(() => {})
  }

  const handleExport = () => {
    dispatch(getProductExport({ params: queryParams }))
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
    dispatch(getProductValidate({ file }))
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
    dispatch(getProductImport({ data }))
      .unwrap()
      .then(() => fetchListProduct(queryParams))
      .catch(() => {})
  }

  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} selectedOption={{ navbar: '/organize/product' }} />}>
      <ContainerDialog
        justify='center'
        isOpen={importDialog.open}
        onClose={() => setImportDialog({ open: false, data: [] })}
      >
        <Box sx={{ position: 'relative' }}>
          <ProductImportTable
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
          <TitleContainer text={translate('TITLE_PRODUCT_LIST') as String}>
            <Stack direction={'row'} gap={1}>
              <SearchButton onChange={handleChangeSearch} />
              <OptionButton
                onImport={handleValidationImport}
                onExport={handleExport}
              />
              <CreateButton onClick={handleCreate} />
            </Stack>
          </TitleContainer>
        </Box>
        <Box sx={{ padding: `3px ${theme.responsive[device]?.padding.side}px` }}>
          <StickyTable
            rows={data?.map((item: any) =>
              mapData(item, handleEdit, handleDelete)
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

export default Product
