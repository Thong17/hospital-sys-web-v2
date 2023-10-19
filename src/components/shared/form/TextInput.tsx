import { TextField, styled } from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
const theme = getTheme()

export const TextInput = styled(TextField)(() => ({
  '& .MuiFormLabel-root': {
    top: '-5px',
    '&:is(.Mui-focused, .MuiFormLabel-filled)': {
      color: theme.text.tertiary,
      transform: 'translate(10px, -5px) scale(0.75)',
      backgroundColor: `${theme.layout.container}`,
      padding: '0 8px',
      borderRadius: 6,
      border: theme.border.quaternary,
    },
  },
  '&:hover .MuiFormLabel-root:is(.Mui-focused, .MuiFormLabel-filled), &:has(.Mui-focused) .MuiFormLabel-root:is(.Mui-focused, .MuiFormLabel-filled), &:hover .MuiOutlinedInput-root fieldset':
    {
      border: theme.border.secondary,
    },
  '& .MuiOutlinedInput-root': {
    '& .MuiInputBase-input': {
      padding: '11px 15px !important',
    },

    '& fieldset': {
      border: theme.border.quaternary,
      borderRadius: theme.radius.primary,
      '& legend span': {
        display: 'none',
      },
    },
    '&.Mui-focused fieldset': {
      boxShadow: theme.shadow.tertiary,
      border: theme.border.secondary,
    },
  },
}))
