import { TextField, styled } from '@mui/material'
import { IThemeStyle } from 'contexts/theme/interface'

export const TextInput = styled(TextField)(
  ({ styled }: { styled: IThemeStyle }) => ({
    '& .MuiFormLabel-root': {
      top: '-5px',
      '&.Mui-focused': {
        color: styled.text.secondary,
        transform: 'translate(14px, -10px) scale(0.75)'
      },
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiInputBase-input': {
        padding: '11px 15px !important',
      },

      '& fieldset': {
        border: styled.border.quaternary,
        borderRadius: styled.radius.primary,
        '& legend span': {
          display: 'none',
        },
      },
      '&:hover fieldset': {
        border: styled.border.primary,
      },
      '&.Mui-focused fieldset': {
        boxShadow: styled.shadow.tertiary,
        border: styled.border.primary,
      },
    },
  })
)
