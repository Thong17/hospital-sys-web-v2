import * as yup from 'yup'

export const initReservation = {
  category: '',
  patient: '',
  appointmentDate: '',
  specialties: [],
  doctors: [],
  status: false,
  note: '',
}

export const createReservationSchema = yup.object().shape({
  appointmentDate: yup.string().required(),
  category: yup.string().required('PLEASE_SELECT_THE_CATEGORY'),
  patient: yup.string().required('PLEASE_SELECT_THE_PATIENT'),
  doctors: yup.array().optional(),
  specialties: yup.array().optional(),
  status: yup.boolean(),
  note: yup.string().optional(),
})

export const updateReservationSchema = yup.object().shape({
  appointmentDate: yup.string().optional(),
  category: yup.string().required('PLEASE_SELECT_THE_CATEGORY'),
  patient: yup.string().required('PLEASE_SELECT_THE_PATIENT'),
  doctors: yup.array().optional(),
  specialties: yup.array().optional(),
  status: yup.boolean(),
  note: yup.string().optional(),
})

export const RESERVATION_FORM_WIDTH = 500