import { Box } from '@mui/material'
import useTheme from 'hooks/useTheme'

const LabelStatus = ({ label, color }: { label: any; color: string }) => {
  const { theme } = useTheme()
  return (
    <Box
      component={'span'}
      sx={{
        padding: '6px 8px',
        backgroundColor: `${color}22`,
        color,
        borderRadius: theme.radius.primary,
      }}
    >
      {label}
    </Box>
  )
}

export default LabelStatus
