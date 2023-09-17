import { Box, Button, TextField, Select, Typography, FormControl, InputLabel, MenuItem } from '@mui/material'
import { LOGIN_FORM_WIDTH, SEGMENTS, registerSchema } from './constant'
import BACKGROUND from 'assets/backgrounds/login_background.jpg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useLanguage from 'hooks/useLanguage'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getAuthRegister } from 'stores/auth/action'
import { selectAuthRegister } from 'stores/auth/selector'
import { useEffect } from 'react'

const defaultValues = { segment: 'GENERAL', username: 'Thong', password: '123' }

const Register = () => {
  const dispatch = useAppDispatch()
  const { language } = useLanguage()
  const { formState: { errors }, register, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues
  })
  const data = useAppSelector(selectAuthRegister)

  useEffect(() => {
    console.log(data)
  }, [data])
  
  const submit = (data: any) => {
    dispatch(getAuthRegister(data))
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box
        sx={{
          width: `calc(100% - ${LOGIN_FORM_WIDTH})`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <img src={BACKGROUND} style={{ width: '80%' }} alt='background' />
      </Box>
      <Box
        component={'form'}
        onSubmit={handleSubmit(submit)}
        sx={{
          width: LOGIN_FORM_WIDTH,
          backgroundColor: '#00000011',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '0 50px',
          boxSizing: 'border-box'
        }}
      >
        <Typography variant='h4' color={'#000'} marginBottom={2}>{language.REGISTER_TITLE}</Typography>
        <Typography variant='caption' color={'#000'} marginBottom={2}>{language.REGISTER_DESCRIPTION}</Typography>
        <FormControl sx={{ m: 1 }} fullWidth>
          <TextField
            label={language.USERNAME}
            type='text'
            error={!!errors.username?.message}
            helperText={errors.username?.message}
            {...register('username')}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth>
          <TextField
            label={language.PASSWORD}
            type='password'
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id='segment'>{language.SEGMENT}</InputLabel>
          <Select
            labelId='segment'
            defaultValue={defaultValues.segment || ''}
            label={language.SEGMENT}
            {...register('segment')}
          >
            {SEGMENTS.map((option, key) => <MenuItem key={key} value={option.value}>{option.label}</MenuItem>)}
          </Select>
        </FormControl>
        <Box>
          <Button type='submit'>{language.REGISTER_BUTTON}</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Register
