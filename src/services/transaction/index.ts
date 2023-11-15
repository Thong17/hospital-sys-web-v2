import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class TransactionService {
    async create(data: any) {
        try {
            const response = await axios.post('/operation/transaction/create', data)
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
            const response = await axios.put(`/operation/transaction/update/${id}`, data)
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
            const response = await axios.delete(`/operation/transaction/delete/${id}?reason=${reason}`)
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
            const response = await axios.get('/operation/transaction/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}