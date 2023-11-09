import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const initRole = {
  name: {},
  status: false,
  description: undefined,
  privilege: {},
  navigation: {},
}

export const roleSchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  status: yup.boolean(),
  description: yup.string().optional(),
  privilege: yup.mixed().optional(),
  navigation: yup.mixed().optional(),
})

export const ROLE_FORM_WIDTH = 500