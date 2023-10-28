import { ButtonProps, CircularProgress, Stack, Tooltip } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { CustomIconButton } from 'styles/index'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

interface IButton extends ButtonProps {
  isLoading?: boolean
}

export const CustomizedIconButton = ({
  isLoading,
  color,
  icon,
  tooltip = '',
  ...props
}: {
  isLoading?: boolean
  icon: any
  color: string
  tooltip?: any
} & Omit<ButtonProps, 'color'>) => {
  const { theme } = useTheme()
  return (
    <Tooltip title={tooltip}>
      <CustomIconButton
        {...props}
        disabled={isLoading}
        size='small'
        sx={{
          backgroundColor: `${color || theme.color.info}22`,
          color: color || theme.color.info,
          boxShadow: theme.shadow.quaternary,
          '&:hover': { backgroundColor: `${color || theme.color.info}44` },
          '&.Mui-disabled': {
            backgroundColor: `${color || theme.color.info}22`,
          },
          '& button': { opacity: isLoading ? '0' : '1' },
        }}
      >
        {isLoading && (
          <CircularProgress size={16} sx={{ position: 'absolute' }} />
        )}
        {icon}
      </CustomIconButton>
    </Tooltip>
  )
}

export const EditButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomIconButton
      {...props}
      disabled={isLoading}
      size='small'
      sx={{
        backgroundColor: `${theme.color.info}22`,
        color: theme.color.info,
        boxShadow: theme.shadow.quaternary,
        '&:hover': { backgroundColor: `${theme.color.info}44` },
        '&.Mui-disabled': { backgroundColor: `${theme.color.info}22` },
      }}
    >
      {isLoading && (
        <CircularProgress size={16} sx={{ position: 'absolute' }} />
      )}
      <EditRoundedIcon
        fontSize='small'
        sx={{ opacity: isLoading ? '0' : '1' }}
      />
    </CustomIconButton>
  )
}

export const DeleteButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomIconButton
      {...props}
      disabled={isLoading}
      size='small'
      sx={{
        backgroundColor: `${theme.color.error}22`,
        color: theme.color.error,
        boxShadow: theme.shadow.quaternary,
        '&:hover': { backgroundColor: `${theme.color.error}44` },
        '&.Mui-disabled': { backgroundColor: `${theme.color.error}22` },
      }}
    >
      {isLoading && (
        <CircularProgress
          size={16}
          color='error'
          sx={{ position: 'absolute' }}
        />
      )}
      <DeleteRoundedIcon
        fontSize='small'
        sx={{ opacity: isLoading ? '0' : '1' }}
      />
    </CustomIconButton>
  )
}

export const ActionButton = ({
  data,
  onEdit,
  onDelete,
}: {
  data: any
  onEdit: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
}) => {
  return (
    <Stack direction={'row'} gap={1} justifyContent={'end'}>
      <EditButton onClick={(event) => onEdit(event, data)} />
      <DeleteButton onClick={(event) => onDelete(event, data)} />
    </Stack>
  )
}
