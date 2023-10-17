import { Box } from '@mui/material'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'

const Container = ({ children }: { children: any }) => {
  return (
    <Box
      sx={{
        marginTop: `${SPACE_TOP}px`,
        position: 'relative',
        minHeight: `calc(100vh - ${
          FOOTER_HEIGHT + NAVBAR_HEIGHT + SPACE_TOP
        }px)`,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  )
}

export default Container
