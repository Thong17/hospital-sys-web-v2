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
import { DOCTOR_FORM_WIDTH, createDoctorSchema, updateDoctorSchema } from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getDoctorCreate, getDoctorUpdate } from 'stores/doctor/action'
import { selectDoctorCreate } from 'stores/doctor/selector'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'
import SelectInput from 'components/shared/forms/SelectInput'
import { GENDERS } from 'pages/auth/constant'

export interface IDoctorForm {
  firstName: string,
  lastName: string,
  gender: string,
  specialty: string[],
  dateOfBirth: string,
  status: boolean,
  description: string,
}

const form = ({ defaultValues }: { defaultValues: IDoctorForm }) => {
  const { id } = useParams()
  const { width } = useDevice()
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
    resolver: id ? yupResolver(updateDoctorSchema) : yupResolver(createDoctorSchema),
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
      <Stack direction={width > TABLET_WIDTH ? 'row' : 'column'} gap={4} pt={3}>
        <Box sx={{ position: 'sticky', top: 20 }}>
          <Box
            sx={{
              width: width > TABLET_WIDTH ? DOCTOR_FORM_WIDTH : '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: 23,
              gridTemplateAreas: `
                              'lastName firstName firstName'
                              'gender dateOfBirth dateOfBirth'
                              'specialty specialty specialty'
                              'description description description'
                              'status status status'
                              'action action action'
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
            <SelectInput
              {...register('gender')}
              options={GENDERS}
              defaultValue={''}
              value={watch('gender')}
              error={!!errors.gender?.message}
              helperText={errors.gender?.message}
              label={translate('GENDER')}
              sx={{ gridArea: 'gender' }}
              required
            />
            <TextInput
              {...register('dateOfBirth')}
              label={translate('DATE_OF_BIRTH')}
              error={!!errors.dateOfBirth?.message}
              helperText={errors.dateOfBirth?.message as ReactNode}
              type='date'
              sx={{ gridArea: 'dateOfBirth' }}
            />
            <TextInput
              {...register('specialty')}
              label={translate('SPECIALTY')}
              error={!!errors.specialty?.message}
              helperText={errors.specialty?.message as ReactNode}
              sx={{ gridArea: 'specialty' }}
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
        </Box>
      </Stack>
    </form>
  )
}

export default form
