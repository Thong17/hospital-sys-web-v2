import * as yup from 'yup'

export const initUser = {
  username: '',
  password: '',
  segment: '',
  role: '',
  email: '',
  contact: '',
  status: false,
  description: undefined,
}

export const userSchema = yup.object().shape({
  username: yup.string().min(3).required('Please fill the username'),
  password: yup.string().min(7).required('Please fill the password'),
  segment: yup.string().required('Please fill the segment'),
  role: yup.string().required(),
  email: yup.string().required(),
  contact: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const USER_FORM_WIDTH = 500