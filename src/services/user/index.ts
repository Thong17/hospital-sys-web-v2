import axios from 'configs/axios'
import { languages } from 'contexts/language/constant'
import { notify } from 'contexts/notify/NotifyContext'

export class UserService {
    async create(data: { name: Object, status: boolean, description: String, navigation: Object, privilege: Object }) {
        try {
            const response = await axios.post('/admin/user/create', data)
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
            const response = await axios.put(`/admin/user/update/${id}`, data)
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
            const response = await axios.delete(`/admin/user/delete/${id}?reason=${reason}`)
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
            const response = await axios.get(`/admin/user/detail/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async info({ id }: { id: String }) {
        try {
            const response = await axios.get(`/admin/user/info/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async history({ id }: { id: String }) {
        try {
            const response = await axios.get(`/admin/user/history/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async list({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/admin/user/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _export({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.post('/admin/user/export', { languages: Object.keys(languages) }, { params } )
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
            const response = await axios.post('/admin/user/validate', formData)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _import({ data }: { data: any }) {
        try {
            const response = await axios.post('/admin/user/import', data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}