import axios from 'configs/axios'
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
}