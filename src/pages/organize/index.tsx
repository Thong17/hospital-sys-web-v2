import { Layout } from 'components/layouts/Layout'
import Product from './product'
import ProductStock from './product/stock'
import ProductCreate from './product/create'
import ProductUpdate from './product/update'
import ProductDetail from './product/detail'
import ProductHistory from './product/history'
import { useOutlet } from 'react-router'
import Breadcrumb, { IBreadcrumb } from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { translate } from 'contexts/language/LanguageContext'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'



export const breadcrumbs: IBreadcrumb[] = [
  {
    id: 'organize',
    href: '/organize',
    label: translate('ORGANIZE'),
  },
  {
    id: 'navbar',
    href: '/organize/product',
    label: translate('USER'),
    prefix: <PersonRoundedIcon />,
    suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />,
    options: [
      {
        href: '/organize/product',
        label: translate('PRODUCT'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      },
      {
        href: '/organize/clinic',
        label: translate('CLINIC'),
        prefix: <PersonRoundedIcon />,
        suffix: <AutoAwesomeRoundedIcon sx={{ '& *': { color: '#FDCC0D !important' } }} />
      }
    ]
  }
]

const Organize = () => {
  const outlet = useOutlet()
  
  return (
    outlet ?? (
      <Layout navbar={<Breadcrumb list={breadcrumbs} step={1} />}>
        <Container>
          <h1>Organize</h1>
        </Container>
      </Layout>
    )
  )
}

export { Organize, Product, ProductCreate, ProductUpdate, ProductDetail, ProductStock, ProductHistory }
