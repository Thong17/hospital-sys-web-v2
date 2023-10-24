import { yupResolver } from '@hookform/resolvers/yup'
import {
  CancelButton,
  CreateButton,
  UpdateButton,
} from 'components/shared/buttons/CustomButton'
import { Checkbox } from 'components/shared/forms/Checkbox'
import { LocaleInput } from 'components/shared/forms/LocaleInput'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { ROLE_FORM_WIDTH, roleSchema } from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import PrivilegeBox from 'components/shared/forms/PrivilegeBox'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getRoleCreate, getRoleUpdate } from 'stores/role/action'
import { selectRoleCreate } from 'stores/role/selector'

export interface IRoleForm {
  name: any
  status: boolean
  description: string | undefined
  privilege?: any
  navigation?: any
}

const form = ({ defaultValues }: { defaultValues: IRoleForm }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectRoleCreate)
  const {
    reset,
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(roleSchema), defaultValues })
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

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<IRoleForm> = (data) => {
    if (id) return dispatch(getRoleUpdate({ id, data }))
    dispatch(getRoleCreate(data))
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
            defaultValue={getValues('name')}
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
