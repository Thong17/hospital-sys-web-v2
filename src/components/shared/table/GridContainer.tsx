import { Box, Stack, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import ImageContainer from '../containers/ImageContainer'
import useLanguage from 'hooks/useLanguage'
import useDevice from 'hooks/useDevice'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded'
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded'
import { currencyFormat } from 'utils/index'

export const GridContainer = ({ children }: { children: any }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridGap: 20,
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 150px))',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}

const IMAGE_ITEM_HEIGHT = 130

export const GridItem = ({ data }: { data: any }) => {
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const { device } = useDevice()
  return (
    <Box
      sx={{
        position: 'relative',
        height: 200,
        width: '100%',
        backgroundColor: theme.layout.container,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      {data?.action && (
        <Box sx={{ position: 'absolute', top: '7px', right: '7px' }}>
          {data?.action}
        </Box>
      )}
      <Box
        sx={{
          height: `${IMAGE_ITEM_HEIGHT}px`,
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.quaternary,
          '& img': { objectFit: 'cover', borderRadius: theme.radius.ternary },
        }}
      >
        <ImageContainer url={data?.image} />
      </Box>
      <Stack
        direction={'column'}
        justifyContent={'space-between'}
        sx={{
          height: `calc(100% - ${IMAGE_ITEM_HEIGHT}px)`,
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.quaternary,
          padding: '5px',
        }}
      >
        <Stack direction={'column'} sx={{ padding: '0 5px' }}>
          <Typography
            sx={{ fontSize: theme.responsive[device]?.text?.secondary }}
          >
            {data?.name?.[lang] || data?.name?.['English']}
          </Typography>
          <Typography
            sx={{
              fontSize: theme.responsive[device]?.text?.quaternary,
              color: theme.text.quaternary,
              lineHeight: 1,
            }}
          >
            {data?.description}
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          gap={'5px'}
          sx={{
            '& div': {
              width: '100%',
              height: '23px',
              borderRadius: theme.radius.primary,
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              padding: '0 5px',
              gap: '3px',
              '& svg': {
                fontSize: '13px',
              },
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: `${theme.color.info}22`,
              '& *': {
                color: `${theme.color.info} !important`,
              }
            }}
          >
            <LocalOfferRoundedIcon />
            <Typography>{currencyFormat(data?.price, <>&#36;</>)}</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: `${theme.color.info}22`,
              '& *': {
                color: `${theme.color.info} !important`,
              }
            }}
          >
            <MoveToInboxRoundedIcon />
            <Typography>{data?.price}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
