import * as yup from 'yup'

export const initPatient = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  contact: '',
  dateOfBirth: '',
  status: false,
  description: '',
}

export const createPatientSchema = yup.object().shape({
  firstName: yup.string().min(2).required('PLEASE_FILL_THE_FIRST_NAME'),
  lastName: yup.string().min(2).required('PLEASE_FILL_THE_LAST_NAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  email: yup.string().optional(),
  contact: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const updatePatientSchema = yup.object().shape({
  firstName: yup.string().min(2).required('PLEASE_FILL_THE_FIRST_NAME'),
  lastName: yup.string().min(2).required('PLEASE_FILL_THE_LAST_NAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  email: yup.string().optional(),
  contact: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const PATIENT_FORM_WIDTH = 500