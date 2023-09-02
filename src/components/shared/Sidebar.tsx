import { useLocation, useSearchParams } from 'react-router-dom'
import { sideNav } from '../layouts/constant'
import useTheme from 'hooks/useTheme'
import { CustomMenubar, CustomSideNav, SideNavContainer } from 'styles'
import useConfig from 'hooks/useConfig'
import useLanguage from 'hooks/useLanguage'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import Profile from './Profile'

export const MenuBar = ({ theme, open, toggleSidebar }: any) => {
  return (
    <CustomMenubar styled={theme} open={open} onClick={() => toggleSidebar()}>
      {open ? (
        <KeyboardArrowLeftRoundedIcon />
      ) : (
        <KeyboardArrowRightRoundedIcon />
      )}
    </CustomMenubar>
  )
}

const Sidebar = () => {
  const [navbar, setNavbar] = useState(false)
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { sidebar } = useConfig()
  const navRef = useRef<HTMLDivElement>(document.createElement('div'))
  const location = useLocation()
  const [queryParams, setQueryParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const closeNavbar = (event: any) => {
    !navRef.current.contains(event.target) && setNavbar(false)
  }

  useEffect(() => {
    setNavbar(false)
  }, [location])

  useEffect(() => {
    navbar && document.addEventListener('mousedown', closeNavbar)
    return () => {
      document.removeEventListener('mousedown', closeNavbar)
    }
  }, [navbar])

  const handleClickSection = (data: any) => {
    if (isLoading) return
    setIsLoading(true)
    setQueryParams({ section: data.section })
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 650)
    return () => {
      clearTimeout(timeout)
      setIsLoading(false)
    }
  }

  return (
    <SideNavContainer open={sidebar}>
      <CustomSideNav className='side-nav' styled={theme}>
        <Box
          sx={{
            backgroundColor: `${theme.color.info}22`,
            height: '100%',
            width: '5px',
            position: 'absolute',
            top: 0,
            left: 31,
          }}
        ></Box>
        <Box
          onClick={() => handleClickSection({ section: 'profile' })}
          sx={{
            width: 'calc(100% - 22px)',
            marginLeft: '9px',
            cursor: isLoading ? 'default !important' : 'pointer',
            borderRadius: theme.radius.circle,
            boxShadow: queryParams.get('section') === 'profile' ? `0 0 15px ${theme.color.info}` : 'none',
            overflow: 'hidden',
          }}
        >
          <Profile
            sidebar={sidebar}
            username={`CHHAN\u00a0Bunthong`}
            picture={`/assets/img/profile.png`}
          />
        </Box>
        {sideNav.map((nav: any, index: any) => {
          return (
            <Box
              sx={{ cursor: isLoading ? 'default !important' : 'pointer' }}
              onClick={() => handleClickSection(nav)}
              className={
                nav.section === queryParams.get('section')
                  ? 'indicator active'
                  : 'indicator'
              }
              key={index}
            >
              {nav.icon}
              <span>{language?.[nav.title] || nav.title}</span>
            </Box>
          )
        })}
      </CustomSideNav>
    </SideNavContainer>
  )
}

export default Sidebar
