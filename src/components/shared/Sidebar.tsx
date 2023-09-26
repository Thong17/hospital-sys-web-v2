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
          '& a': {
            color: 'black',
            borderRadius: theme.radius.ternary,
            width: '100%',
          },
          '& a:hover': {
            backgroundColor: '#ffffff22',
            width: isOpenedSidebar ? '100%' : 'fit-content !important',
            boxShadow: theme.shadow.secondary,
          },
          '& a.active': {
            color: theme.color.info,
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
    <NavLink to={nav.route} style={{ position: 'relative' }}>
      <Box
        sx={{
          cursor: 'pointer',
          padding: '13px 14px',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'start',
          flexDirection: 'column',
          boxSizing: 'border-box',
          transition: LAYOUT_TRANSITION,
          overflow: isOpenedSidebar ? 'visible' : 'hidden',
          '&:hover': {
            paddingRight: nav.children ? '50px' : '14px',
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: '10px',
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
        </Box>
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
              <ExpandMoreRoundedIcon />
            </IconButton>
            {expandedSidebarItems?.includes(nav.title) && (
              <Box sx={{ marginTop: '15px' }}>
                {nav.children.map((item: any, key: number) => (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '5px'
                    }}
                  >
                    <FiberManualRecordRoundedIcon />
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
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </NavLink>
  )
}

export default Sidebar
