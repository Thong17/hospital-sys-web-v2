import { Box, CircularProgress } from '@mui/material'
import useTheme from 'hooks/useTheme'

const Loading = () => {
  const { theme } = useTheme()
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: theme.layout.container,
        opacity: 1000
      }}
    >
      <CircularProgress size={30} />
    </Box>
  )
}

export default Loading
