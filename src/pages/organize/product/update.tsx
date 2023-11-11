import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import ProductForm, { IProductForm } from './form'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectProductDetail } from 'stores/product/selector'
import { getProductDetail } from 'stores/product/action'
import { initProduct } from './constant'
import Container from 'components/shared/Container'

const ProductUpdate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useAppSelector(selectProductDetail)

  useEffect(() => {
    dispatch(getProductDetail({ id }))
      .unwrap()
      .then(() => setIsLoading(false))
  }, [id])

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/organize/product/update/${id}`,
              label: translate('UPDATE'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/organize/product' }}
        />
      }
    >
      <Container>
        {!isLoading && <ProductForm defaultValues={mapProductBody(data)} />}
      </Container>
    </Layout>
  )
}

const mapProductBody = (data: any): IProductForm => {
  if (!data) return initProduct
  return {
    name: data.name,
    price: data.price,
    currency: data.currency,
    category: data.category,
    symptom: data.symptom,
    code: data.code,
    isStock: data.isStock,
    status: data.status,
    images: data.images,
    description: data.description,
  }
}

export default ProductUpdate
