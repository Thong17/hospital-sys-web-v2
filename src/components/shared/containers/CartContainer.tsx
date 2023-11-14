import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { CustomizedIconButton } from '../buttons/ActionButton'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { translate } from 'contexts/language/LanguageContext'
import { CustomizedButton } from '../buttons/CustomButton'
import { TextInput } from '../forms/TextInput'
import { useEffect, useRef, useState } from 'react'
import ProductBox from '../forms/ProductBox'
import ImageContainer from './ImageContainer'
import { currencyFormat } from 'utils/index'
import useDevice from 'hooks/useDevice'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import { StyledTypography } from '../table/Typography'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { getTransactionCreate, getTransactionDelete } from 'stores/transaction/action'
import { useParams } from 'react-router'
import useAlert from 'hooks/useAlert'

export const FORM_WIDTH_EXPANDED = 470
export const FORM_WIDTH_COMPACTED = 60

const CartContainer = ({
  data,
  onSave,
  onEnd,
}: {
  data: any
  onSave: (data: any) => void
  onEnd: (data: any) => void
}) => {
  const { id } = useParams()
  const confirm = useAlert()
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const { isOpenedCart } = useAppSelector(selectConfig)
  const commentRef = useRef<any>(document.createElement('input'))
  const [productDialog, setProductDialog] = useState({ open: false })
  const [cardItems, setCardItems] = useState<any[]>([])
  const productBoxRef = useRef<any>(null)

  useEffect(() => {
    commentRef.current.value = data?.comment
  }, [data])

  const handleRemoveProduct = (data: any) => {
    confirm({
      title: 'REMOVE_PRODUCT_TITLE',
      description: 'REMOVE_PRODUCT_DESCRIPTION',
      variant: 'error',
      reason: true
    })
      .then(({ reason }: any) => {
        dispatch(getTransactionDelete({ id: data?._id, reason }))
          .unwrap()
          .then((response: any) => {
            if (response?.code !== 'SUCCESS') return
            const { data } = response
            setCardItems((prev: any) => prev.filter((item: any) => item._id !== data?._id))
            productBoxRef.current?.fetchListProduct()
          })
          .catch(() => {})
      })
      .catch(() => {})
  }

  const handleAddProduct = (data: any) => {
    const { name, price, currency, product } = data || {}
    dispatch(
      getTransactionCreate({
        description: name,
        price,
        currency: currency?._id,
        product,
        schedule: id,
        quantity: 1,
      })
    )
      .unwrap()
      .then((response: any) => {
        if (response?.code !== 'SUCCESS') return
        const { data } = response
        setCardItems([
          ...cardItems,
          {
            _id: data?._id,
            name: data?.description,
            price: data?.price,
            currency: data?.currency,
            quantity: data?.quantity,
            total: data?.total,
            note: data?.note,
            discount: data?.discount,
          },
        ])
        productBoxRef.current?.fetchListProduct()
      })
      .catch(() => {})
  }

  return (
    <>
      <ProductBox
        ref={productBoxRef}
        isOpen={productDialog.open}
        onClose={() => setProductDialog({ open: false })}
        onAddProduct={handleAddProduct}
      />
      <Box
        sx={{
          boxShadow: theme.shadow.quaternary,
          backgroundColor: theme.layout.sidebar,
          width: isOpenedCart ? FORM_WIDTH_EXPANDED : FORM_WIDTH_COMPACTED,
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
          {isOpenedCart && (
            <CustomizedButton
              onClick={() => setProductDialog({ open: true })}
              fullWidth
              label={
                <Stack direction={'row'} gap={1}>
                  <AddRoundedIcon />
                  <Typography color={theme.color.info}>
                    {translate('ADD_MEDICINE')}
                  </Typography>
                </Stack>
              }
            />
          )}
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
                <ProductItem data={item} key={key} onRemove={handleRemoveProduct} />
              ))}
            </Stack>
            <Stack gap='7px'>
              <TextInput
                inputProps={{ ref: commentRef }}
                label={translate('COMMENT')}
                multiline
              />
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
                  onClick={() => onSave({ comment: commentRef.current?.value })}
                  label={translate('SAVE')}
                />
                <CustomizedButton
                  color={theme.color.error}
                  fullWidth
                  onClick={() => onEnd({ comment: commentRef.current?.value })}
                  label={translate('END')}
                />
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  )
}
// TODO: product cart
const PRODUCT_IMAGE_SIZE = 45

