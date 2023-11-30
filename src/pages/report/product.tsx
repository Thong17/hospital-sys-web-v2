import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '.'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectReportProduct } from 'stores/report/selector'
import { useEffect } from 'react'
import { getReportProduct } from 'stores/report/action'
import { Stack } from '@mui/material'
import SummaryContainer from 'components/shared/containers/SummaryContainer'
import { translate } from 'contexts/language/LanguageContext'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import useTheme from 'hooks/useTheme'
import { ITableColumn, StickyTable } from 'components/shared/table/StickyTable'
import { useSearchParams } from 'react-router-dom'
import useLanguage from 'hooks/useLanguage'
import { LanguageOptions } from 'contexts/language/interface'
import { currencyFormat } from 'utils/index'


const productColumns: ITableColumn<any>[] = [
  { label: translate('NAME'), id: 'name' },
  { label: translate('PRICE'), id: 'price' },
  { label: translate('SOLD_QUANTITY'), id: 'soldQuantity' },
  { label: translate('TOTAL_SALE'), id: 'totalSale' },
  { label: translate('TOTAL_PROFIT'), id: 'totalProfit' },
]

const mapData = (
  item: any,
  lang: LanguageOptions
) => {
  return {
    _id: item._id,
    soldQuantity: item.soldQuantity,
    totalProfit: currencyFormat(item.totalSale - item.totalCost),
    totalSale: currencyFormat(item.totalSale),
    name: item.name?.[lang] || item.name?.['English'],
    price: currencyFormat(item.price, item.currency?.symbol),
  }
}


export const ProductReport = () => {
  const { data } = useAppSelector(selectReportProduct)
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const { lang }  =useLanguage()
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })

  useEffect(() => {
    dispatch(getReportProduct({ params: queryParams }))
  }, [queryParams])

  const handleChangeQuery = (newQuery: any) => {
    const query = Object.fromEntries(queryParams.entries())
    setQueryParams({ ...query, ...newQuery })
  }

  const handleChangePage = (page: string) => {
    handleChangeQuery({ page, limit: data?.metaData?.limit })
  }

  const handleChangeLimit = (limit: number) => {
    handleChangeQuery({ limit })
  }

  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} selectedOption={{ navbar: '/report/product' }} />}>
      <Container>
        <Stack direction={'row'} p={2} gap={2} sx={{ overflowX: 'auto' }}>
          <SummaryContainer
            label={translate('TOTAL_PRODUCT')}
            value={`${data?.totalProduct || 0} ${translate('UNIT')}`}
            icon={<CategoryRoundedIcon fontSize='large' />}
            color={theme.color.info}
            children={undefined}
          />
          <SummaryContainer
            label={translate('TOTAL_CATEGORY')}
            value={`${data?.totalCategory || 0} ${translate('UNIT')}`}
            icon={<CategoryRoundedIcon fontSize='large' />}
            color={theme.color.info}
            children={undefined}
          />
        </Stack>
        <StickyTable
          rows={data?.products?.map((item: any) =>
            mapData(item, lang)
          )}
          columns={productColumns}
          count={data?.metaData?.total}
          limit={data?.metaData?.limit}
          skip={data?.metaData?.skip}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
        />
      </Container>
    </Layout>
  )
}

