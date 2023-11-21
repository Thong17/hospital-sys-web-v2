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
import { createPatientSchema } from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getPatientCreate, getPatientUpdate } from 'stores/patient/action'
import { selectPatientCreate } from 'stores/patient/selector'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'
import SelectInput from 'components/shared/forms/SelectInput'
import { FORM_GAP } from 'constants/layout'
import { GENDERS } from 'constants/options'

export interface IPatientForm {
  fullName: string
  gender: string
  email: string
  contact: string
  dateOfBirth: string
  status: boolean
  description: string
}

const form = ({ defaultValues }: { defaultValues: IPatientForm }) => {
  const { id } = useParams()
  const { width } = useDevice()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectPatientCreate)
  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(createPatientSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<any> = (data) => {
    if (id) return dispatch(getPatientUpdate({ id, data }))
    dispatch(getPatientCreate(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={width > TABLET_WIDTH ? 'row' : 'column'} gap={4} pt={5}>
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: FORM_GAP,
            gridTemplateAreas: `
                              'fullName fullName fullName'
                              'dateOfBirth dateOfBirth gender'
                              'contact email email'
                              'description description description'
                              'status status status'
                              'action action action'
                              `,
          }}
        >
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
      </Stack>
    </form>
  )
}

export default form
