import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import useTheme from 'hooks/useTheme'
import { CustomButton } from 'styles/index'
import { useEffect, useRef, useState } from 'react'
import { translate } from 'contexts/language/LanguageContext'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import KeyboardOptionKeyRoundedIcon from '@mui/icons-material/KeyboardOptionKeyRounded'
interface IButton extends ButtonProps {
  isLoading?: boolean
}

interface ICustomizedButton {
  label: any
  color?: string
  isLoading?: boolean
  tooltip?: any
}

export const CustomizedButton = ({
  isLoading,
  color,
  label,
  tooltip = '',
  ...props
}: ICustomizedButton & Omit<ButtonProps, 'color'>) => {
  const { theme } = useTheme()
  return (
    <Tooltip title={tooltip}>
      <CustomButton
        {...props}
        sx={{
          backgroundColor: `${color || theme.color.info}22`,
          color: color || theme.color.info,
          '&:hover': { backgroundColor: `${color || theme.color.info}44` },
        }}
      >
        {isLoading && (
          <CircularProgress size={21} sx={{ position: 'absolute' }} />
        )}
        {label}
      </CustomButton>
    </Tooltip>
  )
}

export const CreateButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      {...props}
      disabled={isLoading}
      sx={{
        backgroundColor: `${theme.color.info}22`,
        '&:hover': { backgroundColor: `${theme.color.info}44` },
      }}
    >
      {isLoading && (
        <CircularProgress size={21} sx={{ position: 'absolute' }} />
      )}
      <Typography sx={{ opacity: isLoading ? 0 : 1, color: theme.color.info }}>
        {translate('CREATE')}
      </Typography>
    </CustomButton>
  )
}

export const UpdateButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      {...props}
      disabled={isLoading}
      sx={{
        backgroundColor: `${theme.color.info}22`,
        '&:hover': { backgroundColor: `${theme.color.info}44` },
      }}
    >
      {isLoading && (
        <CircularProgress size={21} sx={{ position: 'absolute' }} />
      )}
      <Typography sx={{ opacity: isLoading ? 0 : 1, color: theme.color.info }}>
        {translate('UPDATE')}
      </Typography>
    </CustomButton>
  )
}

export const CancelButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      {...props}
      disabled={isLoading}
      sx={{
        backgroundColor: `${theme.color.error}22`,
        '&:hover': { backgroundColor: `${theme.color.error}44` },
      }}
    >
      {isLoading && (
        <CircularProgress size={21} sx={{ position: 'absolute' }} />
      )}
      <Typography sx={{ opacity: isLoading ? 0 : 1, color: theme.color.error }}>
        {translate('CANCEL')}
      </Typography>
    </CustomButton>
  )
}

export const DownloadButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      {...props}
      disabled={isLoading}
      sx={{
        backgroundColor: `${theme.color.success}22`,
        color: theme.color.success,
        minWidth: '0',
        padding: '5px 8px',
        '&:hover': { backgroundColor: `${theme.color.success}44` },
      }}
    >
      {isLoading && (
        <CircularProgress size={21} sx={{ position: 'absolute' }} />
      )}
      <DownloadRoundedIcon />
    </CustomButton>
  )
}

export const UploadButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      {...props}
      disabled={isLoading}
      sx={{
        backgroundColor: `${theme.color.purple}22`,
        color: theme.color.purple,
        minWidth: '0',
        padding: '5px 8px',
        '&:hover': { backgroundColor: `${theme.color.purple}44` },
      }}
    >
      {isLoading && (
        <CircularProgress size={21} sx={{ position: 'absolute' }} />
      )}
      <FileUploadRoundedIcon />
    </CustomButton>
  )
}

export const OptionButton = ({
  isLoading,
  onImport,
  onExport,
  ...props
}: IButton & { onImport: (_event: React.ChangeEvent<HTMLInputElement>) => void; onExport: () => void }) => {
  const { theme } = useTheme()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  return (
    <>
      <CustomButton
        {...props}
        id='option-menu'
        disabled={isLoading}
        onClick={(event: any) => setAnchorEl(event.currentTarget)}
        sx={{
          backgroundColor: `${theme.color.info}22`,
          color: theme.color.info,
          minWidth: '0',
          padding: '5px 8px',
          '&:hover': { backgroundColor: `${theme.color.info}44` },
        }}
      >
        {isLoading && (
          <CircularProgress size={21} sx={{ position: 'absolute' }} />
        )}
        <KeyboardOptionKeyRoundedIcon />
      </CustomButton>
      <Menu
        id='option-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ marginTop: '5px' }}
      >
        <MenuItem>
          <label htmlFor='export-file' style={{ display: 'flex', alignItems: 'center' }}>
            <FileUploadRoundedIcon sx={{ marginRight: '5px' }} />
            {translate('IMPORT')}
            <input type='file' onChange={onImport} name='export-file' id='export-file' style={{ display: 'none' }} />
          </label>
        </MenuItem>
        <MenuItem onClick={onExport}>
          <DownloadRoundedIcon sx={{ marginRight: '5px' }} />
          {translate('EXPORT')}
        </MenuItem>
      </Menu>
    </>
  )
}

export const SearchButton = ({
  onChange,
}: {
  onChange: (value: string) => void
}) => {
  const { theme } = useTheme()
  const [toggle, setToggle] = useState(false)
  const inputRef = useRef(document.createElement('input'))

  useEffect(() => {
    if (!toggle) return
    inputRef.current.focus()
  }, [toggle])

  return (
    <Box
      sx={{
        backgroundColor: `${theme.color.info}22`,
        borderRadius: theme.radius.primary,
        overflow: 'hidden',
        boxShadow: theme.shadow.quaternary,
        '&.Mui-disabled': { backgroundColor: `${theme.color.info}22` },
        '& input': {
          background: 'none',
          border: 'none',
          paddingLeft: '10px',
          height: '100%',
          color: theme.text.secondary,
          outline: 'none',
          '&:hover': { outline: 'none' },
        },
      }}
    >
      <input
        style={{ display: toggle ? 'unset' : 'none' }}
        onChange={(event) => onChange(event.target.value)}
        ref={inputRef}
      />
      <Button
        onClick={() => setToggle(!toggle)}
        sx={{
          minWidth: '0',
          padding: '5px 8px',
          backgroundColor: 'none',
          color: theme.color.info,
          '&:hover': { backgroundColor: '#00000000' },
          '& .MuiTouchRipple-root': { borderRadius: theme.radius.primary },
        }}
      >
        <SearchRoundedIcon fontSize='medium' />
      </Button>
    </Box>
  )
}
