import { FormControl, InputLabel, MenuItem, Select, SelectProps, styled } from '@mui/material'
import { getTheme } from 'contexts/theme/ThemeContext'
import { translate } from 'contexts/language/LanguageContext'

const theme = getTheme()
interface IOption {
  label: string
  value: any
}

interface ISelectProps extends SelectProps {
  options?: IOption[]
  label?: any
}

export const SelectInput = styled(Select)(
  ({ height = '45px' }: { height?: string }) => ({
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

const StyledSelectInput = ({ label, options = [], ...props }: ISelectProps) => {
  return (
    <FormControl>
      {label && <InputLabel>{translate(label)}</InputLabel>}
      <SelectInput
        height='33px'
        {...props}
      >
        {options.map((option: any, key: number) => (
          <MenuItem key={key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectInput>
    </FormControl>
  )
}

export default StyledSelectInput
