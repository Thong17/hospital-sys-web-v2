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
}