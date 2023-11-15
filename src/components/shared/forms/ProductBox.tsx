import { Box, Dialog, Stack } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/store'
import { StickyTable } from '../table/StickyTable'
import { selectProductList } from 'stores/product/selector'
import { LanguageOptions } from 'contexts/language/interface'
import useLanguage from 'hooks/useLanguage'
import { useSearchParams } from 'react-router-dom'
import { debounce, renderColorByValue, sumArrayValues } from 'utils/index'
import useTheme from 'hooks/useTheme'
import TitleContainer from '../containers/TitleContainer'
import { translate } from 'contexts/language/LanguageContext'
import { SearchButton } from '../buttons/CustomButton'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { getProductList } from 'stores/product/action'
import ProductBody from 'pages/organize/product/components/ProductBody'
import { IThemeStyle } from 'contexts/theme/interface'

export const mapData = (
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
        onClick={(data: any) =>
          onClick({
            name: data?.name?.['English'],
            price: data?.price,
            currency: data?.currency,
            image: data?.images?.[0],
            product: data?._id,
          })
        }
        stockColor={color}
        item={item}
      />
    ),
  }
}

const ProductBox = forwardRef(({
  isOpen = false,
  onClose,
  onAddProduct,
}: {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (data: any) => void
}, ref) => {
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const dispatch = useAppDispatch()
  const [queryParams, setQueryParams] = useSearchParams()
  const { data, metaData } = useAppSelector(selectProductList)

  const fetchListProduct = () => {
    dispatch(getProductList({ params: queryParams }))
  }

  useImperativeHandle(ref, () => ({
    fetchListProduct,
  }))

  useEffect(() => {
    fetchListProduct()
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
    <Dialog
      sx={{
        '& div': {
          color: theme.text.secondary,
          fontFamily: theme.font.family,
          fontWeight: theme.font.weight,
        },
        '& .MuiDialog-container': {
          justifyContent: 'start',
        },
        '& .MuiDialog-paper': {
          backgroundColor: theme.layout.container,
          minWidth: 'fit-content',
          borderRadius: theme.radius.quaternary,
        },
      }}
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Box
        sx={{
          width: '60vw',
          height: '91vh',
          padding: '10px 0',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ padding: `0 20px` }}>
          <TitleContainer text={translate('TITLE_PRODUCT_LIST') as String}>
            <Stack direction={'row'} gap={1}>
              <SearchButton onChange={handleChangeSearch} />
            </Stack>
          </TitleContainer>
        </Box>
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
    </Dialog>
  )
})

export default ProductBox
