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
import { useEffect, useState } from 'react'
import { ProductItem } from '../containers/CartContainer'
import { getPaymentDetail } from 'stores/payment/action'
import { selectPaymentDetail } from 'stores/payment/selector'

const InvoiceForm = ({ id, onRemove }: { id?: string, onRemove: (data: any) => void }) => {
  const dispatch = useAppDispatch()
  const { isOpenedCart } = useAppSelector(selectConfig)
  const [cardItems, setCardItems] = useState<any[]>([])
  const { theme } = useTheme()
  const { data: detail } = useAppSelector(selectPaymentDetail)

  useEffect(() => {
    if (!id) return
    dispatch(getPaymentDetail({ id }))
  }, [id])

  useEffect(() => {
    if (!detail?.transactions) return
    setCardItems(
      detail?.transactions?.map((item: any) => ({
        _id: item._id,
        filename: item.product?.images?.[0]?.filename,
        name: item.description,
        price: item?.price,
        quantity: item?.quantity,
        total: item?.total,
        symbol: item?.currency?.symbol,
      }))
    )

    return () => {
      setCardItems([])
    }
  }, [detail?.transactions])

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
                _id={item?._id}
                key={key}
                onRemove={onRemove}
                filename={item?.filename}
                name={item?.name}
                price={item?.price}
                symbol={item?.currency?.symbol}
                total={item?.total}
                quantity={item?.quantity}
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
