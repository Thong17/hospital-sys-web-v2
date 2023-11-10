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
import {
  createProductSchema,
  updateProductSchema,
} from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getProductCreate, getProductUpdate } from 'stores/product/action'
import { selectProductCreate } from 'stores/product/selector'
import SelectInput from 'components/shared/forms/SelectInput'
import { FORM_GAP } from 'constants/layout'
import SpecialtyForm from 'components/module/specialty/SpecialtyForm'
import FormDialog from 'components/shared/dialogs/FormDialog'
import { initSpecialty } from 'components/module/specialty/constant'
import ListTable from 'components/shared/table/ListTable'
import { selectSpecialtyList } from 'stores/specialty/selector'
import { getSpecialtyList } from 'stores/specialty/action'
import useLanguage from 'hooks/useLanguage'
import { LanguageOptions } from 'contexts/language/interface'
import { GENDERS } from 'constants/options'
import { LocaleInput } from 'components/shared/forms/LocaleInput'

export interface IProductForm {
  name: any
  price: number
  currency: string
  category: string
  symptom: string
  code: string
  isStock: boolean
  status: boolean
  description: string | undefined
}

const mapSpecialtyDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English'],
    cost: data?.cost,
    currency: data?.currency?.currency,
    description: data?.description,
  }
}

const form = ({ defaultValues }: { defaultValues: IProductForm }) => {
  const { id } = useParams()
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectProductCreate)
  const [specialtyDialog, setSpecialtyDialog] = useState({ open: false })
  const { data, status } = useAppSelector(selectSpecialtyList)
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
    if (status !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getSpecialtyList({ params }))
  }, [status])

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
        isOpen={specialtyDialog.open}
        onClose={() => setSpecialtyDialog({ open: false })}
        form={
          <SpecialtyForm
            defaultValues={initSpecialty}
            onCancel={() => setSpecialtyDialog({ open: false })}
          />
        }
        list={<ListTable list={data?.map((item: any) => mapSpecialtyDetail(item, lang))} />}
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
                              'category category symptom symptom'
                              'code code code code'
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
            <SelectInput
            {...register('currency')}
            options={GENDERS}
            defaultValue={''}
            value={watch('currency')}
            error={!!errors.currency?.message}
            helperText={errors.currency?.message}
            label={translate('CURRENCY')}
            gridArea='currency'
            required
          />
          
          <SelectInput
            {...register('category')}
            options={GENDERS}
            defaultValue={''}
            value={watch('category')}
            error={!!errors.category?.message}
            helperText={errors.category?.message}
            label={translate('CATEGORY')}
            gridArea='category'
            required
          />
          <SelectInput
            {...register('symptom')}
            options={GENDERS}
            defaultValue={''}
            value={watch('symptom')}
            error={!!errors.symptom?.message}
            helperText={errors.symptom?.message}
            label={translate('SYMPTOM')}
            gridArea='symptom'
            required
          />
          <TextInput
            {...register('code')}
            label={translate('CODE')}
            error={!!errors.code?.message}
            helperText={errors.code?.message as ReactNode}
            sx={{ gridArea: 'code' }}
            required
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
