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
import { useAppDispatch } from 'app/store'
import { getPaymentAppendTransaction, getPaymentDetail, getPaymentRemoveTransaction } from 'stores/payment/action'
import useAlert from 'hooks/useAlert'
import { useRef } from 'react'

const PaymentDetail = () => {
  const { id } = useParams()
  const { theme } = useTheme()
  const { device } = useDevice()
  const dispatch = useAppDispatch()
  const confirm = useAlert()
  const productRef = useRef<any>(null)

  const handleAddProduct = (data: any) => {
    const { name, price, currency, _id } = data || {}
    dispatch(
      getPaymentAppendTransaction({
        id, 
        data: {
          description: name?.English,
          price,
          currency: currency?._id,
          product: _id,
          schedule: id,
          quantity: 1,
        }
      })
    )
      .unwrap()
      .then((response: any) => {
        if (response?.code !== 'SUCCESS') return
        dispatch(getPaymentDetail({ id }))
        productRef.current?.fetchListProduct()
      })
      .catch(() => {})
  }

  const handleRemoveTransaction = (transactionId: any) => {
    confirm({
      title: 'REMOVE_PRODUCT_TITLE',
      description: 'REMOVE_PRODUCT_DESCRIPTION',
      variant: 'error',
      reason: true,
    })
      .then(({ reason }: any) => {
        dispatch(getPaymentRemoveTransaction({ id, transactionId, reason }))
          .unwrap()
          .then((response: any) => {
            if (response?.code !== 'SUCCESS') return
            dispatch(getPaymentDetail({ id }))
            productRef.current?.fetchListProduct()
          })
          .catch(() => {})
      })
      .catch(() => {})
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
          <ProductContainer ref={productRef} onAddProduct={handleAddProduct} />
          <InvoiceForm onRemove={handleRemoveTransaction} id={id} />
        </Stack>
      </Container>
    </Layout>
  )
}

export default PaymentDetail
