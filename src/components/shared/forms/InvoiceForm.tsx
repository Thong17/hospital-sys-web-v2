import {
  INVOICE_FORM_WIDTH_EXPANDED,
  INVOICE_FORM_WIDTH_COMPACTED,
} from 'pages/pos/sale/constant'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { CustomizedIconButton } from '../buttons/ActionButton'
import { Box, Stack } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'
import { translate } from 'contexts/language/LanguageContext'
import { CustomizedButton } from '../buttons/CustomButton'
import { useState } from 'react'
import {
  getTransactionDelete,
} from 'stores/transaction/action'
import useAlert from 'hooks/useAlert'
import { ProductItem } from '../containers/CartContainer'

const InvoiceForm = () => {
  const dispatch = useAppDispatch()
  const { isOpenedCart } = useAppSelector(selectConfig)
  const [cardItems, setCardItems] = useState<any[]>([])
  const { theme } = useTheme()
  const confirm = useAlert()

  const handleRemoveProduct = (data: any) => {
    confirm({
      title: 'REMOVE_PRODUCT_TITLE',
      description: 'REMOVE_PRODUCT_DESCRIPTION',
      variant: 'error',
      reason: true,
    })
      .then(({ reason }: any) => {
        dispatch(getTransactionDelete({ id: data?._id, reason }))
          .unwrap()
          .then((response: any) => {
            if (response?.code !== 'SUCCESS') return
            const { data } = response
            setCardItems((prev: any) =>
              prev.filter((item: any) => item._id !== data?._id)
            )
          })
          .catch(() => {})
      })
      .catch(() => {})
  }

  return (
    <Box
      sx={{
        boxShadow: theme.shadow.quaternary,
        backgroundColor: theme.layout.sidebar,
        width: isOpenedCart
          ? INVOICE_FORM_WIDTH_EXPANDED
          : INVOICE_FORM_WIDTH_COMPACTED,
        height: `calc(100vh - ${
          FOOTER_HEIGHT + NAVBAR_HEIGHT + SPACE_TOP + SPACE_TOP
        }px)`,
        position: 'sticky',
        top: '0',
        borderRadius: theme.radius.ternary,
        padding: '10px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
        alignItems: 'end',
      }}
    >
      <Stack
        direction={'row'}
        gap={'7px'}
        justifyContent={'end'}
        sx={{ width: '100%' }}
      >
        <CustomizedIconButton
          sx={{ width: '39px' }}
          onClick={() => dispatch({ type: 'config/toggleOpenCart' })}
          icon={<ShoppingCartRoundedIcon />}
        />
      </Stack>
      {isOpenedCart && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '7px',
          }}
        >
          <Stack
            direction={'column'}
            sx={{ height: '100%', padding: '10px 0' }}
            gap='10px'
          >
            {cardItems.map((item: any, key: number) => (
              <ProductItem
                data={item}
                key={key}
                onRemove={handleRemoveProduct}
              />
            ))}
          </Stack>
          <Stack gap='7px'>
            <Box
              sx={{
                width: '100%',
                position: 'relative',
                boxSizing: 'border-box',
                display: 'flex',
                gap: '7px',
              }}
            >
              <CustomizedButton
                color={theme.color.info}
                fullWidth
                label={translate('SAVE')}
              />
              <CustomizedButton
                color={theme.color.success}
                fullWidth
                label={translate('PAYMENT')}
              />
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default InvoiceForm
