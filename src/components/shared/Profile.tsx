import { Button, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { store, useAppSelector } from 'app/store'
import useLanguage from 'hooks/useLanguage'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { selectSession } from 'stores/session/selector'

const Profile = ({ ...props }) => {
  const session = useAppSelector(selectSession)
  const { theme } = useTheme()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { language } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    store.dispatch({ type: 'session/clearSession' })
    navigate('/login')
  }

  return (
    <Box {...props}>
      {session?.user ? (
        <>
          <Button
            id='profile-menu'
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              border: theme.border.quaternary,
              padding: '5px 10px 5px 5px',
              borderRadius: theme.radius.rounded,
              display: 'flex',
              alignItems: 'center',
              textTransform: 'none',
              color: theme.text.secondary
            }}
          >
            <Box
              sx={{
                width: '30px',
                height: '30px',
                marginRight: '5px',
                '& img': {
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                },
              }}
            >
              <img src='/logo.png' alt='' />
            </Box>
            {session?.user?.username}
          </Button>
          <Menu
            id='profile-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem>{language.PROFILE}</MenuItem>
            <MenuItem onClick={handleLogout}>{language.LOGOUT}</MenuItem>
          </Menu>
        </>
      ) : (
        <NavLink to={'/login'}>{language.LOGIN}</NavLink>
      )}
    </Box>
  )
}

export default Profile
