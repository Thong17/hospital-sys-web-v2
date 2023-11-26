import { Layout } from 'components/layouts/Layout'
import Container from 'components/shared/Container'
import { CustomLineChart } from 'components/shared/charts/LineChart'

export const TransactionReport = () => {
  return (
    <Layout>
      <Container>
        <CustomLineChart />
      </Container>
    </Layout>
  )
}

