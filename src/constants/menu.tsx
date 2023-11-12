
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import TodayRoundedIcon from '@mui/icons-material/TodayRounded'

export const APP_MENU: any = [
  {
    route: '/home',
    title: 'HOME',
    icon: <HomeRoundedIcon />,
  },
  {
    route: '/pos',
    title: 'POINT_OF_SALE',
    icon: <PriceChangeRoundedIcon />,
    permission: 'pos',
    children: [
      {
        route: '/pos/sale',
        title: 'SALE',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'sale'
      },
      {
        route: '/pos/stock',
        title: 'STOCK',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'stock'
      },
    ]
  },
  {
    route: '/operation',
    title: 'OPERATION',
    icon: <TodayRoundedIcon />,
    permission: 'operation',
    children: [
      {
        route: '/operation/reservation',
        title: 'RESERVATION',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'reservation'
      },
      {
        route: '/operation/schedule',
        title: 'SCHEDULE',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'schedule'
      },
    ]
  },
  {
    route: '/organize',
    title: 'ORGANIZE',
    icon: <WidgetsRoundedIcon />,
    permission: 'organize',
    children: [
      {
        route: '/organize/product',
        title: 'PRODUCT',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'product'
      },
      {
        route: '/organize/clinic',
        title: 'CLINIC',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'clinic'
      },
    ]
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
        permission: 'role'
      },
      {
        route: '/admin/user',
        title: 'USER',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'user'
      },
      {
        route: '/admin/doctor',
        title: 'DOCTOR',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'doctor'
      },
      {
        route: '/admin/patient',
        title: 'PATIENT',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'patient'
      },
    ]
  },
  {
    route: '/report',
    title: 'REPORT',
    icon: <BarChartRoundedIcon />,
    permission: 'report',
    children: [
      {
        route: '/report/transaction',
        title: 'TRANSACTION',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'transaction',
      },
      {
        route: '/report/sale',
        title: 'SALE',
        icon: <ArrowRightAltRoundedIcon />,
        permission: 'sale',
      },
    ]
  },
]
