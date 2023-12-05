import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { Box, DialogActions, Stack } from '@mui/material'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import {
  CancelButton,
  CreateButton,
  CustomizedButton,
  OptionButton,
  SearchButton,
} from 'components/shared/buttons/CustomButton'
import useDevice from 'hooks/useDevice'
import { translate } from 'contexts/language/LanguageContext'
import { useAppDispatch, useAppSelector } from 'app/store'
import { useEffect, useState } from 'react'
import {
  ActionButton,
  CustomizedIconButton,
} from 'components/shared/buttons/ActionButton'
import {
  contactFormat,
  convertBufferToArrayBuffer,
  debounce,
  downloadBuffer,
  timeFormat,
} from 'utils/index'
import { useNavigate } from 'react-router'
import useAlert from 'hooks/useAlert'
import { useSearchParams } from 'react-router-dom'
import ContainerDialog from 'components/shared/dialogs/Dialog'
import PatientImportTable from './components/PatientImportTable'
import { selectPatientList } from 'stores/patient/selector'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import { selectSession } from 'stores/session/selector'
import {
  getPatientDelete,
  getPatientExport,
  getPatientImport,
  getPatientList,
  getPatientValidate,
} from 'stores/patient/action'

const patientColumns: ITableColumn<any>[] = [
  { label: translate('FULL_NAME'), id: 'fullName' },
  { label: translate('GENDER'), id: 'gender' },
  { label: translate('DATE_OF_BIRTH'), id: 'dateOfBirth' },
  { label: translate('POINT'), id: 'point' },
  { label: translate('CONTACT'), id: 'contact' },
  { label: translate('STATUS'), id: 'status' },
  { label: translate('ACTION'), id: 'action', align: 'right' },
]

const mapData = (
  item: any,
  onEdit: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onClickRecord: (_data: any) => void
) => {
  return {
    _id: item._id,
    fullName: item.fullName,
    gender: item.gender,
    dateOfBirth: item.dateOfBirth ? timeFormat(item.dateOfBirth, 'DD MMM YYYY') : '...',
    point: item.point,
    contact: contactFormat(item.contact),
    status: item.status,
    action: (
      <ActionButton data={item} onDelete={onDelete} onEdit={onEdit}>
        <CustomizedIconButton
          onClick={(event: any) => {
            event.stopPropagation()
            onClickRecord(item)
          }}
          tooltip={translate('RECORD_BUTTON')}
          icon={<FolderRoundedIcon fontSize='small' />}
        />
      </ActionButton>
    ),
  }
}

const Patient = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { theme } = useTheme()
  const { device } = useDevice()
  const { data, metaData } = useAppSelector(selectPatientList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(patientColumns)
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })
  const [importDialog, setImportDialog] = useState({ open: false, data: [] })
  const { user } = useAppSelector(selectSession)
  const privilege = user?.privilege?.admin?.patient || {}

  const fetchListPatient = (queryParams: any) => {
    dispatch(getPatientList({ params: queryParams }))
  }

  useEffect(() => {
    fetchListPatient(queryParams)
  }, [queryParams])

  const handleCreate = () => {
    navigate('/admin/patient/create')
  }

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    navigate(`/admin/patient/update/${data._id}`)
  }

  const handleClick = (data: any) => {
    navigate(`/admin/patient/detail/${data._id}`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_PATIENT_TITLE'),
      description: translate('DELETE_PATIENT_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(
          getPatientDelete({ id: data._id, reason: confirmData?.reason })
        )
          .unwrap()
          .then(() => fetchListPatient(queryParams))
          .catch(() => {})
      })
      .catch(() => {})
  }

  const handleExport = () => {
    dispatch(getPatientExport({ params: queryParams }))
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
    dispatch(getPatientValidate({ file }))
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
    dispatch(getPatientImport({ data }))
      .unwrap()
      .then(() => fetchListPatient(queryParams))
      .catch(() => {})
  }

  const handleClickRecord = (data: any) => {
    navigate(`/admin/patient/detail/${data?._id}/record`)
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={breadcrumbs}
          step={2}
          selectedOption={{ navbar: '/admin/patient' }}
        />
      }
    >
      <ContainerDialog
        justify='center'
        isOpen={importDialog.open}
        onClose={() => setImportDialog({ open: false, data: [] })}
      >
        <Box sx={{ position: 'relative' }}>
          <PatientImportTable
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
          <TitleContainer text={translate('TITLE_PATIENT_LIST') as String}>
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
        <Box
          sx={{ padding: `3px ${theme.responsive[device]?.padding.side}px` }}
        >
          <StickyTable
            rows={data?.map((item: any) =>
              mapData(item, handleEdit, handleDelete, handleClickRecord)
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

export default Patient
