import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const initSpecialty = {
  name: {},
  currency: '',
  description: '',
}

export const specialtySchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  cost: yup.number().required('PLEASE_FILL_THE_NUMBER'),
  currency: yup.string().required('PLEASE_SELECT_THE_CURRENCY'),
  description: yup.string().optional(),
})
