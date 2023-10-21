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
import { Box, FormControlLabel, Stack } from '@mui/material'
import PrivilegeBox from 'components/shared/forms/PrivilegeBox'
import { useEffect, useState } from 'react'

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
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleForm>({ resolver: yupResolver(roleSchema), defaultValues })
  const [navigation, setNavigation] = useState({})
  const [privilege, setPrivilege] = useState({})
  const navigationValue = watch('navigation')
  const privilegeValue = watch('privilege')

  useEffect(() => {
    setNavigation(navigationValue)
    return () => {
      setNavigation({})
    }
  }, [navigationValue])

  useEffect(() => {
    setPrivilege(privilegeValue)
    return () => {
      setPrivilege({})
    }
  }, [privilegeValue])

  const onSubmit: SubmitHandler<RoleForm> = (data) => {
    console.log(data)
  }

  const handleChangeNavigation = (data: any) => {
    setValue('navigation', data)
  }

  const handleChangePrivilege = (data: any) => {
    setValue('privilege', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={'row'} gap={4}>
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
          <Stack
            direction={'row'}
            justifyContent={'end'}
            gap={2}
            width={'100%'}
          >
            <CancelButton onClick={() => navigate(-1)} />
            <CreateButton onClick={handleSubmit(onSubmit)} />
          </Stack>
        </Stack>
        <Box sx={{ width: `calc(100% - ${ROLE_FORM_WIDTH}px)` }}>
          <PrivilegeBox
            defaultNavigation={navigation}
            defaultPrivilege={privilege}
            onChangeNavigation={handleChangeNavigation}
            onChangePrivilege={handleChangePrivilege}
          />
        </Box>
      </Stack>
    </form>
  )
}

export default form
