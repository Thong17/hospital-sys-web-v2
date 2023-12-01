import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import { StickyTable } from 'components/shared/table/StickyTable'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { SearchButton } from 'components/shared/buttons/CustomButton'
import { translate } from 'contexts/language/LanguageContext'
import { useAppDispatch, useAppSelector } from 'app/store'
import { useEffect } from 'react'
import { debounce, renderColorByValue, sumArrayValues } from 'utils/index'
import { useSearchParams } from 'react-router-dom'
import useLanguage from 'hooks/useLanguage'
import useDevice from 'hooks/useDevice'
import { Box, Stack } from '@mui/material'
import { LanguageOptions } from 'contexts/language/interface'
import { IThemeStyle } from 'contexts/theme/interface'
import { selectProductList } from 'stores/product/selector'
import { getProductList } from 'stores/product/action'
import ProductBody from 'pages/organize/product/components/ProductBody'
import InvoiceForm from 'components/shared/forms/InvoiceForm'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'
import { INVOICE_FORM_WIDTH_COMPACTED, INVOICE_FORM_WIDTH_EXPANDED } from './constant'
import { selectConfig } from 'stores/config/selector'

const mapData = (
  item: any,
  lang: LanguageOptions,
  theme: IThemeStyle,
  onClick: (data: any) => void
) => {
  const color = renderColorByValue(
    sumArrayValues(item?.stocks?.map((item: any) => item.remain)),
    sumArrayValues(item?.stocks?.map((item: any) => item.alertAt)),
    theme
  )

  return {
    name: item?.name?.[lang] || item?.name?.['English'],
    price: item?.price,
    _id: item?._id,
    image: item?.images[0],
    body: (
      <ProductBody
        onClick={() => onClick(item)}
        stockColor={color}
        item={item}
      />
    ),
  }
}

const Sale = () => {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const { device } = useDevice()
  const { lang } = useLanguage()
  const { data, metaData } = useAppSelector(selectProductList)
  const [queryParams, setQueryParams] = useSearchParams({ limit: '5' })
  const { isOpenedCart } = useAppSelector(selectConfig)

  const fetchListSale = (queryParams: any) => {
    dispatch(getProductList({ params: queryParams }))
  }

  useEffect(() => {
    fetchListSale(queryParams)
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

  const handleAddProduct = (data: any) => {
    console.log(data)
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={breadcrumbs}
          step={2}
          selectedOption={{ navbar: '/pos/sale' }}
        />
      }
    >
      <Container padding={`${theme.responsive[device]?.padding.side}px`}>
        <Stack direction={'row'} gap={3}>
          <Stack
            direction={'column'}
            sx={{
              position: 'relative',
              height: '100%',
              width: `calc(100% - ${isOpenedCart ? INVOICE_FORM_WIDTH_EXPANDED : INVOICE_FORM_WIDTH_COMPACTED }px)`,
              minHeight: `calc(100vh - ${
                FOOTER_HEIGHT + NAVBAR_HEIGHT + SPACE_TOP
              }px)`,
            }}
          >
            <Box>
              <TitleContainer text={translate('TITLE_SALE_LIST') as String}>
                <Stack direction={'row'} gap={1}>
                  <SearchButton onChange={handleChangeSearch} />
                </Stack>
              </TitleContainer>
            </Box>
            <Box
              sx={{
                padding: `3px 0`,
                height: '100%'
              }}
            >
              <StickyTable
                rows={data?.map((item: any) =>
                  mapData(item, lang, theme, handleAddProduct)
                )}
                columns={[]}
                count={metaData?.total}
                limit={metaData?.limit}
                skip={metaData?.skip}
                onChangeLimit={handleChangeLimit}
                onChangePage={handleChangePage}
                isGrid={true}
              />
            </Box>
          </Stack>
          <InvoiceForm onRemove={() => {}} />
        </Stack>
      </Container>
    </Layout>
  )
}

export default Sale
