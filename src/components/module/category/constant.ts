import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const initCategory = {
  name: {},
  description: '',
}

export const categorySchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  description: yup.string().optional(),
})
