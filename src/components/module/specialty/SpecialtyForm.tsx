import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import {
  CancelButton,
  CustomizedButton,
} from 'components/shared/buttons/CustomButton'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LocaleInput } from 'components/shared/forms/LocaleInput'
import SelectInput from 'components/shared/forms/SelectInput'
import { GENDERS } from 'pages/auth/constant'
import useDevice from 'hooks/useDevice'
import { FORM_GAP } from 'constants/layout'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'
import { ALERT_SIDE_PADDING } from 'components/shared/dialogs'
import { useAppDispatch } from 'app/store'
import { getSpecialtyCreate } from 'stores/specialty/action'
import FormDialog from 'components/shared/dialogs/FormDialog'
import ExchangeRateForm from '../exchangeRate/ExchangeRateForm'
import { initExchangeRate } from '../exchangeRate/constant'
import { specialtySchema } from './constant'
import ListTable from 'components/shared/table/ListTable'

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

  const onSubmit = (data: any) => {
    dispatch(getSpecialtyCreate(data))
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
        list={<ListTable list={[]} />}
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
          options={GENDERS}
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
            justifyContent: 'end',
            gap: '10px',
            gridArea: 'action',
          }}
        >
          <CancelButton onClick={onCancel} />
          <CustomizedButton
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
