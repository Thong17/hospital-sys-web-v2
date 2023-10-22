import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from '@mui/material'
import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { CustomButton } from 'styles/index'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useEffect, useRef, useState } from 'react'
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
          padding: '5px',
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
