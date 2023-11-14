import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class PaymentService {
    async create(data: { name: Object, status: boolean, description: String, navigation: Object, privilege: Object }) {
        try {
            const response = await axios.post('/operation/payment/create', data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async update({ id, data }: { id: String, data: any }) {
        try {
            const response = await axios.put(`/operation/payment/update/${id}`, data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async appendTransaction({ id, data }: { id: String, data: any }) {
        try {
            const response = await axios.put(`/operation/payment/transaction/append/${id}`, data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async removeTransaction({ id, transactionId, reason }: { id: String, transactionId: any, reason: string }) {
        try {
            const response = await axios.put(`/operation/payment/transaction/remove/${id}`, { transactionId, reason })
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async accept({ id, reason }: { id: String, reason: String }) {
        try {
            const response = await axios.post(`/operation/payment/accept/${id}`, { note: reason })
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async refuse({ id, reason }: { id: String, reason: String }) {
        try {
            const response = await axios.post(`/operation/payment/refuse/${id}`, { note: reason })
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
            const response = await axios.delete(`/operation/payment/delete/${id}?reason=${reason}`)
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
            const response = await axios.get(`/operation/payment/detail/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async history({ id }: { id: String }) {
        try {
            const response = await axios.get(`/operation/payment/history/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async list({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/operation/payment/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}