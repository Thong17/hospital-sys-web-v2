import axios from 'configs/axios'
import { languages } from 'contexts/language/constant'
import { notify } from 'contexts/notify/NotifyContext'

export class RoleService {
    async getPermission() {
        try {
            const response = await axios.get('/admin/role/getPermission')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async getPermissionShape() {
        try {
            const response = await axios.get('/admin/role/getPrePermission')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async create(data: { name: Object, status: boolean, description: String, navigation: Object, privilege: Object }) {
        try {
            const response = await axios.post('/admin/role/create', data)
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
            const response = await axios.put(`/admin/role/update/${id}`, data)
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
            const response = await axios.delete(`/admin/role/delete/${id}?reason=${reason}`)
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
            const response = await axios.get(`/admin/role/detail/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async history({ id }: { id: String }) {
        try {
            const response = await axios.get(`/admin/role/history/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async list({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/admin/role/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _export({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.post('/admin/role/export', { languages: Object.keys(languages) }, { params } )
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
            const response = await axios.post('/admin/role/validate', formData)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _import({ data }: { data: any }) {
        try {
            const response = await axios.post('/admin/role/import', data)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}