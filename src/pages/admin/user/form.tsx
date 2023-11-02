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
import { USER_FORM_WIDTH, userSchema } from './constant'
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getUserCreate, getUserUpdate } from 'stores/user/action'
import { selectUserCreate } from 'stores/user/selector'
import useDevice from 'hooks/useDevice'
import { TABLET_WIDTH } from 'contexts/web/constant'
import PrivilegeContainer from 'components/shared/containers/PrivilegeContainer'
import { selectRoleList } from 'stores/role/selector'
import { getRoleList } from 'stores/role/action'
import useLanguage from 'hooks/useLanguage'
import { SelectInput } from 'components/shared/forms/SelectInput'

export interface IUserForm {
  username: string
  password: string
  segment: string
  role: string
  email: string
  contact: string
  status: boolean
  description: string
}

const form = ({ defaultValues }: { defaultValues: IUserForm }) => {
  const { id } = useParams()
  const { width } = useDevice()
  const { lang, language } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectUserCreate)
  const { reset, watch, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  })
  const { data } = useAppSelector(selectRoleList)

  useEffect(() => {
    const params = new URLSearchParams()
    params.append('limit', '0')
    dispatch(getRoleList({ params }))
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit: SubmitHandler<any> = (data) => {
    if (id) return dispatch(getUserUpdate({ id, data }))
    dispatch(getUserCreate(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={width > TABLET_WIDTH ? 'row' : 'column'} gap={4}>
        <Stack
          direction={'column'}
          alignItems={'start'}
          gap={1}
          sx={{ width: width > TABLET_WIDTH ? USER_FORM_WIDTH : '100%' }}
        >
          <Stack direction={'row'}>
            <TextInput
              {...register('username')}
              label={translate('USERNAME')}
              error={!!errors.username?.message}
              helperText={errors.username?.message}
            />
            <FormControl fullWidth>
              <InputLabel id='role'>{language.ROLE}</InputLabel>
              <SelectInput {...register('role')} defaultValue={''}>
                {data?.map((item: any, key: number) => (
                  <MapMenuItem data={item} lang={lang} key={key} />
                ))}
              </SelectInput>
            </FormControl>
            
          </Stack>
          <TextInput
            {...register('description')}
            label={translate('DESCRIPTION')}
            multiline
          />
          <FormControlLabel
            control={
              <Checkbox {...register('status')} checked={watch('status')} />
            }
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
        <Box
          sx={{
            width:
              width > TABLET_WIDTH
                ? `calc(100% - ${USER_FORM_WIDTH}px)`
                : '100%',
          }}
        >
          <PrivilegeContainer
            navigation={data?.navigation}
            privilege={data?.privilege}
          />
        </Box>
      </Stack>
    </form>
  )
}

const MapMenuItem = ({ data, lang }: any) => {
  return (
    <MenuItem value={data?._id}>
      {data?.name?.[lang] ?? data?.name?.['English']}
    </MenuItem>
  )
}

export default form
