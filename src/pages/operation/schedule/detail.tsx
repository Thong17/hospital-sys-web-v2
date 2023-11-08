import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useNavigate, useParams } from 'react-router'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getScheduleDetail } from 'stores/schedule/action'
import Container from 'components/shared/Container'
import {
  selectScheduleDetail,
  selectScheduleForm,
} from 'stores/schedule/selector'
import ScheduleInfo from './components/ScheduleInfo'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FORM_WIDTH,
  createPatientHistorySchema,
  initPatientHistory,
} from './constant'
import { Box, Stack } from '@mui/material'
import { TextInput } from 'components/shared/forms/TextInput'
import SelectInput from 'components/shared/forms/SelectInput'
import { FORM_GAP } from 'constants/layout'
import Loading from 'components/shared/Loading'
import { AddAdornmentButton } from 'components/shared/buttons/ActionButton'
import useLanguage from 'hooks/useLanguage'
import {
  CancelButton,
  UpdateButton,
} from 'components/shared/buttons/CustomButton'
import { selectSymptomList } from 'stores/symptom/selector'
import FormDialog from 'components/shared/dialogs/FormDialog'
import ListTable from 'components/shared/table/ListTable'
import SymptomForm from 'components/module/symptom/SymptomForm'
import { initSymptom } from 'components/module/symptom/constant'
import { PATIENT_CONDITIONS } from 'pages/auth/constant'
import { selectTreatmentList } from 'stores/treatment/selector'
import { initTreatment } from 'components/module/treatment/constant'
import { getSymptomList } from 'stores/symptom/action'
import { getTreatmentList } from 'stores/treatment/action'
import TreatmentCreateForm from 'components/module/treatment/TreatmentForm'
import { LanguageOptions } from 'contexts/language/interface'

const mapSymptomDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English']
  }
}

const mapTreatmentDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English']
  }
}

const ScheduleDetail = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { lang } = useLanguage()
  const { data } = useAppSelector(selectScheduleDetail)
  const { isLoading } = useAppSelector(selectScheduleForm)
  const { data: symptoms, status: symptomStatus } =
    useAppSelector(selectSymptomList)
  const { data: treatments, status: treatmentStatus } =
    useAppSelector(selectTreatmentList)
  const [symptomDialog, setSymptomDialog] = useState({ open: false })
  const [treatmentDialog, setTreatmentDialog] = useState({ open: false })
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(createPatientHistorySchema),
    defaultValues: initPatientHistory,
  })

  useEffect(() => {
    if (symptomStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getSymptomList({ params }))
  }, [symptomStatus])

  useEffect(() => {
    if (treatmentStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getTreatmentList({ params }))
  }, [treatmentStatus])

  useEffect(() => {
    dispatch(getScheduleDetail({ id }))
  }, [id])

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Layout
      navbar={
        <Breadcrumb
          list={[
            ...breadcrumbs,
            {
              id: 'action',
              href: `/operation/schedule/detail/${id}`,
              label: translate('DETAIL'),
            },
          ]}
          step={3}
          selectedOption={{ navbar: '/operation/schedule' }}
        />
      }
    >
      <FormDialog
        justify='start'
        isOpen={symptomDialog.open}
        onClose={() => setSymptomDialog({ open: false })}
        form={
          <SymptomForm
            defaultValues={initSymptom}
            onCancel={() => setSymptomDialog({ open: false })}
          />
        }
        list={
          <ListTable
            list={symptoms?.map((item: any) => mapSymptomDetail(item, lang))}
          />
        }
      />
      <FormDialog
        justify='end'
        isOpen={treatmentDialog.open}
        onClose={() => setTreatmentDialog({ open: false })}
        form={
          <TreatmentCreateForm
            defaultValues={initTreatment}
            onCancel={() => setTreatmentDialog({ open: false })}
          />
        }
        list={
          <ListTable
            list={treatments?.map((item: any) => mapTreatmentDetail(item, lang))}
          />
        }
      />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'row'} gap={2}>
            <Box sx={{ width: FORM_WIDTH, height: 'fit-content' }}>
              <ScheduleInfo data={data} />
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  paddingTop: '30px',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridGap: FORM_GAP,
                  gridTemplateAreas: `
                              'symptoms symptoms symptoms'
                              'condition treatments treatments'
                              'diagnose diagnose diagnose'
                              'attachments attachments attachments'
                              'action action action'
                              `,
                }}
              >
                {symptomStatus !== 'COMPLETED' ? (
                  <Loading sx={{ gridArea: 'symptoms' }} />
                ) : (
                  <SelectInput
                    {...register('symptoms')}
                    options={symptoms?.map((item: any) => ({
                      label: item?.name?.[lang] || item?.name?.['English'],
                      value: item?._id,
                    }))}
                    defaultValue={[]}
                    value={watch('symptoms')}
                    error={!!errors.symptoms?.message}
                    helperText={errors.symptoms?.message}
                    label={translate('SYMPTOM')}
                    gridArea='symptoms'
                    required
                    multiple
                    endAdornment={
                      <AddAdornmentButton
                        onClick={() => setSymptomDialog({ open: true })}
                      />
                    }
                  />
                )}
                <SelectInput
                  {...register('condition')}
                  options={PATIENT_CONDITIONS}
                  defaultValue={''}
                  value={watch('condition')}
                  error={!!errors.condition?.message}
                  helperText={errors.condition?.message}
                  label={translate('CONDITION')}
                  gridArea='condition'
                />
                {treatmentStatus !== 'COMPLETED' ? (
                  <Loading sx={{ gridArea: 'treatments' }} />
                ) : (
                  <SelectInput
                    {...register('treatments')}
                    options={treatments?.map((item: any) => ({
                      label: item?.name?.[lang] || item?.name?.['English'],
                      value: item?._id,
                    }))}
                    defaultValue={[]}
                    value={watch('treatments')}
                    error={!!errors.treatments?.message}
                    helperText={errors.treatments?.message}
                    label={translate('TREATMENT')}
                    gridArea='treatments'
                    multiple
                    required
                    endAdornment={
                      <AddAdornmentButton
                        onClick={() => setTreatmentDialog({ open: true })}
                      />
                    }
                  />
                )}
                <TextInput
                  {...register('diagnose')}
                  label={translate('DIAGNOSE')}
                  error={!!errors.diagnose?.message}
                  helperText={errors.diagnose?.message as ReactNode}
                  multiline
                  sx={{ gridArea: 'diagnose' }}
                />
                <TextInput
                  {...register('attachments')}
                  label={translate('ATTACHMENTS')}
                  error={!!errors.attachments?.message}
                  helperText={errors.attachments?.message as ReactNode}
                  type='file'
                  inputProps={{ multiple: true }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridArea: 'attachments' }}
                />
                <Stack
                  direction={'row'}
                  justifyContent={'end'}
                  gap={2}
                  width={'100%'}
                  sx={{ gridArea: 'action' }}
                >
                  <CancelButton onClick={() => navigate(-1)} />
                  <UpdateButton
                    type='submit'
                    isLoading={isLoading}
                    onClick={handleSubmit(onSubmit)}
                  />
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: 'blueviolet',
                width: `calc(100% - ${FORM_WIDTH}px)`,
                height: 'fit-content',
              }}
            >
              <p>Hello</p>
            </Box>
          </Stack>
        </form>
      </Container>
    </Layout>
  )
}

export default ScheduleDetail
