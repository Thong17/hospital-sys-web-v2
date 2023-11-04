import axios from 'configs/axios'
import { languages } from 'contexts/language/constant'
import { notify } from 'contexts/notify/NotifyContext'

export class DoctorService {
    async create(data: { name: Object, status: boolean, description: String, navigation: Object, privilege: Object }) {
        try {
            const response = await axios.post('/admin/doctor/create', data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async update({ id, data }: { id: String, data: { name: Object, status: boolean, description: String, navigation: Object, privilege: Object } }) {
        try {
            const response = await axios.put(`/admin/doctor/update/${id}`, data)
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
            const response = await axios.delete(`/admin/doctor/delete/${id}?reason=${reason}`)
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
            const response = await axios.get(`/admin/doctor/detail/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async history({ id }: { id: String }) {
        try {
            const response = await axios.get(`/admin/doctor/history/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async list({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/admin/doctor/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _export({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.post('/admin/doctor/export', { languages: Object.keys(languages) }, { params } )
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _validate({ file }: { file: Blob }) {
        try {
            const formData = new FormData()
            formData.append('excel', file)
            const response = await axios.post('/admin/doctor/validate', formData)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _import({ data }: { data: any }) {
        try {
            const response = await axios.post('/admin/doctor/import', data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}