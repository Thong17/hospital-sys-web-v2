import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import ProductForm from './form'
import { initProduct } from './constant'

const ProductCreate = () => {
  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: '/organize/product/create',
              label: translate('CREATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/organize/product' }}
        />
      }
    >
      <Container>
        <ProductForm defaultValues={initProduct} />
      </Container>
    </Layout>
  )
}

export default ProductCreate
