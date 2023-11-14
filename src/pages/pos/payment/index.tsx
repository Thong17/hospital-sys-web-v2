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
import { debounce } from 'utils/index'
import { useSearchParams } from 'react-router-dom'
import useLanguage from 'hooks/useLanguage'
import useDevice from 'hooks/useDevice'
import { Box, Stack } from '@mui/material'
import { LanguageOptions } from 'contexts/language/interface'
import { selectPaymentList } from 'stores/payment/selector'
import { getPaymentList } from 'stores/payment/action'

const paymentColumns: ITableColumn<any>[] = [
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
  lang: LanguageOptions,
) => {

  return {
    name: item?.name?.[lang] || item?.name?.['English'],
    price: item?.price,
    _id: item?._id,
    image: item?.images[0],
  }
}

const Payment = () => {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const { device } = useDevice()
  const { lang } = useLanguage()
  const { data, metaData } = useAppSelector(selectPaymentList)
  const [queryParams, setQueryParams] = useSearchParams()

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
              mapData(item, lang)
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
