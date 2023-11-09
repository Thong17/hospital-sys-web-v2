import { IconButton } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { useAppDispatch } from 'app/store'

const MenuButton = () => {
  const dispatch = useAppDispatch()
  return (
    <IconButton
      onClick={() => dispatch({ type: 'config/toggleOpenSidebar' })}
      sx={{
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <MenuRoundedIcon />
    </IconButton>
  )
}

export default MenuButton
