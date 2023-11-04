import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  styled,
} from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
import { translate } from 'contexts/language/LanguageContext'
import { forwardRef } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

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
  gridArea?: string
  onRemoveOption?: (_data: any) => void
}

export const StyledSelectInput = styled(Select)(
  ({
    height = '45px',
    endAdornment,
  }: {
    height: string
    endAdornment?: any
  }) => ({
    borderRadius: theme.radius.primary,
    height,
    '& svg.MuiSvgIcon-root': {
      marginRight: endAdornment ? '37px' : '0',
    },
    '& .remove-btn': {
      display: 'none',
    },
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
    {
      required,
      error,
      helperText,
      height,
      width = '100%',
      label,
      options = [],
      gridArea = '',
      onRemoveOption,
      ...props
    }: ISelectProps,
    ref
  ) => {
    return (
      <FormControl
        error={error}
        sx={{
          width,
          gridArea,
          '& .MuiFormLabel-root': {
            top: '-5px',
            '&:is(.Mui-focused, .MuiFormLabel-filled)': {
              transform: 'translate(10px, -11px) scale(0.75)',
            },
            '&:is(.Mui-focused)': {
              color: theme.color.info,
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.text.secondary,
            '&.Mui-error': {
              color: theme.color.error,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& *': {
              color: theme.text.secondary,
            },
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
        {label && (
          <InputLabel>
            {translate(label)} {required && '*'}
          </InputLabel>
        )}
        <StyledSelectInput ref={ref} height={height} {...props}>
          {options.map((option: any, key: number) => (
            <MenuItem
              key={key}
              value={option.value}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {option.label}
              {onRemoveOption && (
                <IconButton
                  className='remove-btn'
                  sx={{ height: '30px', width: '30px' }}
                  onClick={(event: any) => {
                    event.stopPropagation()
                    onRemoveOption(option)
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              )}
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
