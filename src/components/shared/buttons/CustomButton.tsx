import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from '@mui/material'
import useTheme from 'hooks/useTheme'
import { CustomButton } from 'styles/index'
import { useEffect, useRef, useState } from 'react'
import { translate } from 'contexts/language/LanguageContext'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
interface IButton extends ButtonProps {
  isLoading?: boolean
}

export const CreateButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      {...props}
      styled={theme}
      disabled={isLoading}
      sx={{
        backgroundColor: `${theme.color.info}22`,
        color: theme.color.info,
        '&:hover': { backgroundColor: `${theme.color.info}44` },
      }}
    >
      {isLoading && (
        <CircularProgress size={21} sx={{ position: 'absolute' }} />
      )}
      <Typography sx={{ opacity: isLoading ? 0 : 1 }}>
        {translate('CREATE')}
      </Typography>
    </CustomButton>
  )
}

export const CancelButton = ({ isLoading, ...props }: IButton) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      {...props}
      styled={theme}
      disabled={isLoading}
      sx={{
        backgroundColor: `${theme.color.error}22`,
        color: theme.color.error,
        '&:hover': { backgroundColor: `${theme.color.error}44` },
      }}
    >
      {isLoading && (
        <CircularProgress size={21} sx={{ position: 'absolute' }} />
      )}
      <Typography sx={{ opacity: isLoading ? 0 : 1 }}>
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
      styled={theme}
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
      styled={theme}
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
        color: theme.color.info,
        borderRadius: theme.radius.primary,
        overflow: 'hidden',
        boxShadow: theme.shadow.quaternary,
        '&.Mui-disabled': { backgroundColor: `${theme.color.info}22` },
        '& input': {
          background: 'none',
          border: 'none',
          paddingLeft: '10px',
          height: '100%',
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
          '&:hover': { backgroundColor: '#00000000' },
          '& .MuiTouchRipple-root': { borderRadius: theme.radius.primary },
        }}
      >
        <SearchRoundedIcon fontSize='medium' />
      </Button>
    </Box>
  )
}
