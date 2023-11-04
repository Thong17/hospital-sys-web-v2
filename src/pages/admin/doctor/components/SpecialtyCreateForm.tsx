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
import { specialtySchema } from '../constant'
import { LocaleInput } from 'components/shared/forms/LocaleInput'
import SelectInput from 'components/shared/forms/SelectInput'
import { GENDERS } from 'pages/auth/constant'
import useDevice from 'hooks/useDevice'
import { FORM_GAP } from 'constants/layout'

const SpecialtyCreateForm = ({
  defaultValues,
  onSubmit,
  onCancel,
}: {
  defaultValues?: any
  onSubmit: (_data: any) => void
  onCancel: (_data: any) => void
}) => {
  const { width } = useDevice()
  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(specialtySchema),
    defaultValues,
  })

  return (
    <Box
      sx={{
        width: width > 1024 ? '50vw' : 'calc(100vw - 64px)',
        boxSizing: 'border-box',
        padding: '40px 20px 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: FORM_GAP,
        gridTemplateAreas: `
                              'name name name'
                              'cost cost currency'
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
        {...register('cost')}
        label={translate('COST')}
        error={!!errors.cost?.message}
        helperText={errors.cost?.message as ReactNode}
        type='number'
        required
        sx={{ gridArea: 'cost' }}
      />
      <SelectInput
        {...register('currency')}
        options={GENDERS}
        defaultValue={''}
        value={watch('currency')}
        error={!!errors.currency?.message}
        helperText={errors.currency?.message}
        label={translate('CURRENCY')}
        gridArea='currency'
        required
      />
      <TextInput
        {...register('description')}
        label={translate('DESCRIPTION')}
        multiline
        sx={{ gridArea: 'description' }}
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'end', gap: '10px', gridArea: 'action' }}
      >
        <CancelButton onClick={onCancel} />
        <CustomizedButton
          type='submit'
          onClick={handleSubmit(onSubmit)}
          label={translate('ADD')}
        />
      </Box>
    </Box>
  )
}

export default SpecialtyCreateForm