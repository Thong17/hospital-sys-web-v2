import * as yup from 'yup'

export const initPatientHistory = {
  symptoms: [],
  treatments: [],
  medications: [],
  attachments: [],
  diagnose: '',
  condition: '',
  comment: '',
}

export const createPatientHistorySchema = yup.object().shape({
  symptoms: yup.array().optional(),
  treatments: yup.array().optional(),
  medications: yup.array().optional(),
  attachments: yup.array().optional(),
  diagnose: yup.string().optional(),
  condition: yup.string().optional(),
  comment: yup.string().optional(),
})

export const updatePatientHistorySchema = yup.object().shape({
  symptoms: yup.array().optional(),
  treatments: yup.array().optional(),
  medications: yup.array().optional(),
  attachments: yup.array().optional(),
  diagnose: yup.string().optional(),
  condition: yup.string().optional(),
  comment: yup.string().optional(),
})