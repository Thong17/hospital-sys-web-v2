import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import {
  CancelButton,
  CustomizedButton,
} from 'components/shared/buttons/CustomButton'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { useForm } from 'react-hook-form'
import { LocaleInput } from 'components/shared/forms/LocaleInput'
import useDevice from 'hooks/useDevice'
import { FORM_GAP } from 'constants/layout'
import { ALERT_SIDE_PADDING } from 'components/shared/dialogs'
import { useAppDispatch } from 'app/store'
import { getSymptomCreate, getSymptomList } from 'stores/symptom/action'
import { symptomSchema } from './constant'


const SymptomCreateForm = ({
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
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(symptomSchema),
    defaultValues,
  })

  const onSubmit = (data: any) => {
    dispatch(getSymptomCreate(data))
      .unwrap()
      .then(() => {
        dispatch(getSymptomList({}))
      })
      .catch(() => {})
  }

  return (
    <>
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
          {...register('description')}
          label={translate('DESCRIPTION')}
          multiline
          sx={{ gridArea: 'description' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
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

export default SymptomCreateForm
