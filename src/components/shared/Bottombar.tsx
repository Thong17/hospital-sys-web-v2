import { APP_MENU } from 'constants/menu'
import { Box } from '@mui/material'
import { FOOTER_HEIGHT, OUTER_MENU_SPACING } from 'constants/layout'
import useTheme from 'hooks/useTheme'
import { NavLink } from 'react-router-dom'
import { languages } from 'contexts/language/constant'
import useLanguage from 'hooks/useLanguage'

const Bottombar = () => {
  const { theme } = useTheme()
  return (
    <Box
      component={'div'}
      sx={{
        height: FOOTER_HEIGHT,
        position: 'fixed',
        bottom: 0,
        backgroundColor: theme.layout.container,
        width: '100%',
        padding: `0 ${OUTER_MENU_SPACING}px ${OUTER_MENU_SPACING}px ${OUTER_MENU_SPACING}px`,
        boxSizing: 'border-box',
        zIndex: 1000
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.layout.footer,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.quaternary,
          '& a.active': {
            textDecoration: 'none',
            backgroundColor: '#BB8FCE22',
            padding: '10px 10px',
            borderRadius: theme.radius.rounded,
            '& *': {
              color: '#BB8FCE',
            }
          },
          '& a.active span': {
            display: 'block !important',
            marginLeft: '5px'
          }
        }}
      >
        {APP_MENU.map((nav: any, key: number) => (
          <BottombarItem key={key} nav={nav} />
        ))}
      </Box>
    </Box>
  )
}

const BottombarItem = ({ nav }: any) => {
  const { language } = useLanguage()
  return (
    <NavLink to={nav.route}>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          color: 'white'
        }}
      >
        {nav.icon}
        <span style={{ display: 'none' }}>
          {language[nav.title as keyof typeof languages.English] || nav.title}
        </span>
      </Box>
    </NavLink>
  )
}

export default Bottombar
