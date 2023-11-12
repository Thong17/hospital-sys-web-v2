import { Box, Stack, Typography } from '@mui/material'
import { currencyFormat, timeFormat } from 'utils/index'
import { PRODUCT_FORM_WIDTH } from '../constant'
import useTheme from 'hooks/useTheme'
import { translate } from 'contexts/language/LanguageContext'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import useLanguage from 'hooks/useLanguage'
import { ActionButton } from 'components/shared/buttons/ActionButton'

const ProductDetail = ({
  product,
  stocks,
}: {
  product: any
  stocks: any[]
}) => {
  const { theme } = useTheme()
  const { lang } = useLanguage()

  const handleEditStock = (data: any) => {
    console.log(data)
  }

  const handleDeleteStock = (data: any) => {
    console.log(data)
  }

  return (
    <Box
      sx={{
        width: `calc(100% - ${PRODUCT_FORM_WIDTH}px)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          border: theme.border.tertiary,
          borderRadius: theme.radius.ternary,
          padding: '20px',
          boxSizing: 'border-box',
          '& .section-container': {
            width: 'fit-content',
            minWidth: '150px',
            background: `none`,
            marginTop: '10px',
            marginBottom: 0,
            borderRadius: theme.radius.ternary,
          },
        }}
      >
        <LabelDetail label={translate('NAME') as String}>
          <Typography>
            {product?.name?.[lang] || product?.name?.['English']}
          </Typography>
        </LabelDetail>
        <LabelDetail label={translate('PRICE') as String}>
          <Typography>{currencyFormat(product?.price, <>&#36;</>)}</Typography>
        </LabelDetail>
      </Box>
      <Stack direction={'column'} gap={2} pt={2}>
        {stocks?.map((item, key) => (
          <StockItem
            key={key}
            stock={item}
            onDelete={handleDeleteStock}
            onEdit={handleEditStock}
          />
        ))}
      </Stack>
    </Box>
  )
}

const StockItem = ({
  stock,
  onDelete,
  onEdit,
}: {
  stock: any
  onDelete: (data: any) => void
  onEdit: (data: any) => void
}) => {
  const { theme } = useTheme()

  return (
    <Stack
      direction={'row'}
      sx={{
        backgroundColor: theme.background.primary,
        borderRadius: theme.radius.ternary,
        boxShadow: theme.shadow.quaternary,
        position: 'relative',
        '& .section-container': {
          marginTop: '20px',
          marginBottom: 0,
          padding: '10px 20px',
          width: 'fit-content',
          minWidth: '50px',
        },
      }}
      gap={3}
    >
      <LabelDetail label={translate('COST') as String}>
        <Typography>{stock?.cost}</Typography>
      </LabelDetail>
      <LabelDetail label={translate('QUANTITY') as String}>
        <Typography>{stock?.quantity}</Typography>
      </LabelDetail>
      <LabelDetail label={translate('REMAIN') as String}>
        <Typography>{stock?.remain}</Typography>
      </LabelDetail>
      <LabelDetail label={translate('EXPIRE_AT') as String}>
        <Typography>{timeFormat(stock?.expireAt, 'DD MMM YYYY')}</Typography>
      </LabelDetail>
      <LabelDetail label={translate('NOTE') as String}>
        <Typography>{stock?.note || '...'}</Typography>
      </LabelDetail>
      <Box sx={{ position: 'absolute', right: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
        <LabelDetail label={translate('ACTION') as String}>
          <ActionButton data={stock} onDelete={onDelete} onEdit={onEdit} />
        </LabelDetail>
      </Box>
    </Stack>
  )
}

export default ProductDetail
