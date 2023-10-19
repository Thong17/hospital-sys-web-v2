import { TextField, styled } from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
const theme = getTheme()

export const TextInput = styled(TextField)(() => ({
  width: '100%',
  '& .MuiFormLabel-root': {
    top: '-5px',
    '&:is(.Mui-focused, .MuiFormLabel-filled)': {
      transform: 'translate(10px, -11px) scale(0.75)',
    },
  },
  '& .MuiOutlinedInput-root': {
    padding: 0,
    '& input.MuiInputBase-input, & textarea.MuiInputBase-input': {
      padding: '11px 15px !important',
    },
    '& fieldset': {
      borderRadius: theme.radius.primary,
      '& legend span': {
        display: 'none',
      },
    },
    '&.Mui-focused fieldset': {
      borderWidth: 1,
      boxShadow: theme.shadow.tertiary,
    },
  },
}))
