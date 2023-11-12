import { translate } from 'contexts/language/LanguageContext'
import * as yup from 'yup'

export const initProduct = {
  name: {},
  price: 0,
  currency: '',
  category: '',
  symptoms: [],
  code: '',
  isStock: false,
  status: false,
  images: [],
  description: '',
}

export const initProductStock = {
  cost: 0,
  currency: '',
  quantity: 0,
  alertAt: 0,
  expireAt: '',
  code: '',
  note: '',
}

export const createProductSchema = yup.object().shape({
  name: yup.object({
    English: yup.string().required(translate('NAME_IS_REQUIRED') as string),
  }),
  price: yup.number().required('PRICE_FILL_THE_VALUE'),
  currency: yup.string().required('PLEASE_SELECT_THE_CURRENCY'),
  category: yup.string().required(),
  symptoms: yup.array(),
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
  symptoms: yup.array(),
  code: yup.string().optional(),
  isStock: yup.boolean(),
  status: yup.boolean(),
  images: yup.mixed().optional(),
  description: yup.string().optional(),
})

export const stockProductSchema = yup.object().shape({
  cost: yup.number().required('COST_FILL_THE_VALUE'),
  currency: yup.string().required('PLEASE_SELECT_THE_CURRENCY'),
  quantity: yup.number().required('QUANTITY_FILL_THE_VALUE'),
  alertAt: yup.number().optional(),
  expireAt: yup.string().optional(),
  code: yup.string().optional(),
  note: yup.string().optional(),
})

export const PRODUCT_FORM_WIDTH = 500