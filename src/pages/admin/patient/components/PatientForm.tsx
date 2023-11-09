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
import { getPatientCreate, getPatientList } from 'stores/patient/action'
import { createPatientSchema } from '../constant'
import SelectInput from 'components/shared/forms/SelectInput'
import { GENDERS } from 'constants/options'

const PatientForm = ({
  defaultValues,
  onCancel,
}: {
  defaultValues?: any
  onCancel: (_data: any) => void
}) => {
  const { width } = useDevice()
  const dispatch = useAppDispatch()
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(createPatientSchema),
    defaultValues,
  })

  const onSubmit = (data: any) => {
    dispatch(getPatientCreate(data))
      .unwrap()
      .then(() => {
        dispatch(getPatientList({}))
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
                              'username fullName fullName'
                              'dateOfBirth dateOfBirth gender'
                              'contact email email'
                              'description description description'
                              'action action action'
                              `,
        }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          {...register('username')}
          label={translate('USERNAME')}
          error={!!errors.username?.message}
          helperText={errors.username?.message as ReactNode}
          required
          sx={{ gridArea: 'username' }}
        />
        <TextInput
          {...register('fullName')}
          label={translate('FULL_NAME')}
          error={!!errors.fullName?.message}
          helperText={errors.fullName?.message as ReactNode}
          sx={{ gridArea: 'fullName' }}
        />
        <TextInput
          {...register('dateOfBirth')}
          label={translate('DATE_OF_BIRTH')}
          error={!!errors.dateOfBirth?.message}
          helperText={errors.dateOfBirth?.message as ReactNode}
          type='date'
          InputLabelProps={{ shrink: true }}
          sx={{ gridArea: 'dateOfBirth' }}
        />
        <SelectInput
          {...register('gender')}
          options={GENDERS}
          defaultValue={''}
          value={watch('gender')}
          error={!!errors.gender?.message}
          helperText={errors.gender?.message}
          label={translate('GENDER')}
          gridArea='gender'
          required
        />
        <TextInput
          {...register('contact')}
          label={translate('CONTACT')}
          error={!!errors.contact?.message}
          helperText={errors.contact?.message as ReactNode}
          sx={{ gridArea: 'contact' }}
          required
        />
        <TextInput
          {...register('email')}
          label={translate('EMAIL')}
          error={!!errors.email?.message}
          helperText={errors.email?.message as ReactNode}
          sx={{ gridArea: 'email' }}
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

export default PatientForm
