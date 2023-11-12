import { Box } from '@mui/material'
import useTheme from 'hooks/useTheme'

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

export const GridItem = ({ data }: { data: any }) => {
  const { theme } = useTheme()
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
      {data?.body}
    </Box>
  )
}
