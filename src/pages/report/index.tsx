import { Layout } from 'components/layouts/Layout'
import { useOutlet } from 'react-router'
import Breadcrumb, { IBreadcrumb } from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { translate } from 'contexts/language/LanguageContext'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

export const breadcrumbs: IBreadcrumb[] = [
  {
    id: 'report',
    href: '/report',
    label: translate('REPORT'),
  },
  {
    id: 'navbar',
    href: '/report/sale',
    label: translate('SALE'),
    prefix: <PersonRoundedIcon />,
    suffix: (
      <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
    ),
    options: [
      {
        href: '/report/sale',
        label: translate('SALE'),
        prefix: <PersonRoundedIcon />,
        suffix: (
          <AutoAwesomeRoundedIcon
            sx={{ '& *': { color: '#FDCC0D !important' } }}
          />
        ),
      },
      {
        href: '/report/product',
        label: translate('PRODUCT'),
        prefix: <PersonRoundedIcon />,
        suffix: (
          <AutoAwesomeRoundedIcon
            sx={{ '& *': { color: '#FDCC0D !important' } }}
          />
        ),
      },
    ],
  },
]

export const Report = () => {
  const outlet = useOutlet()
  return (
    outlet ?? (
      <Layout navbar={<Breadcrumb list={breadcrumbs} step={1} />}>
        <Container>Test</Container>
      </Layout>
    )
  )
}
