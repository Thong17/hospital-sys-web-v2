import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const roleSchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  status: yup.boolean().optional(),
  description: yup.string().optional(),
  privilege: yup.object().optional(),
  navigation: yup.object().optional(),
})
