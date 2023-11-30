import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { SearchButton } from 'components/shared/buttons/CustomButton'
import { translate } from 'contexts/language/LanguageContext'
import { useAppDispatch, useAppSelector } from 'app/store'
import { useEffect } from 'react'
import { currencyFormat, debounce, renderStage, timeFormat } from 'utils/index'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDevice from 'hooks/useDevice'
import { Box, Stack, Typography } from '@mui/material'
import { selectPaymentList } from 'stores/payment/selector'
import { getPaymentList } from 'stores/payment/action'
import { CustomizedIconButton } from 'components/shared/buttons/ActionButton'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'

const paymentColumns: ITableColumn<any>[] = [
  { label: translate('INVOICE'), id: 'invoice' },
  { label: translate('DOCTOR'), id: 'doctor' },
  { label: translate('PATIENT'), id: 'patient' },
  { label: translate('SUBTOTAL'), id: 'subtotal' },
  { label: translate('TOTAL'), id: 'total' },
  { label: translate('STAGE'), id: 'stage' },
  { label: translate('CREATED_AT'), id: 'createdAt' },
  { label: translate('ACTION'), id: 'action', align: 'right' },
]

const mapData = (
  item: any,
  theme: any,
  onClick: (id: string) => void
) => {
  return {
    _id: item?._id,
    invoice: item?.invoice?.split('-')[1],
    subtotal: currencyFormat(item?.subtotal),
    total: currencyFormat(item?.total),
    patient: <Stack>
      <Typography>{item?.schedule?.patient?.username}</Typography>
      <Typography color={theme.text.quaternary} variant={'p' as any}>{item?.schedule?.patient?.contact || '...'}</Typography>
    </Stack>,
    doctor: <Stack>
      <Typography>{item?.schedule?.doctor?.username}</Typography>
      <Typography color={theme.text.quaternary} variant={'p' as any}>{item?.schedule?.doctor?.contact || '...'}</Typography>
    </Stack>,
    stage: renderStage(item.stage, theme),
    createdAt: timeFormat(item.createdAt, 'DD MMM YYYY'),
    action: <CustomizedIconButton onClick={() => onClick(item?._id)} icon={<ArrowRightAltRoundedIcon />} />
  }
}

const Payment = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { device } = useDevice()
  const { data, metaData } = useAppSelector(selectPaymentList)
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })

  const fetchListPayment = (queryParams: any) => {
    dispatch(getPaymentList({ params: queryParams }))
  }

  useEffect(() => {
    fetchListPayment(queryParams)
  }, [queryParams])

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

  const handleClick = (id: string) => {
    navigate(`/pos/payment/${id}`)
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={breadcrumbs}
          step={2}
          selectedOption={{ navbar: '/pos/payment' }}
        />
      }
    >
      <Container padding={`${theme.responsive[device]?.padding.side}px`}>
        <Box>
          <TitleContainer text={translate('TITLE_PAYMENT_LIST') as String}>
            <Stack direction={'row'} gap={1}>
              <SearchButton onChange={handleChangeSearch} />
            </Stack>
          </TitleContainer>
        </Box>
        <Box
          sx={{
            padding: `3px 0`,
            height: '100%',
          }}
        >
          <StickyTable
            rows={data?.map((item: any) =>
              mapData(item, theme, handleClick)
            )}
            columns={paymentColumns}
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

export default Payment
