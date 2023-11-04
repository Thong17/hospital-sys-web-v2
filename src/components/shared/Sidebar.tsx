import { APP_MENU } from 'constants/menu'
import useLanguage from 'hooks/useLanguage'
import { NavLink } from 'react-router-dom'
import { languages } from 'contexts/language/constant'
import { Box, IconButton, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { LAYOUT_TRANSITION } from 'components/layouts/Layout'
import {
  COLLAPSED_SIDEBAR_WIDTH,
  EXPANDED_SIDEBAR_WIDTH,
  OUTER_MENU_SPACING,
} from 'constants/layout'
import useTheme from 'hooks/useTheme'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'

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
        zIndex: 1001,
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
          padding: '7px',
          boxSizing: 'border-box',
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.quaternary,
          backgroundColor: theme.layout.sidebar,
          gap: 1,
          overflow: 'auto',
          '& .sidebar-menu': {
            borderRadius: theme.radius.ternary,
            width: '100%',
          },
          '& .sidebar-menu a': {
            color: theme.text.primary,
            textDecoration: 'none'
          },
          '& .sidebar-menu a.active, & .sidebar-menu a.active p': {
            color: `${theme.color.info} !important`,
          },
          '& .sidebar-menu:hover': {
            backgroundColor: '#ffffff22',
            width: isOpenedSidebar ? '100%' : 'fit-content !important',
            boxShadow: theme.shadow.quaternary,
            backdropFilter: 'blur(2px)'
          },
          '& .sidebar-menu:has(a.active)': {
            backgroundColor: `${theme.color.info}44`,
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
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { isOpenedSidebar, expandedSidebarItems } = useAppSelector(selectConfig)
  const dispatch = useAppDispatch()

  const handleToggleExpandSidebar = () => {
    dispatch({
      type: 'config/toggleExpandedSidebarItem',
      payload: { item: nav.title },
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        className='sidebar-menu'
        sx={{
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'start',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden',
          '&:hover': {
            paddingRight: nav.children ? '50px' : '0',
          },
          '&:hover .sidebar-title': {
            opacity: '1 !important',
          },
          '&:hover .sidebar-item-title': {
            opacity: '1 !important',
          },
          '&:hover .expand-button': {
            opacity: '1 !important',
            transition: 0,
          },
        }}
      >
        <NavLink
          to={nav.route}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: '10px',
            padding: '13px 14px',
            boxSizing: 'border-box',
            overflow: isOpenedSidebar ? 'visible' : 'hidden',
            width: '100%'
          }}
        >
          {nav.icon}
          <Typography
            className='sidebar-title'
            sx={{
              opacity: isOpenedSidebar ? 1 : 0,
              transition: isOpenedSidebar ? LAYOUT_TRANSITION : '0s ease',
            }}
          >
            {language[nav.title as keyof typeof languages.English] || nav.title}
          </Typography>
        </NavLink>
        {nav.children && (
          <Box>
            <IconButton
              className='expand-button'
              onClick={handleToggleExpandSidebar}
              sx={{
                position: 'absolute',
                opacity: isOpenedSidebar ? 1 : 0,
                top: 5,
                right: 5,
                transition: isOpenedSidebar ? LAYOUT_TRANSITION : 0,
              }}
            >
              { expandedSidebarItems?.includes(nav.title) ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </IconButton>
            {expandedSidebarItems?.includes(nav.title) && (
              <Box
                sx={{
                  padding: '0 14px 13px 14px',
                  boxSizing: 'border-box',
                  '& .sidebar-menu-item': { color: 'black' },
                  '& .sidebar-menu-item.active': { color: theme.color.info },
                }}
              >
                {nav.children.map((item: any, key: number) => (
                  <NavLink
                    className='sidebar-menu-item'
                    to={item.route}
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '5px',
                    }}
                  >
                    <FiberManualRecordRoundedIcon
                      sx={{ fontSize: '13px', margin: '0 5px' }}
                    />
                    <Typography
                      className='sidebar-item-title'
                      sx={{
                        opacity: isOpenedSidebar ? 1 : 0,
                        transition: isOpenedSidebar
                          ? LAYOUT_TRANSITION
                          : '0s ease',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </NavLink>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
