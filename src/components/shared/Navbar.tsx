import { Box } from '@mui/material'
import { LAYOUT_TRANSITION } from 'components/layouts/Layout'
import { useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { COLLAPSED_SIDEBAR_WIDTH, EXPANDED_SIDEBAR_WIDTH, NAVBAR_HEIGHT, SIDE_PADDING } from 'constants/layout'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'

const Navbar = () => {
  const { isOpenedSidebar, isAttachedSidebar } = useAppSelector(selectConfig)
  const { width } = useDevice()
  return (
    <Box
      id='navbar'
      sx={{
        height: NAVBAR_HEIGHT,
        position: 'fixed',
        width: width > TABLET_WIDTH ? `calc(100% - ${(isOpenedSidebar && isAttachedSidebar) ? EXPANDED_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH}px)` : '100%',
        display: 'flex',
        justifyContent: 'space-between',
        opacity: 0.9,
        padding: `0 ${SIDE_PADDING}px`,
        backgroundColor: 'rebeccapurple',
        transition: LAYOUT_TRANSITION,
        boxSizing: 'border-box',
        '&.active': {
          transform: 'translateY(-100%)'
        }
      }}
    >
      <span>Icon</span>
      <span>Action</span>
    </Box>
  )
}

export default Navbar
