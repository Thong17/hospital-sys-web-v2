import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { Box, Stack } from '@mui/material'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { CreateButton, SearchButton } from 'components/shared/buttons/CustomButton'
import useDevice from 'hooks/useDevice'
import { translate } from 'contexts/language/LanguageContext'
import { useAppDispatch, useAppSelector } from 'app/store'
import { useEffect, useState } from 'react'
import { ActionButton } from 'components/shared/buttons/ActionButton'
import { calculateDuration, debounce, renderCategory, renderStage, timeFormat } from 'utils/index'
import { useNavigate } from 'react-router'
import useAlert from 'hooks/useAlert'
import { useSearchParams } from 'react-router-dom'
import { selectReservationList } from 'stores/reservation/selector'
import { getReservationAccept, getReservationDelete, getReservationList, getReservationRefuse } from 'stores/reservation/action'
import { selectSession } from 'stores/session/selector'

const reservationColumns: ITableColumn<any>[] = [
  { label: translate('APPOINTMENT_TIME'), id: 'appointmentDate', sort: 'desc' },
  { label: translate('DURATION'), id: 'duration' },
  { label: translate('CATEGORY'), id: 'category' },
  { label: translate('NOTE'), id: 'note' },
  { label: translate('PATIENT'), id: 'patient' },
  { label: translate('CONTACT'), id: 'contact' },
  { label: translate('DOCTOR'), id: 'doctors' },
  { label: translate('STAGE'), id: 'stage' },
  { label: translate('ACTION'), id: 'action', align: 'right' },
]

const mapData = (
  item: any,
  theme: any,
  user: any,
  onAccept: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onRefuse: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onEdit: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
) => {
  const { accept = false, refuse = false, update = false, delete: _delete = false } = user?.privilege?.operation?.reservation ?? {}
  return {
    _id: item._id,
    endTime: item.endTime,
    appointmentDate: timeFormat(item.appointmentDate, 'DD MMM YYYY hh:mm A'),
    duration: calculateDuration(item.duration),
    category: renderCategory(item.category, theme),
    note: item.note,
    patient: item.patient?.user?.username,
    doctors: item.doctors?.map((item: any) => item.user?.username).join(', '),
    contact: item.patient?.contact,
    stage: renderStage(item.stage, theme),
    action: <ActionButton data={item} onAccept={accept && onAccept} onRefuse={refuse && onRefuse} onDelete={_delete && onDelete} onEdit={update && onEdit} />,
  }
}

const Reservation = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { user } = useAppSelector(selectSession)
  const { theme } = useTheme()
  const { device } = useDevice()
  const { data, metaData } = useAppSelector(selectReservationList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(reservationColumns)
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })

  const fetchListReservation = (queryParams: any) => {
    dispatch(getReservationList({ params: queryParams }))
  }

  useEffect(() => {
    fetchListReservation(queryParams)
  }, [queryParams])

  const handleCreate = () => {
    navigate('/operation/reservation/create')
  }

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    navigate(`/operation/reservation/update/${data._id}`)
  }

  const handleClick = (data: any) => {
    navigate(`/operation/reservation/detail/${data._id}`)
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('DELETE_RESERVATION_TITLE'),
      description: translate('DELETE_RESERVATION_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getReservationDelete({ id: data._id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => fetchListReservation(queryParams))
          .catch(() => {})
      })
      .catch(() => {})
  }

  const handleRefuse = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('REFUSE_RESERVATION_TITLE'),
      description: translate('REFUSE_RESERVATION_DESCRIPTION'),
      reason: true,
      variant: 'error',
    })
      .then((confirmData: any) => {
        dispatch(getReservationRefuse({ id: data._id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => fetchListReservation(queryParams))
          .catch(() => {})
      })
      .catch(() => {})
  }

  const handleAccept = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('ACCEPT_RESERVATION_TITLE'),
      description: translate('ACCEPT_RESERVATION_DESCRIPTION'),
      reason: true,
      variant: 'info',
    })
      .then((confirmData: any) => {
        dispatch(getReservationAccept({ id: data._id, reason: confirmData?.reason }))
          .unwrap()
          .then(() => fetchListReservation(queryParams))
          .catch(() => {})
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

  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} selectedOption={{ navbar: '/operation/reservation' }} />}>
      <Container padding='0'>
        <Box sx={{ paddingX: `${theme.responsive[device]?.padding.side}px` }}>
          <TitleContainer text={translate('TITLE_RESERVATION_LIST') as String}>
            <Stack direction={'row'} gap={1}>
              <SearchButton onChange={handleChangeSearch} />
              <CreateButton onClick={handleCreate} />
            </Stack>
          </TitleContainer>
        </Box>
        <Box sx={{ padding: `3px ${theme.responsive[device]?.padding.side}px` }}>
          <StickyTable
            rows={data?.map((item: any) =>
              mapData(item, theme, user, handleAccept, handleRefuse, handleEdit, handleDelete)
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

export default Reservation
