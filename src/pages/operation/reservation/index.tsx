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
import { calculateDuration, debounce, timeFormat } from 'utils/index'
import { useNavigate } from 'react-router'
import useAlert from 'hooks/useAlert'
import { useSearchParams } from 'react-router-dom'
import { selectReservationList } from 'stores/reservation/selector'
import { getReservationDelete, getReservationList } from 'stores/reservation/action'
import LabelStatus from 'components/shared/LabelStatus'

const reservationColumns: ITableColumn<any>[] = [
  { label: translate('APPOINTMENT_TIME'), id: 'appointmentDate', sort: 'desc' },
  { label: translate('DURATION'), id: 'duration' },
  { label: translate('CATEGORY'), id: 'category' },
  { label: translate('NOTE'), id: 'note' },
  { label: translate('PATIENT'), id: 'patient' },
  { label: translate('CONTACT'), id: 'contact' },
  { label: translate('STAGE'), id: 'stage' },
  { label: translate('ACTION'), id: 'action', align: 'right' },
]

const renderCategory = (value: string, theme: any) => {
  switch (true) {
    case value === 'MILD':
      return <LabelStatus label={translate(value)} color={theme.color.warning} />

    case value === 'URGENT':
      return <LabelStatus label={translate(value)} color={theme.color.orange} />

    case value === 'EMERGENCY':
      return <LabelStatus label={translate(value)} color={theme.color.error} />
  
    default:
      return <LabelStatus label={translate(value)} color={theme.color.info} />
  }
}

const renderStage = (value: string, theme: any) => {
  switch (true) {
    case value === 'ACCEPTED':
      return <LabelStatus label={translate(value)} color={theme.color.success} />

    case value === 'REJECT':
      return <LabelStatus label={translate(value)} color={theme.color.error} />
  
    default:
      return <LabelStatus label={translate(value)} color={theme.color.warning} />
  }
}

const mapData = (
  item: any,
  theme: any,
  onEdit: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void,
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
) => {
  return {
    _id: item._id,
    endTime: item.endTime,
    appointmentDate: timeFormat(item.appointmentDate, 'DD MMM YYYY hh:mm A'),
    duration: calculateDuration(item.duration),
    category: renderCategory(item.category, theme),
    note: item.note,
    patient: item.patient?.username,
    contact: item.patient?.contact,
    stage: renderStage(item.stage, theme),
    action: <ActionButton data={item} onDelete={onDelete} onEdit={onEdit} />,
  }
}

const Reservation = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirm = useAlert()
  const { theme } = useTheme()
  const { device } = useDevice()
  const { data, metaData } = useAppSelector(selectReservationList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(reservationColumns)
  const [queryParams, setQueryParams] = useSearchParams()

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

  const handleReject = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    confirm({
      title: translate('REJECT_RESERVATION_TITLE'),
      description: translate('REJECT_RESERVATION_DESCRIPTION'),
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
              mapData(item, theme, handleEdit, handleReject)
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
