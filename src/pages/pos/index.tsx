import { Layout } from 'components/layouts/Layout'
import { useOutlet } from 'react-router'
import Breadcrumb, { IBreadcrumb } from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { translate } from 'contexts/language/LanguageContext'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import Sale from './sale'
import Payment from './payment'
import PaymentDetail from './payment/detail'

export const breadcrumbs: IBreadcrumb[] = [
  {
    id: 'pos',
    href: '/pos',
    label: translate('POS'),
  },
  {
    id: 'navbar',
    href: '/pos/sale',
    label: translate('SALE'),
    prefix: <PersonRoundedIcon />,
    suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />,
    options: [
      {
        href: '/pos/sale',
        label: translate('SALE'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      },
      {
        href: '/pos/payment',
        label: translate('PAYMENT'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      }
    ]
  }
]

const PointOfSale = () => {
  const outlet = useOutlet()
  
  return (
    outlet ?? (
      <Layout navbar={<Breadcrumb list={breadcrumbs} step={1} />}>
        <Container>
          <h1>POS</h1>
        </Container>
      </Layout>
    )
  )
}

export { PointOfSale, Sale, Payment, PaymentDetail }
