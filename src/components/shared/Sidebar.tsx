import { sideBar } from 'components/common/sideBar'
import useLanguage from 'hooks/useLanguage'
import { NavLink } from 'react-router-dom'
import { languages } from 'contexts/language/constant'
import { Box } from '@mui/material'

const Sidebar = () => {
  const { language } = useLanguage()
  return (
    <Box
      component={'div'}
      sx={{ backgroundColor: 'gray', '& a': { color: 'black' }, '& a.active': { color: 'green' } }}
    >
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
  )
}

export default Sidebar
