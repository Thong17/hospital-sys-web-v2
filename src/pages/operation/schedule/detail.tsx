import { Layout } from 'components/layouts/Layout'
import Breadcrumb from 'components/shared/Breadcrumb'
import { breadcrumbs } from '..'
import { translate } from 'contexts/language/LanguageContext'
import { useParams } from 'react-router'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getScheduleDetail, getScheduleEnd, getScheduleUpdate } from 'stores/schedule/action'
import Container from 'components/shared/Container'
import {
  selectScheduleDetail,
} from 'stores/schedule/selector'
import ScheduleInfo from './components/ScheduleInfo'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
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
import { selectSymptomList } from 'stores/symptom/selector'
import FormDialog from 'components/shared/dialogs/FormDialog'
import ListTable from 'components/shared/table/ListTable'
import SymptomForm from 'components/module/symptom/SymptomForm'
import { initSymptom } from 'components/module/symptom/constant'
import { selectCategoryList } from 'stores/category/selector'
import { initCategory } from 'components/module/category/constant'
import { getSymptomList } from 'stores/symptom/action'
import { getCategoryList } from 'stores/category/action'
import CategoryCreateForm from 'components/module/category/CategoryForm'
import { LanguageOptions } from 'contexts/language/interface'
import { PATIENT_CONDITIONS } from 'constants/options'
import { selectConfig } from 'stores/config/selector'
import CartContainer, { FORM_WIDTH_COMPACTED, FORM_WIDTH_EXPANDED } from 'components/shared/containers/CartContainer'

const mapSymptomDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English']
  }
}

const mapCategoryDetail = (data: any, lang: LanguageOptions) => {
  return {
    name: data?.name?.[lang] || data?.name?.['English']
  }
}

const ScheduleDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { lang } = useLanguage()
  const { data } = useAppSelector(selectScheduleDetail)
  const { data: symptoms, status: symptomStatus } =
    useAppSelector(selectSymptomList)
  const { data: categories, status: categoryStatus } =
    useAppSelector(selectCategoryList)
  const { isOpenedCart } = useAppSelector(selectConfig)
  const [symptomDialog, setSymptomDialog] = useState({ open: false })
  const [categoryDialog, setCategoryDialog] = useState({ open: false })
  const {
    getValues,
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
    if (categoryStatus !== 'INIT') return
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getCategoryList({ params }))
  }, [categoryStatus])

  useEffect(() => {
    dispatch(getScheduleDetail({ id }))
  }, [id])

  const onSubmit = (data: any) => {
    console.log({data})
  }

  const handleSave = (data: any) => {
    dispatch(getScheduleUpdate({ id, data: { ...getValues(), comment: data?.comment } }))
  }

  const handleEnd = (data: any) => {
    dispatch(getScheduleEnd({ id, data: { ...getValues(), comment: data?.comment } }))
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
        isOpen={categoryDialog.open}
        onClose={() => setCategoryDialog({ open: false })}
        form={
          <CategoryCreateForm
            defaultValues={initCategory}
            onCancel={() => setCategoryDialog({ open: false })}
          />
        }
        list={
          <ListTable
            list={categories?.map((item: any) => mapCategoryDetail(item, lang))}
          />
        }
      />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'row'} gap={'10px'}>
            <Box sx={{ width: isOpenedCart ? `calc(100% - ${FORM_WIDTH_EXPANDED}px)` : `calc(100% - ${FORM_WIDTH_COMPACTED}px)`, height: 'fit-content' }}>
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
                {categoryStatus !== 'COMPLETED' ? (
                  <Loading sx={{ gridArea: 'categories' }} />
                ) : (
                  <SelectInput
                    {...register('treatments')}
                    options={categories?.map((item: any) => ({
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
                        onClick={() => setCategoryDialog({ open: true })}
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
              </Box>
            </Box>
            <CartContainer onSave={handleSave} onEnd={handleEnd} />
          </Stack>
        </form>
      </Container>
    </Layout>
  )
}

export default ScheduleDetail
