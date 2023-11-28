import {
  INVOICE_FORM_WIDTH_EXPANDED,
  INVOICE_FORM_WIDTH_COMPACTED,
} from 'pages/pos/sale/constant'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { CustomizedIconButton } from '../buttons/ActionButton'
import { Box, Stack, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'
import { translate } from 'contexts/language/LanguageContext'
import { CustomizedButton } from '../buttons/CustomButton'
import { useEffect, useState } from 'react'
import { ProductItem } from '../containers/CartContainer'
import { getPaymentComplete, getPaymentDetail } from 'stores/payment/action'
import { selectPaymentDetail } from 'stores/payment/selector'
import { currencyFormat, sumArrayValues } from 'utils/index'

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

  const handleCompletePayment = () => {
    if (!id) return
    dispatch(getPaymentComplete({ id }))
    dispatch(getPaymentDetail({ id }))
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
                _id={item?._id}
                key={key}
                {...(detail?.stage !== 'COMPLETED' && { onRemove: onRemove })}
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
              <Stack direction={'row'} gap={1} alignItems={'center'} sx={{ width: '100%', paddingLeft: '10px', boxSizing: 'border-box' }}>
                <Typography>{translate('TOTAL')}:</Typography>
                <Typography>{currencyFormat(sumArrayValues(detail?.transactions?.map((item: any) => item.total)))}</Typography>
              </Stack>
              <CustomizedButton
                onClick={handleCompletePayment}
                color={theme.color.success}
                disabled={detail?.stage === 'COMPLETED'}
                fullWidth
                label={detail?.stage === 'COMPLETED' ? translate('COMPLETED') : translate('COMPLETE')}
              />
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default InvoiceForm
