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
  createDoctorSchema,
  updateDoctorSchema,
} from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getDoctorCreate, getDoctorUpdate } from 'stores/doctor/action'
import { selectDoctorCreate } from 'stores/doctor/selector'
import SelectInput from 'components/shared/forms/SelectInput'
import { FORM_GAP } from 'constants/layout'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'
import SpecialtyForm from 'components/module/specialty/SpecialtyForm'
import FormDialog from 'components/shared/dialogs/FormDialog'
import { initSpecialty } from 'components/module/specialty/constant'
import ListTable from 'components/shared/table/ListTable'
import { selectSpecialtyList } from 'stores/specialty/selector'
import { getSpecialtyList } from 'stores/specialty/action'
import useLanguage from 'hooks/useLanguage'
import { LanguageOptions } from 'contexts/language/interface'
import { GENDERS, SHIFT_DAY } from 'constants/options'

export interface IDoctorForm {
  fullName: string
  username: string
  gender: string
  email: string
  contact: string
  specialties: string[]
  shift: string[]
  dateOfBirth: string
  startTime: string
  endTime: string
  status: boolean
  description: string
}

const mapSpecialtyDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English'],
    cost: data?.cost,
    currency: data?.currency?.currency,
    description: data?.description,
  }
}

const form = ({ defaultValues }: { defaultValues: IDoctorForm }) => {
  const { id } = useParams()
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectDoctorCreate)
  const [specialtyDialog, setSpecialtyDialog] = useState({ open: false })
  const { data, status } = useAppSelector(selectSpecialtyList)
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
    if (status !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getSpecialtyList({ params }))
  }, [status])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<any> = (data) => {
    if (id) return dispatch(getDoctorUpdate({ id, data }))
    dispatch(getDoctorCreate(data))
  }

  const handleRemoveSpecialty = (data: any) => {
    console.log(data)
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
                              'username username fullName fullName'
                              'dateOfBirth dateOfBirth dateOfBirth gender'
                              'contact contact email email'
                              'specialties specialties specialties specialties'
                              'startTime startTime endTime endTime'
                              'shift shift shift shift'
                              'description description description description'
                              'status status status status'
                              'action action action action'
                              `,
          }}
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
          />
          <TextInput
            {...register('email')}
            label={translate('EMAIL')}
            error={!!errors.email?.message}
            helperText={errors.email?.message as ReactNode}
            sx={{ gridArea: 'email' }}
          />
          <SelectInput
            {...register('specialties')}
            options={data?.map((item: any) => ({ label: item?.name?.[lang] || item?.name?.['English'], value: item?._id }))}
            defaultValue={''}
            value={watch('specialties')}
            error={!!errors.specialties?.message}
            helperText={errors.specialties?.message}
            label={translate('SPECIALTIES')}
            gridArea='specialties'
            multiple
            onRemoveOption={handleRemoveSpecialty}
            endAdornment={
              <AddAdornmentButton
                onClick={() => setSpecialtyDialog({ open: true })}
              />
            }
          />
          <TextInput
            {...register('startTime')}
            label={translate('START_TIME')}
            error={!!errors.startTime?.message}
            helperText={errors.startTime?.message as ReactNode}
            type='time'
            InputLabelProps={{ shrink: true }}
            sx={{ gridArea: 'startTime' }}
          />
          <TextInput
            {...register('endTime')}
            label={translate('END_TIME')}
            error={!!errors.endTime?.message}
            helperText={errors.endTime?.message as ReactNode}
            type='time'
            InputLabelProps={{ shrink: true }}
            sx={{ gridArea: 'endTime' }}
          />
          <SelectInput
            {...register('shift')}
            options={SHIFT_DAY}
            defaultValue={''}
            value={watch('shift')}
            error={!!errors.shift?.message}
            helperText={errors.shift?.message}
            label={translate('SHIFT')}
            gridArea='shift'
            multiple
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
    </>
  )
}

export default form
