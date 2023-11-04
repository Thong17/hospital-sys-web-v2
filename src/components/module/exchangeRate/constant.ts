import * as yup from 'yup'

export const initExchangeRate = {
  value: 0,
  currency: '',
  description: '',
}

export const exchangeRateSchema = yup.object().shape({
  value: yup.number().required('PLEASE_FILL_THE_VALUE'),
  currency: yup.string().required('PLEASE_SELECT_THE_CURRENCY'),
  description: yup.string().optional(),
})
