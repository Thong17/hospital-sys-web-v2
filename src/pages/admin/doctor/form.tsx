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
import { createDoctorSchema, updateDoctorSchema } from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getDoctorCreate, getDoctorUpdate } from 'stores/doctor/action'
import { selectDoctorCreate } from 'stores/doctor/selector'
import SelectInput from 'components/shared/forms/SelectInput'
import { GENDERS } from 'pages/auth/constant'
import { FORM_GAP } from 'constants/layout'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'

export interface IDoctorForm {
  firstName: string
  lastName: string
  gender: string
  specialty: string[]
  dateOfBirth: string
  startTime: string
  endTime: string
  status: boolean
  description: string
}

const form = ({ defaultValues }: { defaultValues: IDoctorForm }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectDoctorCreate)
  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: id
      ? yupResolver(updateDoctorSchema)
      : yupResolver(createDoctorSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<any> = (data) => {
    if (id) return dispatch(getDoctorUpdate({ id, data }))
    dispatch(getDoctorCreate(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        pt={3}
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr 2fr',
          gridGap: FORM_GAP,
          gridTemplateAreas: `
                              'lastName lastName firstName firstName'
                              'dateOfBirth dateOfBirth dateOfBirth gender'
                              'specialty specialty specialty specialty'
                              'startTime startTime endTime endTime'
                              'description description description description'
                              'status status status status'
                              'action action action action'
                              `,
        }}
      >
        <TextInput
          {...register('lastName')}
          label={translate('LAST_NAME')}
          error={!!errors.lastName?.message}
          helperText={errors.lastName?.message as ReactNode}
          required
          sx={{ gridArea: 'lastName' }}
        />
        <TextInput
          {...register('firstName')}
          label={translate('FIRST_NAME')}
          error={!!errors.firstName?.message}
          helperText={errors.firstName?.message as ReactNode}
          required
          sx={{ gridArea: 'firstName' }}
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
        <SelectInput
          {...register('specialty')}
          options={GENDERS}
          defaultValue={''}
          value={watch('specialty')}
          error={!!errors.specialty?.message}
          helperText={errors.specialty?.message}
          label={translate('SPECIALTY')}
          gridArea='specialty'
          multiple
          endAdornment={
            <AddAdornmentButton
              onClick={() => alert('Hey')}
            />
          }
        />
        <TextInput
          {...register('startTime')}
          label={translate('START_TIME')}
          error={!!errors.startTime?.message}
          helperText={errors.startTime?.message as ReactNode}
          type='date'
          InputLabelProps={{ shrink: true }}
          sx={{ gridArea: 'startTime' }}
        />
        <TextInput
          {...register('endTime')}
          label={translate('END_TIME')}
          error={!!errors.endTime?.message}
          helperText={errors.endTime?.message as ReactNode}
          type='date'
          InputLabelProps={{ shrink: true }}
          sx={{ gridArea: 'endTime' }}
        />
        <TextInput
          {...register('description')}
          label={translate('DESCRIPTION')}
          multiline
          sx={{ gridArea: 'description' }}
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
  )
}

export default form
