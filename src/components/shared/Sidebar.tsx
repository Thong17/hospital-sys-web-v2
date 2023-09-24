import { APP_MENU } from 'constants/menu'
import useLanguage from 'hooks/useLanguage'
import { NavLink } from 'react-router-dom'
import { languages } from 'contexts/language/constant'
import { Box } from '@mui/material'
import { useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { LAYOUT_TRANSITION } from 'components/layouts/Layout'
import {
  COLLAPSED_SIDEBAR_WIDTH,
  EXPANDED_SIDEBAR_WIDTH,
  OUTER_MENU_SPACING,
} from 'constants/layout'
import useTheme from 'hooks/useTheme'

const Sidebar = () => {
  const { theme } = useTheme()
  const { isOpenedSidebar } = useAppSelector(selectConfig)

  return (
    <Box
      component={'div'}
      sx={{
        height: '100vh',
        width: `${
          isOpenedSidebar ? EXPANDED_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH
        }px`,
        position: 'fixed',
        padding: `${OUTER_MENU_SPACING}px 0 ${OUTER_MENU_SPACING}px ${OUTER_MENU_SPACING}px`,
        boxSizing: 'border-box',
        zIndex: 1000,
        transition: LAYOUT_TRANSITION,
      }}
    >
      <Box
        component={'div'}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          backgroundColor: theme.layout.sidebar,
          padding: '7px',
          boxSizing: 'border-box',
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.container,
          gap: 1,
          '& a': { color: 'black', borderRadius: theme.radius.ternary, width: '100%' },
          '& a:hover': { backgroundColor: '#ffffff22', width: isOpenedSidebar ? '100%' : 'fit-content !important', boxShadow: theme.shadow.secondary },
          '& a.active': {
            color: 'white',
            backgroundColor: theme.active.primary,
          },
        }}
      >
        {APP_MENU.map((nav: any, key: number) => (
          <SidebarItem key={key} nav={nav} />
        ))}
      </Box>
    </Box>
  )
}

const SidebarItem = ({ nav }: any) => {
  const { language } = useLanguage()
  const { isOpenedSidebar } = useAppSelector(selectConfig)
  return (
    <NavLink to={nav.route}>
      <Box
        sx={{
          cursor: 'pointer',
          padding: '13px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '10px',
          boxSizing: 'border-box',
          transition: LAYOUT_TRANSITION,
          '&:hover span': {
            opacity: '1 !important'
          }
        }}
      >
        {nav.icon}
        <span
          style={{
            opacity: isOpenedSidebar ? 1 : 0,
            transition: isOpenedSidebar ? LAYOUT_TRANSITION : '0s ease',
          }}
        >
          {language[nav.title as keyof typeof languages.English] || nav.title}
        </span>
      </Box>
    </NavLink>
  )
}

export default Sidebar
