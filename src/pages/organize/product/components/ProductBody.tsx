import { currencyFormat, sumArrayValues } from 'utils/index'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded'
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded'
import { Box, Stack, Typography } from '@mui/material'
import ImageContainer from 'components/shared/containers/ImageContainer'
import useTheme from 'hooks/useTheme'
import useLanguage from 'hooks/useLanguage'
import useDevice from 'hooks/useDevice'
import { useAppSelector } from 'app/store'
import { selectSession } from 'stores/session/selector'

const IMAGE_ITEM_HEIGHT = 125

const ProductBody = ({
  item,
  stockColor,
  onEditStock,
  onClick
}: {
  item: any
  stockColor: string
  onEditStock?: (data: any) => void
  onClick?: (data: any) => void
}) => {
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const { device } = useDevice()
  const { user } = useAppSelector(selectSession)
  const privilege = user?.privilege?.organize?.stock || {}
  return (
    <Box onClick={() => onClick && onClick(item)} sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Box
        sx={{
          minHeight: `${IMAGE_ITEM_HEIGHT}px`,
          height: `${IMAGE_ITEM_HEIGHT}px`,
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.quaternary,
          border: theme.border.quaternary,
          '& img': { objectFit: 'cover', borderRadius: theme.radius.ternary },
        }}
      >
        <ImageContainer
          url={`${item?.images[0]?.filename}?bucket=${item?.images[0]?.bucketName}&mimetype=${item?.images[0]?.mimetype}`}
        />
      </Box>
      <Stack
        direction={'column'}
        justifyContent={'space-between'}
        sx={{
          height: `calc(100% - ${IMAGE_ITEM_HEIGHT}px)`,
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.quaternary,
          border: theme.border.quaternary,
          padding: '5px',
        }}
      >
        <Stack direction={'column'} sx={{ padding: '0 5px' }}>
          <Typography
            noWrap
            sx={{ fontSize: theme.responsive[device]?.text?.secondary }}
          >
            {item?.name?.[lang] || item?.name?.['English']}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: theme.responsive[device]?.text?.quaternary,
              color: theme.text.quaternary,
              lineHeight: 1,
            }}
          >
            {item?.description || '...'}
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          gap={'5px'}
          sx={{
            '& button, & div': {
              height: '23px',
              borderRadius: theme.radius.primary,
              padding: '0 5px',
              gap: '3px',
              boxSizing: 'border-box',
              '& svg.icon': {
                fontSize: '13px',
              },
            },
            '& div': {
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }
          }}
        >
          <Box>
            <LocalOfferRoundedIcon className='icon' />
            <Typography>{currencyFormat(item?.price, item?.currency?.symbol)}</Typography>
          </Box>
          {privilege?.detail && <Box
            onClick={(event: any) => {
              event.stopPropagation()
              onEditStock && onEditStock(item)
            }}
            sx={{
              cursor: 'pointer',
              backgroundColor: `${stockColor}22`,
              '&:hover': {
                backgroundColor: `${stockColor}44`,
              },
              '& *': {
                color: `${stockColor} !important`,
              },
            }}
          >
            <MoveToInboxRoundedIcon className='icon' />
            <Typography>
              {sumArrayValues(item?.stocks?.map((item: any) => item.remain))}
            </Typography>
          </Box>}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ProductBody
