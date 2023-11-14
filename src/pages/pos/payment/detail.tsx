import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import Container from 'components/shared/Container'
import { breadcrumbs } from '..'
import useTheme from 'hooks/useTheme'
import { translate } from 'contexts/language/LanguageContext'
import { useParams } from 'react-router-dom'
import useDevice from 'hooks/useDevice'
import ProductContainer from 'components/shared/containers/ProductContainer'
import { Stack } from '@mui/material'
import InvoiceForm from 'components/shared/forms/InvoiceForm'

const PaymentDetail = () => {
  const { id } = useParams()
  const { theme } = useTheme()
  const { device } = useDevice()

  const handleAddProduct = (data: any) => {
    console.log(data)
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/pos/payment/${id}`,
              label: translate('PAYMENT'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/pos/payment' }}
        />
      }
    >
      <Container padding={`${theme.responsive[device]?.padding.side}px`}>
        <Stack direction={'row'} gap={3}>
          <ProductContainer onAddProduct={handleAddProduct} />
          <InvoiceForm id={id} />
        </Stack>
      </Container>
    </Layout>
  )
}

export default PaymentDetail
