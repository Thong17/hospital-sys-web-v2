import * as yup from 'yup'

export const initPatient = {
  fullName: '',
  username: '',
  gender: '',
  email: '',
  contact: '',
  dateOfBirth: '',
  status: false,
  description: '',
}

export const createPatientSchema = yup.object().shape({
  fullName: yup.string().optional(),
  username: yup.string().min(2).required('PLEASE_FILL_THE_USERNAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  email: yup.string().optional(),
  contact: yup.string().required('PLEASE_SELECT_THE_CONTACT'),
  dateOfBirth: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const updatePatientSchema = yup.object().shape({
  fullName: yup.string().optional(),
  username: yup.string().min(2).required('PLEASE_FILL_THE_USERNAME'),
  gender: yup.string().required('PLEASE_SELECT_THE_GENDER'),
  email: yup.string().optional(),
  contact: yup.string().required('PLEASE_SELECT_THE_CONTACT'),
  dateOfBirth: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const PATIENT_FORM_WIDTH = 500