import axios, { AxiosError, AxiosResponse } from 'axios'
import { generateHash } from 'utils'

const Axios = axios.create({ baseURL: import.meta.env.VITE_API_URL })

Axios.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem('token')
  const timestamp = Date.now().toString()
  const hash = await generateHash(timestamp, token || '', config.data)
  config.headers!.Hash = hash
  config.headers!.timestamp = timestamp
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
