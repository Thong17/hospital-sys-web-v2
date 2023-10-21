import { ButtonProps, CircularProgress, Typography } from '@mui/material'
import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { CustomButton } from 'styles/index'

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
      {isLoading && <CircularProgress size={21} sx={{ position: 'absolute' }} />}
      <Typography sx={{ opacity: isLoading ? 0 : 1 }}>{translate('CREATE')}</Typography>
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
      {isLoading && <CircularProgress size={21} sx={{ position: 'absolute' }} />}
      <Typography sx={{ opacity: isLoading ? 0 : 1 }}>{translate('CANCEL')}</Typography>
    </CustomButton>
  )
}
