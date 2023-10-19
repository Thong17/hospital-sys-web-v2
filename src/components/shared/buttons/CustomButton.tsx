import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { CustomButton } from 'styles/index'

export const CreateButton = ({ onClick }: { onClick: () => void }) => {
  const { theme } = useTheme()
  return (
    <CustomButton
      onClick={() => onClick()}
      styled={theme}
      sx={{
        backgroundColor: `${theme.color.info}22`,
        color: theme.color.info,
        '&:hover': { backgroundColor: `${theme.color.info}44` },
      }}
    >
      {translate('CREATE')}
    </CustomButton>
  )
}

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
    const { theme } = useTheme()
    return (
      <CustomButton
        onClick={() => onClick()}
        styled={theme}
        sx={{
          backgroundColor: `${theme.color.error}22`,
          color: theme.color.error,
          '&:hover': { backgroundColor: `${theme.color.error}44` },
        }}
      >
        {translate('CANCEL')}
      </CustomButton>
    )
  }
