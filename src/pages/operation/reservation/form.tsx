import { yupResolver } from '@hookform/resolvers/yup'
import {
  CancelButton,
  CreateButton,
  UpdateButton,
} from 'components/shared/buttons/CustomButton'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { RESERVATION_FORM_WIDTH, createReservationSchema } from './constant'
import { Box, Stack, Typography } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import {
  getReservationCreate,
  getReservationUpdate,
} from 'stores/reservation/action'
import { selectReservationCreate } from 'stores/reservation/selector'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'
import SelectInput from 'components/shared/forms/SelectInput'
import { PATIENT_CATEGORIES } from 'pages/auth/constant'
import { FORM_GAP } from 'constants/layout'
import { getSpecialtyList } from 'stores/specialty/action'
import { selectSpecialtyList } from 'stores/specialty/selector'
import useLanguage from 'hooks/useLanguage'
import { selectDoctorList } from 'stores/doctor/selector'
import { getDoctorList } from 'stores/doctor/action'
import { selectPatientList } from 'stores/patient/selector'
import { getPatientList } from 'stores/patient/action'
import { calculateDuration } from 'utils/index'
import Loading from 'components/shared/Loading'
import AppointmentCalendar from 'components/shared/calendar/AppointmentCalendar'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'
import FormDialog from 'components/shared/dialogs/FormDialog'
import { initPatient } from 'pages/admin/patient/constant'
import ListTable from 'components/shared/table/ListTable'
import PatientForm from 'pages/admin/patient/components/PatientForm'

export interface IReservationForm {
  appointmentDate: string
  patient: string
  duration: string
  category: string
  specialties: string[]
  doctors: string[]
  status: boolean
  note: string
}

const mapPatientDetail = (data: any) => {
  return {
    name: data?.username
  }
}

const form = ({ defaultValues }: { defaultValues: IReservationForm }) => {
  const { id } = useParams()
  const { width } = useDevice()
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const dispatch = useAppDispatch()
  const [patientDialog, setPatientDialog] = useState({ open: false })
  const { isLoading } = useAppSelector(selectReservationCreate)
  const { data, status } = useAppSelector(selectSpecialtyList)
  const { data: doctors, status: doctorStatus } =
    useAppSelector(selectDoctorList)
  const { data: patients, status: patientStatus } =
    useAppSelector(selectPatientList)
  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(createReservationSchema),
    defaultValues,
  })

  useEffect(() => {
    if (status !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getSpecialtyList({ params }))
  }, [status])

  useEffect(() => {
    if (doctorStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getDoctorList({ params }))
  }, [doctorStatus])

  useEffect(() => {
    if (patientStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getPatientList({ params }))
  }, [patientStatus])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<any> = (data) => {
    if (id) return dispatch(getReservationUpdate({ id, data }))
    dispatch(getReservationCreate(data))
  }

  return (
    <>
      <FormDialog
        justify='end'
        isOpen={patientDialog.open}
        onClose={() => setPatientDialog({ open: false })}
        form={
          <PatientForm
            defaultValues={initPatient}
            onCancel={() => setPatientDialog({ open: false })}
          />
        }
        list={
          <ListTable
            list={patients?.map((item: any) => mapPatientDetail(item))}
          />
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={width > TABLET_WIDTH ? 'row' : 'column'}
          gap={4}
          pt={5}
        >
          <Box
            sx={{
              width: width > TABLET_WIDTH ? RESERVATION_FORM_WIDTH : '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: FORM_GAP,
              gridTemplateAreas: `
                              'appointmentDate appointmentDate duration'
                              'category patient patient'
                              'specialties specialties specialties'
                              'doctors doctors doctors'
                              'note note note'
                              'action action action'
                              `,
            }}
          >
            <TextInput
              {...register('appointmentDate')}
              label={translate('APPOINTMENT_DATE')}
              error={!!errors.appointmentDate?.message}
              helperText={errors.appointmentDate?.message as ReactNode}
              type='datetime-local'
              required
              InputLabelProps={{ shrink: true }}
              sx={{ gridArea: 'appointmentDate' }}
            />
            <TextInput
              {...register('duration')}
              label={translate('DURATION')}
              error={!!errors.duration?.message}
              helperText={errors.duration?.message as ReactNode}
              type='number'
              InputProps={{
                endAdornment: (
                  <Box px={2}>
                    <Typography>
                      {calculateDuration(watch('duration'))}
                    </Typography>
                  </Box>
                ),
              }}
              sx={{ gridArea: 'duration' }}
            />
            <SelectInput
              {...register('category')}
              options={PATIENT_CATEGORIES}
              defaultValue={''}
              value={watch('category')}
              error={!!errors.category?.message}
              helperText={errors.category?.message}
              label={translate('CATEGORY')}
              gridArea='category'
              required
            />
            {patientStatus !== 'COMPLETED' ? (
              <Loading sx={{ gridArea: 'patient' }} />
            ) : (
              <SelectInput
                {...register('patient')}
                options={patients?.map((item: any) => ({
                  label: item?.username,
                  value: item?._id,
                }))}
                defaultValue={''}
                value={watch('patient')}
                error={!!errors.patient?.message}
                helperText={errors.patient?.message}
                label={translate('PATIENT')}
                gridArea='patient'
                endAdornment={
                  <AddAdornmentButton
                    onClick={() => setPatientDialog({ open: true })}
                  />
                }
              />
            )}
            <SelectInput
              {...register('specialties')}
              options={data?.map((item: any) => ({
                label: item?.name?.[lang] || item?.name?.['English'],
                value: item?._id,
              }))}
              defaultValue={''}
              value={watch('specialties')}
              error={!!errors.specialties?.message}
              helperText={errors.specialties?.message}
              label={translate('SPECIALTIES')}
              gridArea='specialties'
              multiple
            />
            <SelectInput
              {...register('doctors')}
              options={doctors?.map((item: any) => ({
                label: <span>{`${item?.lastName} ${item?.firstName}`}<span className='hidden-label'>{` - ${translate(
                  'SPECIALTY_ON'
                )}: ${item.specialties
                  ?.map(
                    (item: any) => item?.name?.[lang] || item?.name?.['English']
                  )
                  .join(', ')}`}</span></span>,
                value: item?._id,
              }))}
              defaultValue={''}
              value={watch('doctors')}
              error={!!errors.doctors?.message}
              helperText={errors.doctors?.message}
              label={translate('DOCTORS')}
              gridArea='doctors'
              multiple
            />
            <TextInput
              {...register('note')}
              label={translate('NOTE')}
              multiline
              sx={{ gridArea: 'note' }}
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
          <AppointmentCalendar />
        </Stack>
      </form>
    </>
  )
}

export default form
