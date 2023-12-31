import { Container } from '@mui/material'
import useLanguage from 'hooks/useLanguage'
import useTheme from 'hooks/useTheme'
import useDevice from 'hooks/useDevice'
import { Link } from 'react-router-dom'

const Restrict = ({ redirect }: { redirect?: string }) => {
  const { device } = useDevice()
  const { theme } = useTheme()
  const { language } = useLanguage()

  return (
    <Container sx={{ backgroundColor: theme.layout.container, height: '100vh' }}>
      <div
        style={{
          display: 'flex',
          height: 'fit-content',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '50px',
        }}
      >
        <h1
          style={{
            fontSize: theme.responsive[device]?.text.h1,
            color: theme.text.primary,
          }}
        >
          403
        </h1>
        <h3
          style={{
            fontSize: theme.responsive[device]?.text.h3,
            color: theme.text.secondary,
            margin: '10px 0',
          }}
        >
          {language['NO_PERMISSION']}
        </h3>
        <p
          style={{
            fontSize: theme.responsive[device]?.text.secondary,
            color: theme.text.tertiary,
          }}
        >
          {language['NO_PERMISSION_DESCRIPTION']}{' '}
          <Link to='/login' state={redirect}>
            {language['LOGIN_BUTTON']}
          </Link>
        </p>
      </div>
    </Container>
  )
}

export default Restrict
