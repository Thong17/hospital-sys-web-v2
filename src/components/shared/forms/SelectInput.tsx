import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  styled,
} from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
import { translate } from 'contexts/language/LanguageContext'
import { forwardRef } from 'react'

const theme = getTheme()
interface IOption {
  label: string
  value: any
}

interface ISelectProps extends SelectProps {
  options?: IOption[]
  label?: any
  height?: any
  width?: any
  helperText?: any
  required?: any
}

export const StyledSelectInput = styled(Select)(
  ({ height = '45px' }: { height: string }) => ({
    borderRadius: theme.radius.primary,
    height,
    '& fieldset': {
      borderRadius: theme.radius.primary,
      border: `${theme.border.tertiary} !important`,
    },
    '& fieldset:hover': {
      borderColor: `${theme.color.info} !important`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme.color.info} !important`,
    },
  })
)

const SelectInput = forwardRef(
  (
    { required, error, helperText, height, width = '100%', label, options = [], ...props }: ISelectProps,
    ref
  ) => {
    return (
      <FormControl
        error={error}
        sx={{
          width,
          '& .MuiFormLabel-root': {
            top: '-5px',
            '&:is(.Mui-focused, .MuiFormLabel-filled)': {
              transform: 'translate(10px, -11px) scale(0.75)',
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.text.secondary,
            '&.Mui-error': {
              color: theme.color.error,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: theme.radius.primary,
              border: theme.border.tertiary,
              borderColor: error
                ? `${theme.color.error}ff !important`
                : `${theme.color.info}bb`,
            },
            '&:hover fieldset': {
              borderColor: error
                ? `${theme.color.error}ff`
                : `${theme.color.info}bb`,
            },
            '&.Mui-focused fieldset': {
              borderWidth: 1,
              boxShadow: theme.shadow.tertiary,
            },
          },
        }}
      >
        {label && <InputLabel>{translate(label)} {required && '*'}</InputLabel>}
        <StyledSelectInput ref={ref} height={height} {...props}>
          {options.map((option: any, key: number) => (
            <MenuItem key={key} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelectInput>
        {helperText && (
          <FormHelperText
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)

export default SelectInput
