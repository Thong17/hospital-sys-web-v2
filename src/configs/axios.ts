import axios, { AxiosError, AxiosResponse } from 'axios'
import { generateHash } from 'utils'

const Axios = axios.create({ baseURL: import.meta.env.REACT_APP_API_URL })

Axios.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem('x-access-token')
  const ts = Date.now().toString()
  const hash = await generateHash(ts, token || '', config.data)
  config.headers!.Hash = hash
  if (token) config.headers!.Authorization = `Bearer ${token}`
  return config
})

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default Axios
