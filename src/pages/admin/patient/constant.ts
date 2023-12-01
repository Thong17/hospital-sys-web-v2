import * as yup from 'yup'

export const initPatient = {
  fullName: '',
  gender: '',
  email: '',
  contact: '',
  dateOfBirth: '',
  status: true,
  description: '',
}

export const createPatientSchema = yup.object().shape({
  fullName: yup.string().optional(),
  gender: yup.string().optional(),
  email: yup.string().optional(),
  contact: yup.string().required('PLEASE_SELECT_THE_CONTACT'),
  dateOfBirth: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const updatePatientSchema = yup.object().shape({
  fullName: yup.string().optional(),
  gender: yup.string().optional(),
  email: yup.string().optional(),
  contact: yup.string().required('PLEASE_SELECT_THE_CONTACT'),
  dateOfBirth: yup.string().optional(),
  status: yup.boolean(),
  description: yup.string().optional(),
})

export const PATIENT_FORM_WIDTH = 500