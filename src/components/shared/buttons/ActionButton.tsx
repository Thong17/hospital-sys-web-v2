import { ButtonProps, CircularProgress, Stack, Tooltip } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { CustomIconButton } from 'styles/index'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

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
  color?: string
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

export const AddButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomIconButton
      {...props}
      disabled={isLoading}
      size='small'
      sx={{
        backgroundColor: `${theme.color.info}22`,
        boxShadow: theme.shadow.quaternary,
        '&:hover': { backgroundColor: `${theme.color.info}44` },
        '&.Mui-disabled': { backgroundColor: `${theme.color.info}22` },
        '& *': {
          color: `${theme.color.info} !important`,
          margin: '0 !important',
        }
      }}
    >
      {isLoading && (
        <CircularProgress size={16} sx={{ position: 'absolute' }} />
      )}
      <AddRoundedIcon
        fontSize='small'
        sx={{ opacity: isLoading ? '0' : '1' }}
      />
    </CustomIconButton>
  )
}

export const AcceptButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomIconButton
      {...props}
      disabled={isLoading}
      size='small'
      sx={{
        backgroundColor: `${theme.color.success}22`,
        boxShadow: theme.shadow.quaternary,
        '&:hover': { backgroundColor: `${theme.color.success}44` },
        '&.Mui-disabled': { backgroundColor: `${theme.color.success}22` },
        '& *': {
          color: `${theme.color.success} !important`,
          margin: '0 !important',
        }
      }}
    >
      {isLoading && (
        <CircularProgress size={16} sx={{ position: 'absolute' }} />
      )}
      <CheckRoundedIcon
        fontSize='small'
        sx={{ opacity: isLoading ? '0' : '1' }}
      />
    </CustomIconButton>
  )
}

export const RemoveButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomIconButton
      {...props}
      disabled={isLoading}
      size='small'
      sx={{
        backgroundColor: `${theme.color.error}22`,
        boxShadow: theme.shadow.quaternary,
        '&:hover': { backgroundColor: `${theme.color.error}44` },
        '&.Mui-disabled': { backgroundColor: `${theme.color.error}22` },
        '& *': {
          color: `${theme.color.error} !important`,
          margin: '0 !important',
        }
      }}
    >
      {isLoading && (
        <CircularProgress size={16} sx={{ position: 'absolute' }} />
      )}
      <CloseRoundedIcon
        fontSize='small'
        sx={{ opacity: isLoading ? '0' : '1' }}
      />
    </CustomIconButton>
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
  onAccept,
  onRefuse,
  onDelete,
}: {
  data: any
  onEdit?: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
  onAccept?: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
  onRefuse?: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>, _data: any) => void
}) => {
  return (
    <Stack direction={'row'} gap={1} justifyContent={'end'}>
      {onAccept && <AcceptButton onClick={(event) => onAccept(event, data)} />}
      {onRefuse && <RemoveButton onClick={(event) => onRefuse(event, data)} />}
      {onEdit && <EditButton onClick={(event) => onEdit(event, data)} />}
      {onDelete && <DeleteButton onClick={(event) => onDelete(event, data)} />}
    </Stack>
  )
}

export const AddAdornmentButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomIconButton
      {...props}
      disabled={isLoading}
      size='small'
      sx={{
        right: '8px',
        borderRadius: '6px',
        position: 'absolute',
        backgroundColor: `${theme.color.info}22`,
        boxShadow: theme.shadow.quaternary,
        '&:hover': { backgroundColor: `${theme.color.info}44` },
        '&.Mui-disabled': { backgroundColor: `${theme.color.info}22` },
        '& *': {
          color: `${theme.color.info} !important`,
          margin: '0 !important',
        }
      }}
    >
      {isLoading && (
        <CircularProgress size={16} sx={{ position: 'absolute' }} />
      )}
      <AddRoundedIcon
        fontSize='small'
        sx={{ opacity: isLoading ? '0' : '1' }}
      />
    </CustomIconButton>
  )
}