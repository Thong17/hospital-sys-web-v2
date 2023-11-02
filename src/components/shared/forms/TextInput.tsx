import { TextField, styled } from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
const theme = getTheme()

export const TextInput = styled(TextField)(({ error }) => ({
  width: '100%',
  '& .MuiFormLabel-root': {
    top: '-5px',
    '&:is(.Mui-focused, .MuiFormLabel-filled)': {
      transform: 'translate(10px, -11px) scale(0.75)',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.text.secondary,
    '&.Mui-error': {
      color: theme.color.error
    }
  },
  '& .MuiOutlinedInput-root': {
    padding: 0,
    '& input:-webkit-autofill': {
      'WebkitBoxShadow': `0 0 0px 1000px ${theme.layout.container}ff inset`,
      'WebkitTextFillColor': `${theme.text.secondary}`,
    },
    '& input.MuiInputBase-input, & textarea.MuiInputBase-input': {
      padding: '11px 15px !important',
      color: theme.text.secondary
    },
    '& fieldset': {
      borderRadius: theme.radius.primary,
      border: theme.border.tertiary,
      '& legend span': {
        display: 'none',
      },
    },
    '&:hover fieldset': {
      borderColor: error ? `${theme.color.error}ff` : `${theme.color.info}bb`,
    },
    '&.Mui-focused fieldset': {
      borderWidth: 1,
      boxShadow: theme.shadow.tertiary,
    },
  },
}))
