import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const initProduct = {
  name: {},
  price: 0,
  currency: '',
  category: '',
  symptom: '',
  code: '',
  isStock: false,
  status: false,
  images: [],
  description: '',
}

export const createProductSchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  price: yup.number().required('PRICE_FILL_THE_VALUE'),
  currency: yup.string().required('PLEASE_SELECT_THE_CURRENCY'),
  category: yup.string().required(),
  symptom: yup.string().required(),
  code: yup.string().optional(),
  isStock: yup.boolean(),
  status: yup.boolean(),
  images: yup.mixed().optional(),
  description: yup.string().optional(),
})

export const updateProductSchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  price: yup.number().required('PRICE_FILL_THE_VALUE'),
  currency: yup.string().required('PLEASE_SELECT_THE_CURRENCY'),
  category: yup.string().required(),
  symptom: yup.string().required(),
  code: yup.string().optional(),
  isStock: yup.boolean(),
  status: yup.boolean(),
  images: yup.mixed().optional(),
  description: yup.string().optional(),
})

export const PRODUCT_FORM_WIDTH = 500