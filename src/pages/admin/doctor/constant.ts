import * as yup from 'yup'

export const initDoctor = {
  fullName: '',
  gender: '',
  email: '',
  contact: '',
  specialties: [],
  shift: [],
  dateOfBirth: '',
  startTime: '',
  endTime: '',
  status: true,
  description: '',
}

export const createDoctorSchema = yup.object().shape({
  fullName: yup.string().optional(),
  gender: yup.string().optional(),
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
  gender: yup.string().optional(),
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