import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class ExchangeRateService {
    async create(data: any) {
        try {
            const response = await axios.post('/organize/exchange-rate/create', data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async delete({ id, reason }: { id: String, reason: String }) {
        try {
            const response = await axios.delete(`/organize/exchange-rate/delete/${id}?reason=${reason}`)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async list({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/organize/exchange-rate/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}