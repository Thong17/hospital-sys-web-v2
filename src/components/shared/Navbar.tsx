import useTheme from 'hooks/useTheme'
import { useLocation } from 'react-router-dom'
import { ListNavbar, CustomNavbar } from 'styles'
import useWeb from 'hooks/useWeb'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import Button from './Button'
import useConfig from 'hooks/useConfig'
import { downloadFile } from 'utils/index'

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [navbar, setNavbar] = useState(false)
  const { theme } = useTheme()
  const { sidebar } = useConfig()
  const { width, device } = useWeb()
  const navRef = useRef<HTMLDivElement>(document.createElement('div'))
  const location = useLocation()

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

  const handleDownloadCV = () => {
    downloadFile('/assets/files/CHHAN Bunthong CV.pdf', 'CHHAN Bunthong CV.pdf')
  }

  return (
    <CustomNavbar
      className='navbar'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      styled={theme}
      device={width}
      sidebar={sidebar ? 258 : 78}
    >
      <Box sx={{ color: theme.text.secondary, fontSize: theme.responsive[device]?.text.h5 }}>Portfolio.</Box>
      <ListNavbar>{children}</ListNavbar>
      <Button
        onClick={handleDownloadCV}
        sx={{
          backgroundColor: `${theme.color.info}22`,
          color: theme.color.info,
          transition: '0.2s ease',
          borderRadius: theme.radius.quaternary,
          boxShadow: `0 0 11px ${theme.color.info}77`,
          '&:hover': {
            letterSpacing: 2.5,
          },
        }}
      >
        {`Download\u00a0CV`}
      </Button>
    </CustomNavbar>
  )
}

export default Navbar
