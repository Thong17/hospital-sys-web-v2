import useTheme from 'hooks/useTheme'
import { FC } from 'react'
import { CustomProfile } from 'styles'
import { Box } from '@mui/system'
import { TextEllipsis } from './TextEllipsis'
import useWeb from 'hooks/useWeb'

interface IProfile {
  username: string
  picture?: string
  sidebar: boolean
}

const Profile: FC<IProfile> = ({ username, picture, sidebar }) => {
  const { theme } = useTheme()
  const { device } = useWeb()

  return (
    <>
      {username && (
        <CustomProfile
          sidebar={sidebar ? 'open' : 'close'}
          styled={theme}
          device={device}
        >
          <Box id='profile'>
            {picture ? (
              <img
                src={picture}
                alt={username}
                loading='lazy'
              />
            ) : (
              <div style={{ alignItems: 'center' }}>{username[0]}</div>
            )}
          </Box>
          <Box id='username' component='span'>
            <TextEllipsis title={username}>{username}</TextEllipsis>
          </Box>
        </CustomProfile>
      )}
    </>
  )
}

export default Profile
