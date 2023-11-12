import { Box, Typography } from '@mui/material'
import { currencyFormat } from 'utils/index'
import { PRODUCT_FORM_WIDTH } from '../constant'
import useTheme from 'hooks/useTheme'
import { translate } from 'contexts/language/LanguageContext'
import { LabelDetail } from 'components/shared/containers/LabelContainer'
import useLanguage from 'hooks/useLanguage'

const ProductDetail = ({ data }: { data: any }) => {
  const { theme } = useTheme()
  const { lang } = useLanguage()

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
          <Typography>{data?.name?.[lang] || data?.name?.['English']}</Typography>
        </LabelDetail>
        <LabelDetail label={translate('PRICE') as String}>
          <Typography>{currencyFormat(data?.price, <>&#36;</>)}</Typography>
        </LabelDetail>
      </Box>
    </Box>
  )
}

export default ProductDetail
