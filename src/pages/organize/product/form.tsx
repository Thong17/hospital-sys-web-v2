import { yupResolver } from '@hookform/resolvers/yup'
import {
  CancelButton,
  CreateButton,
  UpdateButton,
} from 'components/shared/buttons/CustomButton'
import { Checkbox } from 'components/shared/forms/Checkbox'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { createProductSchema, updateProductSchema } from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getProductCreate, getProductUpdate } from 'stores/product/action'
import { selectProductCreate } from 'stores/product/selector'
import SelectInput from 'components/shared/forms/SelectInput'
import { FORM_GAP } from 'constants/layout'
import FormDialog from 'components/shared/dialogs/FormDialog'
import ListTable from 'components/shared/table/ListTable'
import useLanguage from 'hooks/useLanguage'
import { LanguageOptions } from 'contexts/language/interface'
import { LocaleInput } from 'components/shared/forms/LocaleInput'
import { ImageInput } from 'components/shared/forms/ImageInput'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'
import CategoryCreateForm from 'components/module/category/CategoryForm'
import { initCategory } from 'components/module/category/constant'
import { selectSymptomList } from 'stores/symptom/selector'
import { selectCategoryList } from 'stores/category/selector'
import { selectExchangeRateList } from 'stores/exchangeRate/selector'
import ExchangeRateForm from 'components/module/exchangeRate/ExchangeRateForm'
import { initExchangeRate } from 'components/module/exchangeRate/constant'
import SymptomForm from 'components/module/symptom/SymptomForm'
import { initSymptom } from 'components/module/symptom/constant'
import Loading from 'components/shared/Loading'
import { getCategoryList } from 'stores/category/action'
import { getSymptomList } from 'stores/symptom/action'
import { getExchangeRateList } from 'stores/exchangeRate/action'

export interface IProductForm {
  name: any
  price: number
  currency: string
  category: string
  symptoms: string[]
  code: string
  isStock: boolean
  status: boolean
  images: string[] | Blob[]
  description: string | undefined
}

const mapCategoryDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English'],
  }
}

const mapCurrencyDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English'],
  }
}

const mapSymptomDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English'],
  }
}

