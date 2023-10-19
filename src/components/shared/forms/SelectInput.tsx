import { MenuItem, Select, SelectProps } from '@mui/material'

interface IOption {
    label: string
    value: any
}

interface ISelectProps extends SelectProps {
    options: IOption[]
}

const SelectInput = ({ options, ...props }: ISelectProps) => {
  return (
    <Select {...props}>
      {options.map((option: any, key: number) => (
        <MenuItem key={key} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectInput
