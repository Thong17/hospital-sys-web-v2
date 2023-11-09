import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class AuthService {
    async login(data: { username: string, password: string }) {
        try {
            const response = await axios.post('/auth/login', data)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async register(data: { username: string, password: string, segment: string }) {
        try {
            const response = await axios.post('/auth/register', data)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async profile() {
        try {
            const response = await axios.get('/auth/profile')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}