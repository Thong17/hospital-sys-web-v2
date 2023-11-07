import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class ScheduleService {
    async start({ id }: { id: String }) {
        try {
            const response = await axios.post(`/operation/schedule/start/${id}`)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async end({ id }: { id: String }) {
        try {
            const response = await axios.post(`/operation/schedule/end/${id}`)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async detail({ id }: { id: String }) {
        try {
            const response = await axios.get(`/operation/schedule/detail/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async list({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/operation/schedule/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}