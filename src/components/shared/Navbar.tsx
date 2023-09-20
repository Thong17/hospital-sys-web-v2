import { Box } from '@mui/material'
import { LAYOUT_TRANSITION } from 'components/layouts/Layout'
import { useAppSelector } from 'app/store'
import { selectConfig } from 'stores/config/selector'
import { COLLAPSED_SIDEBAR_WIDTH, EXPANDED_SIDEBAR_WIDTH, NAVBAR_HEIGHT, SIDE_PADDING } from 'constants/layout'

const Navbar = () => {
  const { isOpenedSidebar, isAttachedSidebar } = useAppSelector(selectConfig)
  return (
    <Box
      sx={{
        height: NAVBAR_HEIGHT,
        position: 'fixed',
        width: `calc(100% - ${(isOpenedSidebar && isAttachedSidebar) ? EXPANDED_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH}px)`,
        display: 'flex',
        justifyContent: 'space-between',
        opacity: 0.9,
        padding: `0 ${SIDE_PADDING}px`,
        backgroundColor: 'rebeccapurple',
        transition: LAYOUT_TRANSITION,
        boxSizing: 'border-box'
      }}
    >
      <span>Icon</span>
      <span>Action</span>
    </Box>
  )
}

export default Navbar
