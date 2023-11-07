import { Layout } from 'components/layouts/Layout'
import { useOutlet } from 'react-router'
import Breadcrumb, { IBreadcrumb } from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { translate } from 'contexts/language/LanguageContext'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import Reservation from './reservation'
import ReservationCreate from './reservation/create'
import ReservationUpdate from './reservation/update'
import ReservationDetail from './reservation/detail'
import ReservationHistory from './reservation/history'
import Schedule from './schedule'
import ScheduleDetail from './schedule/detail'

export const breadcrumbs: IBreadcrumb[] = [
  {
    id: 'operation',
    href: '/operation',
    label: translate('OPERATION'),
  },
  {
    id: 'navbar',
    href: '/operation/reservation',
    label: translate('RESERVATION'),
    prefix: <PersonRoundedIcon />,
    suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />,
    options: [
      {
        href: '/operation/reservation',
        label: translate('RESERVATION'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      },
      {
        href: '/operation/schedule',
        label: translate('SCHEDULE'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      },
    ]
  }
]

const Operation = () => {
  const outlet = useOutlet()
  
  return (
    outlet ?? (
      <Layout navbar={<Breadcrumb list={breadcrumbs} step={1} />}>
        <Container>
          <h1>Operation</h1>
        </Container>
      </Layout>
    )
  )
}

export { Operation, Reservation, ReservationCreate, ReservationDetail, ReservationHistory, ReservationUpdate, Schedule, ScheduleDetail }
