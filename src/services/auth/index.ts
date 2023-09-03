import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class AuthService {
    async login(data: { username: string, password: string }) {
        try {
            const response = await axios.post('/auth/login', data)
            console.log(response)
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
        }
    }
}