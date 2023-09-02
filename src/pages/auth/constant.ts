import * as yup from 'yup'

export const LOGIN_FORM_WIDTH = '450px'
export const loginSchema = yup.object().shape({
    username: yup.string().required('Please fill the username'),
    password: yup.string().required('Please fill the password')
  })