import { yupResolver } from '@hookform/resolvers/yup'
import {
  CancelButton,
  CreateButton,
} from 'components/shared/buttons/CustomButton'
import { Checkbox } from 'components/shared/forms/Checkbox'
import { LocaleInput } from 'components/shared/forms/LocaleInput'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ROLE_FORM_WIDTH, roleSchema } from './constant'
import { FormControlLabel, Stack } from '@mui/material'

type RoleForm = {
  name: any
  description: string | undefined
  status: boolean | undefined
  privilege: any
  navigation: any
}

const form = ({ defaultValues = {} }) => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<RoleForm>({ resolver: yupResolver(roleSchema), defaultValues })

  const onSubmit: SubmitHandler<RoleForm> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={'column'}
        alignItems={'start'}
        gap={1}
        sx={{ width: ROLE_FORM_WIDTH }}
      >
        <LocaleInput
          label={translate('NAME')}
          name='name'
          onChange={(data: any) => setValue('name', data)}
          error={errors?.name}
        />
        <TextInput
          {...register('description')}
          label={translate('DESCRIPTION')}
          multiline
        />

        <FormControlLabel
          control={<Checkbox {...register('status')} />}
          label={translate('STATUS')}
        />
        <Stack direction={'row'} justifyContent={'end'} gap={2} width={'100%'}>
          <CancelButton onClick={() => navigate(-1)} />
          <CreateButton onClick={handleSubmit(onSubmit)} />
        </Stack>
      </Stack>
    </form>
  )
}

export default form
