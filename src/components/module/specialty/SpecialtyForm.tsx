import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import {
  CancelButton,
  CustomizedButton,
} from 'components/shared/buttons/CustomButton'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LocaleInput } from 'components/shared/forms/LocaleInput'
import SelectInput from 'components/shared/forms/SelectInput'
import useDevice from 'hooks/useDevice'
import { FORM_GAP } from 'constants/layout'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'
import { ALERT_SIDE_PADDING } from 'components/shared/dialogs'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getSpecialtyCreate, getSpecialtyList } from 'stores/specialty/action'
import FormDialog from 'components/shared/dialogs/FormDialog'
import ExchangeRateForm from '../exchangeRate/ExchangeRateForm'
import { initExchangeRate } from '../exchangeRate/constant'
import { specialtySchema } from './constant'
import ListTable from 'components/shared/table/ListTable'
import { selectExchangeRateList } from 'stores/exchangeRate/selector'
import { getExchangeRateList } from 'stores/exchangeRate/action'

const mapCurrencyOption = (data: any) => {
  return {
    value: data?._id,
    label: data?.currency,
  }
}

const mapCurrencyDetail = (data: any) => {
  return {
    currency: data?.currency,
    value: data?.value,
    status: <span>{data?.status ? 'True' : 'False'}</span>,
  }
}

const SpecialtyCreateForm = ({
  defaultValues,
  onCancel,
}: {
  defaultValues?: any
  onCancel: (_data: any) => void
}) => {
  const { width } = useDevice()
  const dispatch = useAppDispatch()
  const [exchangeRateDialog, setExchangeRateDialog] = useState({ open: false })
  const { data } = useAppSelector(selectExchangeRateList)
  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(specialtySchema),
    defaultValues,
  })

  useEffect(() => {
    dispatch(getExchangeRateList({}))
  }, [])

  const onSubmit = (data: any) => {
    dispatch(getSpecialtyCreate(data))
      .unwrap()
      .then(() => {
        dispatch(getSpecialtyList({}))
      })
      .catch(() => {})
  }

  return (
    <>
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
          <ListTable list={data?.map((item: any) => mapCurrencyDetail(item))} />
        }
      />
      <Box
        sx={{
          width:
            width > 1024
              ? `calc(50vw - ${
                  ALERT_SIDE_PADDING * 2 + ALERT_SIDE_PADDING / 2
                }px)`
              : `calc(100vw - ${ALERT_SIDE_PADDING * 2}px)`,
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: FORM_GAP,
          gridTemplateAreas: `
                              'name name name'
                              'cost cost currency'
                              'description description description'
                              'action action action'
                              `,
        }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <LocaleInput
          gridArea='name'
          label={translate('NAME')}
          name='name'
          onChange={(data: any) => setValue('name', data)}
          defaultValue={getValues('name')}
          error={errors?.name}
        />
        <TextInput
          {...register('cost')}
          label={translate('COST')}
          error={!!errors.cost?.message}
          helperText={errors.cost?.message as ReactNode}
          type='number'
          required
          sx={{ gridArea: 'cost' }}
        />
        <SelectInput
          {...register('currency')}
          options={data?.map((item: any) => mapCurrencyOption(item))}
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
        <TextInput
          {...register('description')}
          label={translate('DESCRIPTION')}
          multiline
          sx={{ gridArea: 'description' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            gridArea: 'action',
          }}
        >
          <CancelButton fullWidth onClick={onCancel} />
          <CustomizedButton
            fullWidth
            type='submit'
            onClick={handleSubmit(onSubmit)}
            label={translate('ADD')}
          />
        </Box>
      </Box>
    </>
  )
}

export default SpecialtyCreateForm
