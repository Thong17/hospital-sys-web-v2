import { Layout } from 'components/layouts/Layout'
import useLanguage from 'hooks/useLanguage'
import useTheme from 'hooks/useTheme'
import useDevice from 'hooks/useDevice'
import Container from './Container'

const NotFound = () => {
  const { theme } = useTheme()
  const { device } = useDevice()
  const { language } = useLanguage()
  return (
    <Layout>
      <Container>
        <div
          style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '50px'
          }}
        >
          <h1 style={{ fontSize: theme.responsive[device]?.text.h1, color: theme.text.primary }}>404</h1>
          <h3 style={{ fontSize: theme.responsive[device]?.text.h3, color: theme.text.secondary, margin: '10px 0' }}>{language['PAGE_NOT_FOUND']}</h3>
          <p  style={{ fontSize: theme.responsive[device]?.text.quaternary, color: theme.text.tertiary }}>{language['PAGE_NOT_FOUND_DESCRIPTION']}</p>
        </div>
      </Container>
    </Layout>
  )
}

export default NotFound
