import { Box, IconButton, Stack } from '@mui/material'
import { LAYOUT_TRANSITION } from 'components/layouts/Layout'
import { useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import {
  COLLAPSED_SIDEBAR_WIDTH,
  EXPANDED_SIDEBAR_WIDTH,
  NAVBAR_HEIGHT,
  OUTER_MENU_SPACING,
  SIDE_PADDING,
} from 'constants/layout'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'
import useTheme from 'hooks/useTheme'
import MenuButton from './MenuButton'
import Profile from './Profile'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import { ReactElement } from 'react'

const Navbar = ({ navbar }: { navbar?: ReactElement }) => {
  const { isOpenedSidebar, isAttachedSidebar } = useAppSelector(selectConfig)
  const { width } = useDevice()
  const { theme } = useTheme()
  return (
    <Box
      id='navbar'
      sx={{
        height: NAVBAR_HEIGHT,
        position: 'fixed',
        backgroundColor: theme.layout.container,
        width:
          width > TABLET_WIDTH
            ? `calc(100% - ${
                isOpenedSidebar && isAttachedSidebar
                  ? EXPANDED_SIDEBAR_WIDTH
                  : COLLAPSED_SIDEBAR_WIDTH
              }px)`
            : '100%',
        transition: LAYOUT_TRANSITION,
        padding: `${OUTER_MENU_SPACING}px ${OUTER_MENU_SPACING}px 0 ${OUTER_MENU_SPACING}px`,
        boxSizing: 'border-box',
        '&.active': {
          transform: 'translateY(-100%)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `0 ${SIDE_PADDING}px`,
          boxSizing: 'border-box',
          backgroundColor: theme.layout.navbar,
          borderRadius: theme.radius.ternary,
          boxShadow: theme.shadow.secondary,
          width: '100%',
          height: '100%',
          '& *': { color: theme.text.secondary }
        }}
      >
        <Stack direction={'row'} gap={2}>
          <MenuButton />
          {navbar}
        </Stack>
        <Stack direction={'row'} gap={1}>
          <IconButton><NotificationsRoundedIcon /></IconButton>
          <IconButton><EventRoundedIcon /></IconButton>
          <Profile sx={{ marginLeft: '8px', display: 'grid', placeItems: 'center' }} />
        </Stack>
      </Box>
    </Box>
  )
}

export default Navbar
