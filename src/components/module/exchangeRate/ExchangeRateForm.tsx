import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import {
  CancelButton,
  CustomizedButton,
} from 'components/shared/buttons/CustomButton'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import useDevice from 'hooks/useDevice'
import { FORM_GAP } from 'constants/layout'
import { ALERT_SIDE_PADDING } from 'components/shared/dialogs'
import { useAppDispatch } from 'app/store'
import { exchangeRateSchema } from './constant'
import {
  getExchangeRateCreate,
  getExchangeRateList,
} from 'stores/exchangeRate/action'

const ExchangeRateForm = ({
  defaultValues,
  onCancel,
}: {
  defaultValues?: any
  onCancel: (_data: any) => void
}) => {
  const { width } = useDevice()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(exchangeRateSchema),
    defaultValues,
  })

  const onSubmit = (data: any) => {
    dispatch(getExchangeRateCreate(data))
      .unwrap()
      .then(() => {
        dispatch(getExchangeRateList({}))
      })
      .catch(() => {})
  }

  return (
    <>
      <Box
        sx={{
          width:
            width > 1024
              ? `calc(50vw - ${ALERT_SIDE_PADDING * 2 + ALERT_SIDE_PADDING}px)`
              : `calc(100vw - ${ALERT_SIDE_PADDING * 2}px)`,
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: FORM_GAP,
          gridTemplateAreas: `
                              'currency currency value'
                              'description description description'
                              'action action action'
                              `,
        }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          {...register('currency')}
          label={translate('CURRENCY')}
          error={!!errors.currency?.message}
          helperText={errors.currency?.message as ReactNode}
          required
          sx={{ gridArea: 'currency' }}
        />
        <TextInput
          {...register('value')}
          label={translate('VALUE')}
          error={!!errors.value?.message}
          helperText={errors.value?.message as ReactNode}
          type='number'
          required
          sx={{ gridArea: 'value' }}
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

export default ExchangeRateForm
