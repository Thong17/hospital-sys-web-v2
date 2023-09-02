import { Box } from '@mui/material'
import useTheme from 'hooks/useTheme'

const SocialNav = ({ ...props }: any) => {
  const { theme } = useTheme()
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        gap: '20px',
        '& img': {
          width: '32px',
          height: '32px',
          objectFit: 'contain',
          boxShadow: `0 0 10px ${theme.color.info}`,
          borderRadius: '50%',
        },
        '& img:hover': {
          filter: 'brightness(1) grayscale(0)',
        },
      }}
    >
      <a
        href='https://www.facebook.com/thong.bun.7'
        target='_blank'
      >
        <img src='/assets/icons/facebook.png' alt='facebook' />
      </a>
      <a
        href='https://instagram.com/thong_geeee?igshid=YmMyMTA2M2Y='
        target='_blank'
      >
        <img src='/assets/icons/instagram.png' alt='instagram' />
      </a>
      <a
        href='https://www.tiktok.com/@thonggeee?is_from_webapp=1&sender_device=pc'
        target='_blank'
      >
        <img src='/assets\icons\tiktok.png' alt='tiktok' />
      </a>
    </Box>
  )
}

export default SocialNav
