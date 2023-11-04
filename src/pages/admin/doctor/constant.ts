import * as yup from 'yup'

export const initDoctor = {
  firstName: '',
  lastName: '',
  gender: '',
  specialty: [],
  dateOfBirth: '',
  startTime: '',
  endTime: '',
  status: false,
  description: '',
}

export const createDoctorSchema = yup.object().shape({
  firstName: yup.string().min(2).required('PLEASE_FILL_THE_FIRST_NAME'),
  lastName: yup.string().min(2).required('PLEASE_FILL_THE_LAST_NAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  specialty: yup.array().optional(),
  dateOfBirth: yup.string().optional(),
  startTime: yup.string().optional(),
  endTime: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const updateDoctorSchema = yup.object().shape({
  firstName: yup.string().min(2).required('PLEASE_FILL_THE_FIRST_NAME'),
  lastName: yup.string().min(2).required('PLEASE_FILL_THE_LAST_NAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  specialty: yup.array().optional(),
  dateOfBirth: yup.string().optional(),
  startTime: yup.string().optional(),
  endTime: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const DOCTOR_FORM_WIDTH = 500