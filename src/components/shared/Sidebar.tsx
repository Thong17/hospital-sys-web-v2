import { sideBar } from 'constants/sideBar'
import useLanguage from 'hooks/useLanguage'
import { NavLink } from 'react-router-dom'
import { languages } from 'contexts/language/constant'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { LAYOUT_TRANSITION } from 'components/layouts/Layout'
import { COLLAPSED_SIDEBAR_WIDTH, EXPANDED_SIDEBAR_WIDTH } from 'constants/layout'

const Sidebar = () => {
  const { language } = useLanguage()
  const dispatch = useAppDispatch()
  const { isAttachedSidebar, isOpenedSidebar } = useAppSelector(selectConfig)

  const handleToggle = () => {
    dispatch({ type: 'config/toggleOpenSidebar' })
  }

  const handleToggleAttach = () => {
    dispatch({ type: 'config/toggleAttachSidebar' })
  }

  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: 'indigo',
        height: '100vh',
        width: `${
          isOpenedSidebar ? EXPANDED_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH
        }px`,
        position: 'fixed',
        padding: '10px',
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
          alignItems: 'center',
          '& a': { color: 'black' },
          '& a.active': { color: 'green' },
        }}
      >
        <button onClick={handleToggle}>Toggle</button>
        <button
          style={{ color: isAttachedSidebar ? 'blue' : 'black' }}
          onClick={handleToggleAttach}
        >
          Detach
        </button>
        {sideBar.map((nav: any, key: number) => {
          return (
            <NavLink key={key} to={nav.route}>
              {nav.icon}
              <span>
                {language[nav.title as keyof typeof languages.English] ||
                  nav.title}
              </span>
            </NavLink>
          )
        })}
      </Box>
    </Box>
  )
}

export default Sidebar
