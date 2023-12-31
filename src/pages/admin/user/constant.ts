import * as yup from 'yup'

export const initUser = {
  username: '',
  password: '',
  segment: '',
  role: '',
  status: false,
  description: '',
}

export const createUserSchema = yup.object().shape({
  username: yup.string().min(3).required('Please fill the username'),
  password: yup.string().min(7).required('Please fill the password'),
  segment: yup.string().required('Please fill the segment'),
  role: yup.string().required(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const updateUserSchema = yup.object().shape({
  username: yup.string().min(3).required('Please fill the username'),
  password: yup.string().optional(),
  segment: yup.string().required('Please fill the segment'),
  role: yup.string().required(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const USER_FORM_WIDTH = 500