import useTheme from 'hooks/useTheme'
import { CustomFooter } from 'styles'

export const FOOTER_HEIGHT = 70

const Footer = ({ ...props }) => {
  const { theme } = useTheme()

  return (
    <CustomFooter
      direction='row'
      justifyContent='center'
      alignItems='center'
      styled={theme}
      {...props}
    >
      <p style={{ color: theme.text.tertiary }}>
        Copyright &copy; 2023 All Rights Reserved by <span style={{ color: theme.text.primary }}>Thong</span>
      </p>
    </CustomFooter>
  )
}

export default Footer
