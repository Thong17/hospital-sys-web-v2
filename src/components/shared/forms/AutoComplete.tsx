import { Autocomplete, styled } from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
const theme = getTheme()

export const AutoCompleteInput = styled(Autocomplete)(() => ({
  width: '100%',
  '& .MuiFormHelperText-root': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .MuiFormLabel-root': {
    top: '-5px',
    '&:is(.Mui-focused, .MuiFormLabel-filled, .MuiInputLabel-shrink)': {
      transform: 'translate(10px, -11px) scale(0.75)',
    },
    '&:is(.Mui-focused)': {
      color: theme.color.info
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.text.secondary,
    '&.Mui-error': {
      color: theme.color.error,
    },
  },
  '& .MuiOutlinedInput-root': {
    padding: 0,
    '& input:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.layout.container}ff inset`,
      WebkitTextFillColor: `${theme.text.secondary}`,
    },
    '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
      appearance: 'none',
    },
    '& input:is([type="date"], [type="datetime-local"], [type="time"])::-webkit-calendar-picker-indicator': {
      filter: 'invert(0.5)'
    },
    '& input.MuiInputBase-input, & textarea.MuiInputBase-input': {
      padding: '11px 15px !important',
      color: theme.text.secondary,
    },
    '& fieldset': {
      borderRadius: theme.radius.primary,
      border: theme.border.tertiary,
      '& legend span': {
        display: 'none',
      },
    },
    '&:hover fieldset': {
      borderColor: `${theme.color.info}bb`,
    },
    '&.Mui-focused fieldset': {
      borderWidth: 1,
      boxShadow: theme.shadow.tertiary,
    },
  },
}))
