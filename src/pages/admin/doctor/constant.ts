import * as yup from 'yup'

export const initDoctor = {
  fullName: '',
  username: '',
  gender: '',
  email: '',
  contact: '',
  specialties: [],
  shift: [],
  dateOfBirth: '',
  startTime: '',
  endTime: '',
  status: false,
  description: '',
}

export const createDoctorSchema = yup.object().shape({
  fullName: yup.string().optional(),
  username: yup.string().min(2).required('PLEASE_FILL_THE_USERNAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  specialties: yup.array().optional(),
  shift: yup.array().optional(),
  email: yup.string().optional(),
  contact: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  startTime: yup.string().optional(),
  endTime: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const updateDoctorSchema = yup.object().shape({
  fullName: yup.string().optional(),
  username: yup.string().min(2).required('PLEASE_FILL_THE_USERNAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  specialties: yup.array().optional(),
  shift: yup.array().optional(),
  email: yup.string().optional(),
  contact: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  startTime: yup.string().optional(),
  endTime: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const DOCTOR_FORM_WIDTH = 500