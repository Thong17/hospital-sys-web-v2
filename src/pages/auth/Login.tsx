import { Box, Button, TextField, Typography } from '@mui/material'
import { LOGIN_FORM_WIDTH, loginSchema } from './constant'
import BACKGROUND from 'assets/backgrounds/login_background.jpg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useLanguage from 'hooks/useLanguage'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getAuthLogin } from 'stores/auth/action'
import { selectAuthLogin } from 'stores/auth/selector'
import { useEffect } from 'react'

const Login = () => {
  const dispatch = useAppDispatch()
  const { language } = useLanguage()
  const { formState: { errors }, register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const data = useAppSelector(selectAuthLogin)

  useEffect(() => {
    console.log(data)
  }, [data])
  
  const submit = (data: any) => {
    dispatch(getAuthLogin(data))
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
        <Typography variant='h4' color={'#000'} marginBottom={2}>{language.LOGIN_TITLE}</Typography>
        <Typography variant='caption' color={'#000'} marginBottom={2}>{language.LOGIN_DESCRIPTION}</Typography>
        <TextField
          label={language.USERNAME}
          type='text'
          error={!!errors.username?.message}
          helperText={errors.username?.message}
          style={{ width: '100%', margin: '10px 0' }}
          {...register('username')}
        />
        <TextField
          label={language.PASSWORD}
          type='password'
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          style={{ width: '100%', margin: '10px 0' }}
          {...register('password')}
        />
        <Button type='submit'>{language.LOGIN_BUTTON}</Button>
      </Box>
    </Box>
  )
}

export default Login
