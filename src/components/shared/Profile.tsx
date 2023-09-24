import { Button, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { useAppSelector } from 'app/store'
import useLanguage from 'hooks/useLanguage'
import useTheme from 'hooks/useTheme'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { selectSession } from 'stores/session/selector'

const Profile = ({ ...props }) => {
  const session = useAppSelector(selectSession)
  const { theme } = useTheme()
  const [user, setUser] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { language } = useLanguage()

  useEffect(() => {
    setUser(session?.user)
  }, [session?.user])

  return (
    <Box {...props}>
      {user ? (
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
              <img src='/public/logo.png' alt='' />
            </Box>
            {user.username}
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
            <MenuItem>{language.LOGOUT}</MenuItem>
          </Menu>
        </>
      ) : (
        <NavLink to={'/login'}>Login</NavLink>
      )}
    </Box>
  )
}

export default Profile
