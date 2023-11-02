import { Stack, Typography } from '@mui/material'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded'
import useTheme from 'hooks/useTheme'

const TitleContainer = ({
  text,
  children,
}: {
  text: String
  children?: any
}) => {
  const { theme } = useTheme()
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={1}
      sx={{
        position: 'sticky',
        top: '0',
        zIndex: 100,
        boxSizing: 'border-box',
        backdropFilter: 'blur(2px)',
        borderRadius: theme.radius.ternary,
      }}
    >
      <Stack direction={'row'} alignItems={'center'}>
        <ArrowRightRoundedIcon fontSize='large' sx={{ color: theme.text.tertiary, marginLeft: '-15px' }} />
        <Typography>{text}</Typography>
      </Stack>
      {children}
    </Stack>
  )
}

export default TitleContainer
