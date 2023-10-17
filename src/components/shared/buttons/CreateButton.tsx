import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { CustomButton } from 'styles/index'

const CreateButton = ({ onClick }: { onClick: () => void }) => {
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

export default CreateButton