const form = ({ defaultValues }: { defaultValues: IProductForm }) => {
  const { id } = useParams()
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectProductCreate)
  const { data: symptoms, status: symptomStatus } =
    useAppSelector(selectSymptomList)
  const { data: categories, status: categoryStatus } =
    useAppSelector(selectCategoryList)
  const { data: currencies, status: currencyStatus } = useAppSelector(
    selectExchangeRateList
  )
  const [symptomDialog, setSymptomDialog] = useState({ open: false })
  const [categoryDialog, setCategoryDialog] = useState({ open: false })
  const [exchangeRateDialog, setExchangeRateDialog] = useState({ open: false })
  const {
    watch,
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: id
      ? yupResolver(updateProductSchema)
      : yupResolver(createProductSchema),
    defaultValues,
  })

  useEffect(() => {
    if (categoryStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getCategoryList({ params }))
  }, [categoryStatus])

  useEffect(() => {
    if (symptomStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getSymptomList({ params }))
  }, [symptomStatus])

  useEffect(() => {
    if (currencyStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getExchangeRateList({ params }))
  }, [currencyStatus])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<any> = (data) => {
    if (id) return dispatch(getProductUpdate({ id, data }))
    dispatch(getProductCreate(data))
  }

  return (
    <>
      <FormDialog
        justify='end'
        isOpen={categoryDialog.open}
        onClose={() => setCategoryDialog({ open: false })}
        form={
          <CategoryCreateForm
            defaultValues={initCategory}
            onCancel={() => setCategoryDialog({ open: false })}
          />
        }
        list={
          <ListTable
            list={categories?.map((item: any) => mapCategoryDetail(item, lang))}
          />
        }
      />
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
      <FormDialog
        justify='start'
        isOpen={symptomDialog.open}
        onClose={() => setSymptomDialog({ open: false })}
        form={
          <SymptomForm
            defaultValues={initSymptom}
            onCancel={() => setSymptomDialog({ open: false })}
          />
        }
        list={
          <ListTable
            list={symptoms?.map((item: any) => mapSymptomDetail(item, lang))}
          />
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          pt={5}
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr 2fr',
            gridGap: FORM_GAP,
            gridTemplateAreas: `
                              'name name name name'
                              'price price price currency'
                              'category category symptoms symptoms'
                              'code code code code'
                              'images images images images'
                              'description description description description'
                              'isStock status status status'
                              'action action action action'
                              `,
          }}
        >
          <LocaleInput
            label={translate('NAME')}
            name='name'
            onChange={(data: any) => setValue('name', data)}
            defaultValue={getValues('name')}
            error={errors?.name}
            gridArea='name'
          />
          <TextInput
            {...register('price')}
            label={translate('PRICE')}
            error={!!errors.price?.message}
            helperText={errors.price?.message as ReactNode}
            type='number'
            required
            sx={{ gridArea: 'price' }}
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
          {categoryStatus !== 'COMPLETED' ? (
            <Loading sx={{ gridArea: 'category' }} />
          ) : (
            <SelectInput
              {...register('category')}
              options={categories?.map((item: any) => ({
                label: item?.name?.[lang] || item?.name?.['English'],
                value: item?._id,
              }))}
              defaultValue={''}
              value={watch('category')}
              error={!!errors.category?.message}
              helperText={errors.category?.message}
              label={translate('CATEGORY')}
              gridArea='category'
              required
              endAdornment={
                <AddAdornmentButton
                  onClick={() => setCategoryDialog({ open: true })}
                />
              }
            />
          )}
          {symptomStatus !== 'COMPLETED' ? (
            <Loading sx={{ gridArea: 'symptoms' }} />
          ) : (
            <SelectInput
              {...register('symptoms')}
              options={symptoms?.map((item: any) => ({
                label: item?.name?.[lang] || item?.name?.['English'],
                value: item?._id,
              }))}
              defaultValue={[]}
              value={watch('symptoms')}
              error={!!errors.symptoms?.message}
              helperText={errors.symptoms?.message}
              label={translate('SYMPTOM')}
              gridArea='symptoms'
              required
              multiple
              endAdornment={
                <AddAdornmentButton
                  onClick={() => setSymptomDialog({ open: true })}
                />
              }
            />
          )}
          <TextInput
            {...register('code')}
            label={translate('CODE')}
            error={!!errors.code?.message}
            helperText={errors.code?.message as ReactNode}
            sx={{ gridArea: 'code' }}
          />
          <ImageInput
            {...register('images')}
            label={translate('IMAGE')}
            error={!!errors.images?.message}
            helperText={errors.images?.message as ReactNode}
            containerProps={{ sx: { gridArea: 'images' } }}
            urls={watch('images')}
            inputProps={{ multiple: true }}
          />
          <TextInput
            {...register('description')}
            label={translate('DESCRIPTION')}
            multiline
            sx={{ gridArea: 'description' }}
          />
          <FormControlLabel
            control={
              <Checkbox {...register('isStock')} checked={watch('isStock')} />
            }
            label={translate('IS_STOCK')}
            sx={{ gridArea: 'isStock' }}
          />
          <FormControlLabel
            control={
              <Checkbox {...register('status')} checked={watch('status')} />
            }
            label={translate('STATUS')}
            sx={{ gridArea: 'status' }}
          />
          <Stack
            direction={'row'}
            justifyContent={'end'}
            gap={2}
            width={'100%'}
            sx={{ gridArea: 'action' }}
          >
            <CancelButton onClick={() => navigate(-1)} />
            {id ? (
              <UpdateButton
                type='submit'
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
              />
            ) : (
              <CreateButton
                type='submit'
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </Stack>
        </Box>
      </form>
    </>
  )
}

export default form
