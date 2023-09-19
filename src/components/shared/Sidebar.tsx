import { sideBar } from 'constants/sideBar'
import useLanguage from 'hooks/useLanguage'
import { NavLink } from 'react-router-dom'
import { languages } from 'contexts/language/constant'
import { Box } from '@mui/material'
import useConfig from 'hooks/useConfig'

const COLLAPSE_SIDEBAR_WIDTH = 80
const EXPAND_SIDEBAR_WIDTH = 300

const Sidebar = () => {
  const { language } = useLanguage()
  const { sidebar, toggleSidebar } = useConfig()

  const handleToggle = () => {
    toggleSidebar()
  }
  
  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: 'gray',
        height: '100vh',
        width: `${sidebar ? EXPAND_SIDEBAR_WIDTH : COLLAPSE_SIDEBAR_WIDTH}px`,
        position: 'fixed',
        padding: '10px',
        boxSizing: 'border-box'
      }}
    >
      <Box
        component={'div'}
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: 'red',
          '& a': { color: 'black' },
          '& a.active': { color: 'green' },
        }}
      >
        <button onClick={handleToggle}>Toggle</button>  
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
