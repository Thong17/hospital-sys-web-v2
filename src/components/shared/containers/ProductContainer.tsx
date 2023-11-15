import { StickyTable } from 'components/shared/table/StickyTable'
import useTheme from 'hooks/useTheme'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { SearchButton } from 'components/shared/buttons/CustomButton'
import { translate } from 'contexts/language/LanguageContext'
import { useAppDispatch, useAppSelector } from 'app/store'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { debounce, renderColorByValue, sumArrayValues } from 'utils/index'
import { useSearchParams } from 'react-router-dom'
import useLanguage from 'hooks/useLanguage'
import { Box, Stack } from '@mui/material'
import { LanguageOptions } from 'contexts/language/interface'
import { IThemeStyle } from 'contexts/theme/interface'
import { selectProductList } from 'stores/product/selector'
import { getProductList } from 'stores/product/action'
import ProductBody from 'pages/organize/product/components/ProductBody'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'
import { selectConfig } from 'stores/config/selector'
import { INVOICE_FORM_WIDTH_COMPACTED, INVOICE_FORM_WIDTH_EXPANDED } from 'pages/pos/sale/constant'

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

const ProductContainer = forwardRef(({ onAddProduct }: { onAddProduct: (data: any) => void }, ref) => {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const { data, metaData } = useAppSelector(selectProductList)
  const [queryParams, setQueryParams] = useSearchParams()
  const { isOpenedCart } = useAppSelector(selectConfig)

  const fetchListProduct = (queryParams: any) => {
    dispatch(getProductList({ params: queryParams }))
  }

  useImperativeHandle(ref, () => ({
    fetchListProduct,
  }))

  useEffect(() => {
    fetchListProduct(queryParams)
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
      <Stack
        direction={'column'}
        sx={{
          position: 'relative',
          height: '100%',
          width: `calc(100% - ${
            isOpenedCart
              ? INVOICE_FORM_WIDTH_EXPANDED
              : INVOICE_FORM_WIDTH_COMPACTED
          }px)`,
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
            height: '100%',
          }}
        >
          <StickyTable
            rows={data?.map((item: any) =>
              mapData(item, lang, theme, onAddProduct)
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
  )
})

export default ProductContainer
