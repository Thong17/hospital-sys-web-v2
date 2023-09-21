
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'

export const sideBar: any = [
  {
    route: '/home',
    title: 'HOME',
    icon: <HomeRoundedIcon />,
  },
  {
    route: '/admin',
    title: 'ADMINISTRATOR',
    icon: <AdminPanelSettingsIcon />,
    permission: 'admin',
    children: [
      {
        route: '/admin/role',
        title: 'ROLE',
        icon: <ArrowRightAltRoundedIcon />,
      },
      {
        route: '/admin/user',
        title: 'USER',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'user'
      },
    ]
  },
]
