import useLanguage from 'hooks/useLanguage'
import useTheme from 'hooks/useTheme'
import { CustomFooter } from 'styles'

const Footer = ({ ...props }) => {
  const { theme } = useTheme()
  const { language } = useLanguage()

  return (
    <CustomFooter
      direction='row'
      justifyContent='center'
      alignItems='center'
      {...props}
    >
      <p style={{ color: theme.text.tertiary }}>
        {language.FOOTER_CONTENT}
      </p>
    </CustomFooter>
  )
}

export default Footer
