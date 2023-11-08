import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const initPatientHistory = {
  name: {},
  description: '',
}

export const createPatientHistorySchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  description: yup.string().optional(),
})

export const updatePatientHistorySchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  description: yup.string().optional(),
})

export const RESERVATION_FORM_WIDTH = 570