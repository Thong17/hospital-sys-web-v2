import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { CustomizedIconButton } from '../buttons/ActionButton'
import { Box, Stack, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { translate } from 'contexts/language/LanguageContext'
import { CustomizedButton } from '../buttons/CustomButton'
import { TextInput } from '../forms/TextInput'
import { useEffect, useRef, useState } from 'react'
import ProductBox from '../forms/ProductBox'
import ImageContainer from './ImageContainer'

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
  const { isOpenedCart } = useAppSelector(selectConfig)
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const commentRef = useRef<any>(document.createElement('input'))
  const [productDialog, setProductDialog] = useState({ open: false })
  const [cardItems, setCardItems] = useState<any[]>([])

  useEffect(() => {
    commentRef.current.value = data?.comment
  }, [data])

  const handleAddProduct = (data: any) => {
    setCardItems([...cardItems, { ...data, quantity: 1 }])
  }

  return (
    <>
      <ProductBox
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
            <Stack direction={'column'} sx={{ height: '100%', padding: '10px 0' }} gap='10px'>
              {cardItems.map((item: any, key: number) => (
                <ProductItem data={item} key={key} />
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

const PRODUCT_IMAGE_SIZE = 45

const ProductItem = ({ data }: { data: any }) => {
  const { theme } = useTheme()
  return (
    <Stack direction={'row'} sx={{ padding: '5px', border: theme.border.dashed, borderRadius: theme.radius.rounded }}>
      <Box
        sx={{
          width: `${PRODUCT_IMAGE_SIZE}px`,
          height: `${PRODUCT_IMAGE_SIZE}px`,
          borderRadius: theme.radius.circle,
          overflow: 'hidden',
        }}
      >
        <ImageContainer url={data?.image?.filename} />
      </Box>
    </Stack>
  )
}

export default CartContainer
