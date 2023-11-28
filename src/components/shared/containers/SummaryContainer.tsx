import { Box, Stack, Typography } from '@mui/material'
import useDevice from 'hooks/useDevice'
import useTheme from 'hooks/useTheme'
import { currencyFormat } from 'utils/index'

interface ISummaryContainer {
  label: any
  value: any
  icon: any
  color?: string
  children: any
}

const SummaryContainer = ({
  label,
  value,
  icon,
  color,
  children,
}: ISummaryContainer) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <Stack
      direction={'column'}
      justifyContent={'space-between'}
      sx={{
        minWidth: '200px',
        border: theme.border.quaternary,
        borderRadius: theme.radius.quaternary,
        boxShadow: theme.shadow.quaternary,
        padding: '5px',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ padding: '5px 10px' }}>
        <Typography sx={{ fontSize: theme.responsive[device]?.text.tertiary }}>{label}</Typography>
      </Box>
      <Stack
        direction={'row'}
        sx={{
          backgroundColor: `${color}22` || theme.background.secondary,
          color: color || theme.text.secondary,
          width: '100%',
          height: '100%',
          borderRadius: theme.radius.secondary,
          padding: '5px',
          boxSizing: 'border-box',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={'5px'}
          sx={{ fontSize: theme.responsive[device]?.text.h1 }}
        >
          {icon}
          <Box component={'span'}>{currencyFormat(value)}</Box>
        </Stack>
        {children}
      </Stack>
    </Stack>
  )
}

export default SummaryContainer
