import { Box } from '@mui/material'
import useDevice from 'hooks/useDevice'
import useTheme from 'hooks/useTheme'

interface ISectionContainer  {
    label?: any
    boxShadow?: any
    error?: any
    children: any
    [key: string]: any
}

export const SectionContainer = ({ children, label, boxShadow, error, padding = '20px', ...props }: ISectionContainer) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <Box {...props}>
      <Box
        style={{
          padding: padding,
          border: error ? `1px solid ${theme.color.error}` : theme.border.tertiary,
          borderRadius: theme.radius.secondary,
          position: 'relative',
          boxShadow: boxShadow ?? '',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: -16,
            left: 13,
            color: error ? theme.color.error : theme.text.quaternary,
            fontSize: theme.responsive[device]?.text.tertiary
          }}
        >
          {label}
        </span>
        {children}
      </Box>
    </Box>
  )
}
