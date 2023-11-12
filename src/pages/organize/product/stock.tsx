import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import Container from 'components/shared/Container'
import { Box, Stack } from '@mui/material'
import TitleContainer from 'components/shared/containers/TitleContainer'
import { useNavigate, useParams } from 'react-router'
import ProductDetail from './components/ProductDetail'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectProductDetail } from 'stores/product/selector'
import { ReactNode, useEffect, useState } from 'react'
import { getProductDetail } from 'stores/product/action'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PRODUCT_FORM_WIDTH, initProductStock, stockProductSchema } from './constant'
import { FORM_GAP } from 'constants/layout'
import { TextInput } from 'components/shared/forms/TextInput'
import { selectExchangeRateList } from 'stores/exchangeRate/selector'
import Loading from 'components/shared/Loading'
import SelectInput from 'components/shared/forms/SelectInput'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'
import FormDialog from 'components/shared/dialogs/FormDialog'
import ExchangeRateForm from 'components/module/exchangeRate/ExchangeRateForm'
import {
  initExchangeRate,
  mapCurrencyDetail,
} from 'components/module/exchangeRate/constant'
import ListTable from 'components/shared/table/ListTable'
import useLanguage from 'hooks/useLanguage'
import {
  CancelButton,
  UpdateButton,
} from 'components/shared/buttons/CustomButton'
import { getExchangeRateList } from 'stores/exchangeRate/action'

const ProductStock = () => {
  const { id } = useParams()
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectProductDetail)
  const { data: currencies, status: currencyStatus } = useAppSelector(
    selectExchangeRateList
  )
  const [exchangeRateDialog, setExchangeRateDialog] = useState({ open: false })
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(stockProductSchema),
    defaultValues: initProductStock,
  })

  useEffect(() => {
    if (currencyStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getExchangeRateList({ params }))
  }, [currencyStatus])

  useEffect(() => {
    dispatch(getProductDetail({ id }))
  }, [id])

  const onSubmit = () => {}

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/organize/product/stock/${id}`,
              label: translate('STOCK'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/organize/product' }}
        />
      }
    >
      <FormDialog
        justify='start'
        isOpen={exchangeRateDialog.open}
        onClose={() => setExchangeRateDialog({ open: false })}
        form={
          <ExchangeRateForm
            defaultValues={initExchangeRate}
            onCancel={() => setExchangeRateDialog({ open: false })}
          />
        }
        list={
          <ListTable
            list={currencies?.map((item: any) => mapCurrencyDetail(item, lang))}
          />
        }
      />
      <Container>
        <TitleContainer text={translate('TITLE_PRODUCT_STOCK') as String}>
          <Stack direction={'row'} gap={1}></Stack>
        </TitleContainer>
        <Stack direction={'row'} gap={3} pt={3}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: PRODUCT_FORM_WIDTH, height: '500px' }}>
            <Box
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 3fr',
                gridGap: FORM_GAP,
                gridTemplateAreas: `
                                  'cost cost cost currency'
                                  'quantity code code code'
                                  'alertAt alertAt expireAt expireAt'
                                  'note note note note'
                                  'action action action action'
                                  `,
              }}
            >
              <TextInput
                {...register('cost')}
                label={translate('COST')}
                error={!!errors.cost?.message}
                helperText={errors.cost?.message as ReactNode}
                type='number'
                required
                sx={{ gridArea: 'cost' }}
              />
              {currencyStatus !== 'COMPLETED' ? (
                <Loading sx={{ gridArea: 'currency' }} />
              ) : (
                <SelectInput
                  {...register('currency')}
                  options={currencies?.map((item: any) => ({
                    value: item?._id,
                    label: item?.currency,
                  }))}
                  defaultValue={''}
                  value={watch('currency')}
                  error={!!errors.currency?.message}
                  helperText={errors.currency?.message}
                  label={translate('CURRENCY')}
                  gridArea='currency'
                  required
                  endAdornment={
                    <AddAdornmentButton
                      onClick={() => setExchangeRateDialog({ open: true })}
                    />
                  }
                />
              )}
              <TextInput
                {...register('quantity')}
                label={translate('QUANTITY')}
                error={!!errors.quantity?.message}
                helperText={errors.quantity?.message as ReactNode}
                sx={{ gridArea: 'quantity' }}
              />
              <TextInput
                {...register('code')}
                label={translate('CODE')}
                error={!!errors.code?.message}
                helperText={errors.code?.message as ReactNode}
                sx={{ gridArea: 'code' }}
              />
              <TextInput
                {...register('alertAt')}
                label={translate('ALERT_AT')}
                error={!!errors.alertAt?.message}
                helperText={errors.alertAt?.message as ReactNode}
                sx={{ gridArea: 'alertAt' }}
              />
              <TextInput
                {...register('expireAt')}
                label={translate('EXPIRE_AT')}
                error={!!errors.expireAt?.message}
                helperText={errors.expireAt?.message as ReactNode}
                sx={{ gridArea: 'expireAt' }}
                InputLabelProps={{ shrink: true }}
                type='date'
              />
              <TextInput
                {...register('note')}
                label={translate('NOTE')}
                error={!!errors.note?.message}
                helperText={errors.note?.message as ReactNode}
                sx={{ gridArea: 'note' }}
                multiline
              />
              <Stack
                direction={'row'}
                justifyContent={'end'}
                gap={2}
                width={'100%'}
                sx={{ gridArea: 'action' }}
              >
                <CancelButton onClick={() => navigate(-1)} />
                <UpdateButton
                  type='submit'
                  onClick={handleSubmit(onSubmit)}
                />
              </Stack>
            </Box>
          </form>
          <ProductDetail data={data} />
        </Stack>
      </Container>
    </Layout>
  )
}

export default ProductStock
