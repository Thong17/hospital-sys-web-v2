import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { Box, Stack, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { SearchButton } from 'components/shared/buttons/CustomButton'
import useDevice from 'hooks/useDevice'
import { translate } from 'contexts/language/LanguageContext'
import { useAppDispatch, useAppSelector } from 'app/store'
import { useEffect, useState } from 'react'
import { CustomizedIconButton } from 'components/shared/buttons/ActionButton'
import { debounce, renderStage, timeFormat } from 'utils/index'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { selectScheduleList } from 'stores/schedule/selector'
import { getScheduleList, getScheduleStart } from 'stores/schedule/action'
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded'
import { DeviceOptions } from 'contexts/web/interface'
import { IThemeStyle } from 'contexts/theme/interface'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import { selectSession } from 'stores/session/selector'

const scheduleColumns: ITableColumn<any>[] = [
  { label: translate('APPOINTMENT_DATE'), id: 'appointmentDate', maxWidth: 50 },
  { label: translate('PATIENT'), id: 'patient', maxWidth: 30 },
  { label: translate('DOCTOR'), id: 'doctor', maxWidth: 30 },
  { label: translate('NOTE'), id: 'note', maxWidth: 100 },
  { label: translate('STATUS'), id: 'stage', maxWidth: 5 },
  { label: translate('ACTION'), id: 'action', maxWidth: 5, align: 'right' },
]

const mapData = (
  item: any,
  user: any,
  theme: IThemeStyle,
  device: DeviceOptions,
  onStart: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
) => {
  const { start = false, end = false } = user?.privilege?.operation?.schedule ?? {}
  let action =
    item.stage === 'ENDED' ? (
      start ? <CustomizedIconButton
        onClick={(event) => onStart(event, item)}
        icon={<ArrowRightAltRoundedIcon fontSize='small' />}
      /> : <></>
    ) : (
      end ? <CustomizedIconButton
        onClick={(event) => onStart(event, item)}
        icon={<FmdGoodRoundedIcon fontSize='small' />}
      /> : <></>
    )
  return {
    _id: item._id,
    doctor: (
      <Stack>
        <Typography sx={{ fontSize: theme.responsive[device]?.text.tertiary }}>
          {item.doctor?.username || item.doctor?.fullName}
        </Typography>
        <Typography
          color={theme.text.quaternary}
          sx={{ fontSize: theme.responsive[device]?.text.quaternary }}
        >
          {item.doctor?.contact || '...'}
        </Typography>
      </Stack>
    ),
    patient: (
      <Stack>
        <Typography sx={{ fontSize: theme.responsive[device]?.text.tertiary }}>
          {item.patient?.username || item.patient?.fullName}
        </Typography>
        <Typography
          color={theme.text.quaternary}
          sx={{ fontSize: theme.responsive[device]?.text.quaternary }}
        >
          {item.patient?.contact || '...'}
        </Typography>
      </Stack>
    ),
    appointmentDate: (
      <Stack>
        <Typography sx={{ fontSize: theme.responsive[device]?.text.tertiary }}>
          {timeFormat(item.reservation?.appointmentDate, 'hh:mm A')}
        </Typography>
        <Typography
          color={theme.text.quaternary}
          sx={{ fontSize: theme.responsive[device]?.text.quaternary }}
        >
          {timeFormat(item.reservation?.appointmentDate, 'DD MMMM YYYY') ||
            '...'}
        </Typography>
      </Stack>
    ),
    stage: renderStage(item.stage, theme),
    note: item.note,
    action,
  }
}

const Schedule = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useAppSelector(selectSession)
  const { device } = useDevice()
  const { data, metaData } = useAppSelector(selectScheduleList)
  const [columns, setColumns] = useState<ITableColumn<any>[]>(scheduleColumns)
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })

  const fetchListSchedule = (queryParams: any) => {
    dispatch(getScheduleList({ params: queryParams }))
  }

  useEffect(() => {
    fetchListSchedule(queryParams)
  }, [queryParams])

  const handleStart = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    event.stopPropagation()
    if (data?.startedAt) return navigate(`/operation/schedule/${data?._id}`)
    dispatch(getScheduleStart({ id: data?._id }))
      .unwrap()
      .then(() => {
        navigate(`/operation/schedule/${data?._id}`)
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
    <Layout
      navbar={
        <Breadcrumb
          list={breadcrumbs}
          step={2}
          selectedOption={{ navbar: '/operation/schedule' }}
        />
      }
    >
      <Container padding='0'>
        <Box sx={{ paddingX: `${theme.responsive[device]?.padding.side}px` }}>
          <TitleContainer text={translate('TITLE_SCHEDULE_LIST') as String}>
            <Stack direction={'row'} gap={1}>
              <SearchButton onChange={handleChangeSearch} />
            </Stack>
          </TitleContainer>
        </Box>
        <Box
          sx={{ padding: `3px ${theme.responsive[device]?.padding.side}px` }}
        >
          <StickyTable
            rows={data?.map((item: any) =>
              mapData(item, user, theme, device, handleStart)
            )}
            columns={columns}
            onSort={handleSort}
            count={metaData?.total}
            limit={metaData?.limit}
            skip={metaData?.skip}
            onChangeLimit={handleChangeLimit}
            onChangePage={handleChangePage}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default Schedule
