import { Box } from '@mui/material'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, SPACE_TOP } from 'constants/layout'
import useDevice from 'hooks/useDevice'
import useTheme from 'hooks/useTheme'

const Container = ({ padding, children }: { padding?: string, children: any }) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <Box
      sx={{
        marginTop: `${SPACE_TOP}px`,
        position: 'relative',
        minHeight: `calc(100vh - ${
          FOOTER_HEIGHT + NAVBAR_HEIGHT + SPACE_TOP
        }px)`,
        boxSizing: 'border-box',
        paddingX: padding ?? `${theme.responsive[device]?.padding.side}px`,
      }}
    >
      {children}
    </Box>
  )
}

export default Container
