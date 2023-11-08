import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const initSymptom = {
  name: {},
  description: '',
}

export const symptomSchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  description: yup.string().optional(),
})
