import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { CustomizedIconButton } from '../buttons/ActionButton'
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
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
import {
  getTransactionCreate,
  getTransactionDelete,
} from 'stores/transaction/action'
import { useParams } from 'react-router'
import useAlert from 'hooks/useAlert'
import {
  MEDICINE_TAKEN_DAY,
  MEDICINE_TAKEN_TIME,
  MEDICINE_TAKEN_TYPE,
} from 'constants/options'
import { AutoCompleteInput } from '../forms/AutoComplete'
import { selectSession } from 'stores/session/selector'
import { BorderLessSelect } from '../forms/SelectInput'

export const FORM_WIDTH_EXPANDED = 470
export const FORM_WIDTH_COMPACTED = 60

const CartContainer = ({
  data,
  transactions,
  onSave,
  onEnd,
  disabled = false,
}: {
  data: any
  transactions: any[]
  onSave: (data: any) => void
  onEnd: (data: any) => void
  disabled?: boolean
}) => {
  const { id } = useParams()
  const confirm = useAlert()
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const { isOpenedCart } = useAppSelector(selectConfig)
  const commentRef = useRef<any>(document.createElement('input'))
  const [productDialog, setProductDialog] = useState({ open: false })
  const [cardItems, setCardItems] = useState<IProductItem[]>([])
  const [editItemForm, setEditItemForm] = useState<any>({ _id: null })
  const productBoxRef = useRef<any>(null)

  useEffect(() => {
    if (!transactions) return
    setCardItems(
      transactions?.map((item: any) => ({
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
  }, [transactions])

  useEffect(() => {
    commentRef.current.value = data?.comment
  }, [data])

  const handleRemoveProduct = (_id: any) => {
    confirm({
      title: 'REMOVE_PRODUCT_TITLE',
      description: 'REMOVE_PRODUCT_DESCRIPTION',
      variant: 'error',
      reason: true,
    })
      .then(({ reason }: any) => {
        dispatch(getTransactionDelete({ id: _id, reason }))
          .unwrap()
          .then((response: any) => {
            if (response?.code !== 'SUCCESS') return
            const { data } = response
            setCardItems((prev: any) =>
              prev.filter((item: any) => item._id !== data?._id)
            )
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
            symbol: data?.currency?.symbol,
            quantity: data?.quantity,
            total: data?.total,
            filename: data?.product?.images?.[0]?.filename,
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
          top: '10px',
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
              disabled={disabled}
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
              sx={{ height: '50vh', padding: '10px 8px', overflowY: 'auto' }}
              gap='10px'
            >
              {cardItems.map((item: any, key: number) => (
                <ProductItem
                  key={key}
                  {...(!disabled && { onRemove: handleRemoveProduct })}
                  _id={item?._id}
                  filename={item?.filename}
                  name={item?.name}
                  price={item?.price}
                  symbol={item?.currency?.symbol}
                  total={item?.total}
                  quantity={item?.quantity}
                  onClick={
                    editItemForm?._id !== item?._id
                      ? setEditItemForm
                      : undefined
                  }
                >
                  {editItemForm?._id === item?._id && (
                    <ProductItemForm
                      data={item}
                      onCancel={() => setEditItemForm({ _id: null })}
                    />
                  )}
                </ProductItem>
              ))}
            </Stack>
            <Stack gap='7px'>
              <TextInput
                disabled={disabled}
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
                {disabled ? (
                  <CustomizedButton
                    fullWidth
                    disabled
                    label={translate('ENDED')}
                  />
                ) : (
                  <>
                    <CustomizedButton
                      color={theme.color.info}
                      fullWidth
                      onClick={() =>
                        onSave({ comment: commentRef.current?.value })
                      }
                      label={translate('SAVE')}
                    />
                    <CustomizedButton
                      color={theme.color.error}
                      fullWidth
                      disabled={data?.stage === 'ENDED'}
                      onClick={() =>
                        onEnd({ comment: commentRef.current?.value })
                      }
                      label={translate('END')}
                    />
                  </>
                )}
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  )
}

const PRODUCT_IMAGE_SIZE = 45

interface IProductItem {
  _id: string
  filename: string
  name: string
  price: number
  symbol: string
  total: number
  quantity: number
  onRemove?: (data: any) => void
  onClick?: (data: any) => void
  onCancel?: () => void
  onUpdate?: (data: any) => void
  children?: any
}

export const ProductItemForm = (props: any) => {
  const { data, onCancel, onUpdate } = props
  const { theme } = useTheme()
  const { user } = useAppSelector(selectSession)
  return (
    <Box
      px={1}
      pb={1}
      sx={{
        width: '100%',
        display: 'grid',
        paddingTop: '30px',
        boxSizing: 'border-box',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: 23,
        gridTemplateAreas:
          user?.segment === 'GENERAL'
            ? `
                  'description description description description'
                  'price price price quantity'
                  'dose dose tablet tablet'
                  'when when how how'
                  'note note note note'
                  'action action action action'
                  `
            : `
                  'dose dose how how'
                  'when when tablet tablet'
                  'note note note note'
                  'action action action action'
                  `,
      }}
    >
      {user?.segment === 'GENERAL' && (
        <>
          <TextInput
            label={translate('DESCRIPTION')}
            sx={{ gridArea: 'description' }}
            defaultValue={data?.name}
          />
          <TextInput
            label={translate('PRICE')}
            sx={{ gridArea: 'price' }}
            defaultValue={data?.price}
            InputProps={{
              endAdornment: <span style={{ padding: '0 10px' }}>$</span>,
            }}
          />
          <TextInput
            label={translate('QUANTITY')}
            sx={{ gridArea: 'quantity' }}
            defaultValue={data?.quantity}
          />
        </>
      )}
      <TextInput
        label={translate('DOSE')}
        sx={{ gridArea: 'dose' }}
        defaultValue={data?.dose}
        InputProps={{
          endAdornment: (
            <FormControl sx={{ width: '370px' }}>
              <BorderLessSelect defaultValue={'DAY'} sx={{ textAlign: 'right' }}>
                {MEDICINE_TAKEN_DAY.map((item: any, key: number) => (
                  <MenuItem key={key} value={item.value}>
                    {translate(item.label)}
                  </MenuItem>
                ))}
              </BorderLessSelect>
            </FormControl>
          ),
        }}
      />
      <AutoCompleteInput
        freeSolo
        options={MEDICINE_TAKEN_TYPE.map((option: any) => option.label)}
        renderInput={(params) => (
          <TextInput {...params} label={translate('HOW')} />
        )}
        sx={{ gridArea: 'how' }}
      />
      <TextInput
        label={translate('TABLET')}
        sx={{ gridArea: 'tablet' }}
        defaultValue={data?.tablet}
      />
      <AutoCompleteInput
        freeSolo
        options={MEDICINE_TAKEN_TIME.map((option: any) => option.label)}
        renderInput={(params) => (
          <TextInput {...params} label={translate('WHEN')} />
        )}
        sx={{ gridArea: 'when' }}
      />
      <TextInput
        label={translate('NOTE')}
        sx={{ gridArea: 'note' }}
        multiline
      />
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          boxSizing: 'border-box',
          display: 'flex',
          gap: '13px',
          gridArea: 'action',
        }}
      >
        <CustomizedButton
          color={theme.color.error}
          fullWidth
          label={translate('CANCEL')}
          onClick={onCancel}
        />
        <CustomizedButton
          color={theme.color.info}
          fullWidth
          label={translate('UPDATE')}
          onClick={() => onUpdate && onUpdate({})}
        />
      </Box>
    </Box>
  )
}

export const ProductItem = (props: IProductItem) => {
  const {
    _id,
    filename,
    name,
    price,
    symbol,
    total,
    quantity,
    onRemove,
    onClick,
    children,
  } = props
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <Stack
      sx={{
        padding: '5px',
        position: 'relative',
        borderRadius: theme.radius.ternary,
        boxShadow: theme.shadow.quaternary,
      }}
    >
      <Stack
        onClick={() => onClick && onClick(props)}
        direction={'row'}
        gap={'15px'}
        sx={{
          cursor: onClick ? 'pointer' : 'default',
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
            <ImageContainer url={filename} />
          </Box>
          <Stack
            direction={'column'}
            justifyContent={'center'}
            marginLeft={'7px'}
            marginTop={'-2px'}
          >
            <Tooltip title={name}>
              <StyledTypography>{name}</StyledTypography>
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
              {currencyFormat(price, symbol)}
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
            <StyledTypography>{quantity}</StyledTypography>
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
          <StyledTypography>{currencyFormat(total, '&#36;')}</StyledTypography>
        </Stack>
        {onRemove && (
          <IconButton
            onClick={() => onRemove(_id)}
            size='small'
            sx={{
              backgroundColor: `${theme.color.error}22`,
              color: theme.color.error,
              position: 'absolute',
              right: '10px',
              top: '13px',
              '&:hover': {
                backgroundColor: `${theme.color.error}44`,
              },
            }}
          >
            <ClearRoundedIcon fontSize='small' />
          </IconButton>
        )}
      </Stack>
      {children}
    </Stack>
  )
}

export default CartContainer
