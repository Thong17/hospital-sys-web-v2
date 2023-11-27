import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '.'

export const ProductReport = () => {
  return (
    <Layout navbar={<Breadcrumb list={breadcrumbs} step={2} selectedOption={{ navbar: '/report/product' }} />}>
      <Container>
        Product Report
      </Container>
    </Layout>
  )
}

