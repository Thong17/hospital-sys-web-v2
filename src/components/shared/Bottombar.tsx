import { APP_MENU } from 'constants/sideBar'
import { Box } from '@mui/material'
import { FOOTER_HEIGHT } from 'constants/layout'

const Bottombar = () => {
  return (
    <Box
      component={'div'}
      sx={{ height: FOOTER_HEIGHT, position: 'fixed', bottom: 0, backgroundColor: 'darkslateblue', width: '100%' }}
    >
      {APP_MENU.map((nav: any, key: number) => (
        <BottombarItem key={key} nav={nav} />
      ))}
    </Box>
  )
}

const BottombarItem = ({ nav }: any) => {
  return <Box>{nav.TITLE}</Box>
}

export default Bottombar
