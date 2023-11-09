import { Checkbox as MuiCheckbox, styled } from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
const theme = getTheme()

export const Checkbox = styled(MuiCheckbox)(() => ({
  color: theme.text.quaternary,
  '& + .MuiTypography-root': {
    color: theme.text.quaternary,
  },
}))