const ProductItem = ({ data, onRemove }: { data: any, onRemove: (data: any) => void }) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <Stack
      direction={'row'}
      gap={'15px'}
      sx={{
        padding: '5px',
        position: 'relative',
        border: theme.border.quaternary,
        borderRadius: theme.radius.ternary,
      }}
    >
      <Stack direction={'row'} width={'50%'} alignItems={'center'}>
        <Box
          sx={{
            width: `${PRODUCT_IMAGE_SIZE}px`,
            height: `${PRODUCT_IMAGE_SIZE}px`,
            minWidth: `${PRODUCT_IMAGE_SIZE}px`,
            minHeight: `${PRODUCT_IMAGE_SIZE}px`,
            borderRadius: theme.radius.circle,
            overflow: 'hidden',
            boxShadow: theme.shadow.quaternary,
          }}
        >
          <ImageContainer url={data?.image?.filename} />
        </Box>
        <Stack
          direction={'column'}
          justifyContent={'center'}
          marginLeft={'7px'}
          marginTop={'-2px'}
        >
          <Tooltip title={data?.name}>
            <StyledTypography noWrap>{data?.name}</StyledTypography>
          </Tooltip>
          <Stack
            direction={'row'}
            gap={'3px'}
            sx={{
              fontSize: theme.responsive[device]?.text.quaternary,
              color: theme.text.tertiary,
            }}
          >
            {`${translate('PRICE')}: `}
            {currencyFormat(data?.price, data?.currency?.symbol)}
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'20%'}
      >
        <StyledTypography
          style={{
            fontSize: theme.responsive[device]?.text.quaternary,
            color: theme.text.quaternary,
          }}
        >
          {translate('QTY')}
        </StyledTypography>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={'3px'}
          sx={{
            '& svg': {
              padding: 0,
              fontSize: theme.responsive[device]?.text.tertiary,
              color: theme.text.secondary,
            },
            fontSize: theme.responsive[device]?.text.tertiary,
          }}
        >
          <RemoveRoundedIcon fontSize='small' />
          <StyledTypography>{data?.quantity}</StyledTypography>
          <AddRoundedIcon fontSize='small' />
        </Stack>
      </Stack>
      {/* TODO: Add discount */}
      {/* <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'start'}
        width={'10%'}
      >
        <StyledTypography
          style={{
            fontSize: theme.responsive[device]?.text.quaternary,
            color: theme.text.quaternary,
          }}
        >
          {translate('DISC')}
        </StyledTypography>
        <StyledTypography>{0}%</StyledTypography>
      </Stack> */}
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'start'}
        width={'30%'}
      >
        <StyledTypography
          style={{
            fontSize: theme.responsive[device]?.text.quaternary,
            color: theme.text.quaternary,
          }}
        >
          {translate('TOTAL')}
        </StyledTypography>
        <StyledTypography>{currencyFormat(data?.total, '&#36;')}</StyledTypography>
      </Stack>
      <IconButton
        onClick={() => onRemove(data)}
        size='small'
        sx={{
          backgroundColor: `${theme.color.error}22`,
          color: theme.color.error,
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translate(0, -50%)',
          '&:hover': {
            backgroundColor: `${theme.color.error}44`,
          },
        }}
      >
        <ClearRoundedIcon fontSize='small' />
      </IconButton>
    </Stack>
  )
}

export default CartContainer
