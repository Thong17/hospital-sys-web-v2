import { Layout } from 'components/layouts/Layout'
import Role from './role'
import RoleCreate from './role/create'
import { useOutlet } from 'react-router'
import Breadcrumb, { IBreadcrumb } from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { translate } from 'contexts/language/LanguageContext'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

export const breadcrumbs: IBreadcrumb[] = [
  {
    id: 'admin',
    href: '/admin',
    label: translate('ADMIN'),
  },
  {
    id: 'navbar',
    href: '/admin/user',
    label: translate('USER'),
    prefix: <PersonRoundedIcon />,
    suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />,
    options: [
      {
        href: '/admin/user',
        label: translate('USER'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      },
      {
        href: '/admin/role',
        label: translate('ROLE'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      }
    ]
  }
]

const Admin = () => {
  const outlet = useOutlet()
  
  return (
    outlet ?? (
      <Layout navbar={<Breadcrumb list={breadcrumbs} step={1} />}>
        <Container>
          <h1>Admin</h1>
        </Container>
      </Layout>
    )
  )
}

export { Role, Admin, RoleCreate }
