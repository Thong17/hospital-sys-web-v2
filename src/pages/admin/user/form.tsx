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
import { USER_FORM_WIDTH, createUserSchema, updateUserSchema } from './constant'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getUserCreate, getUserUpdate } from 'stores/user/action'
import { selectUserCreate } from 'stores/user/selector'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'
import PrivilegeContainer from 'components/shared/containers/PrivilegeContainer'
import { selectRoleList } from 'stores/role/selector'
import { getRoleList } from 'stores/role/action'
import useLanguage from 'hooks/useLanguage'
import SelectInput from 'components/shared/forms/SelectInput'
import Loading from 'components/shared/Loading'
import { FORM_GAP } from 'constants/layout'
import { SEGMENTS } from 'constants/options'

export interface IUserForm {
  username: string
  password: string
  segment: string
  role: string
  status: boolean
  description: string
}

const form = ({ defaultValues }: { defaultValues: IUserForm }) => {
  const { id } = useParams()
  const { width } = useDevice()
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectUserCreate)
  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: id ? yupResolver(updateUserSchema) : yupResolver(createUserSchema),
    defaultValues,
  })
  const { data, status } = useAppSelector(selectRoleList)
  const [selectedRole, setSelectedRole] = useState({
    privilege: {},
    navigation: {},
  })

  useEffect(() => {
    const value = watch('role')
    if (!value) return
    const role = data?.find((item: any) => item?._id === value)
    setSelectedRole({
      privilege: role?.privilege ?? {},
      navigation: role?.navigation ?? {},
    })
    return () => {
      setSelectedRole({ privilege: {}, navigation: {} })
    }
  }, [watch('role'), data])

  useEffect(() => {
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getRoleList({ params }))
  }, [])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<any> = (data) => {
    if (id) return dispatch(getUserUpdate({ id, data }))
    dispatch(getUserCreate(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={width > TABLET_WIDTH ? 'row' : 'column'} gap={4} pt={5}>
        <Box sx={{ position: 'sticky', top: 20, height: '500px' }}>
          <Box
            sx={{
              width: width > TABLET_WIDTH ? USER_FORM_WIDTH : '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: FORM_GAP,
              gridTemplateAreas: `
                              'username username role'
                              'segment password password'
                              'description description description'
                              'status status status'
                              'action action action'
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
            {status !== 'COMPLETED' ? (
              <Loading sx={{ gridArea: 'role' }} />
            ) : (
              <SelectInput
                {...register('role')}
                options={data?.map((item: any) => mapRoleOption(item, lang))}
                defaultValue={''}
                value={watch('role')}
                error={!!errors.role?.message}
                helperText={errors.role?.message}
                label={translate('ROLE')}
                sx={{ gridArea: 'role' }}
                required
              />
            )}
            <SelectInput
              {...register('segment')}
              options={SEGMENTS}
              defaultValue={''}
              value={watch('segment')}
              error={!!errors.segment?.message}
              helperText={errors.segment?.message}
              label={translate('SEGMENT')}
              sx={{ gridArea: 'segment' }}
              required
            />
            <TextInput
              {...register('password')}
              label={id ? translate('RESET_PASSWORD') : translate('PASSWORD')}
              error={!!errors.password?.message}
              helperText={errors.password?.message as ReactNode}
              type='password'
              required={!id}
              sx={{ gridArea: 'password' }}
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
        </Box>
        <Box
          sx={{
            width:
              width > TABLET_WIDTH
                ? `calc(100% - ${USER_FORM_WIDTH}px)`
                : '100%',
          }}
        >
          <PrivilegeContainer
            navigation={selectedRole?.navigation}
            privilege={selectedRole?.privilege}
          />
        </Box>
      </Stack>
    </form>
  )
}

const mapRoleOption = (data: any, lang: any) => {
  return {
    value: data?._id,
    label: data?.name?.[lang] ?? data?.name?.['English'],
  }
}

export default form
