import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class HomeService {
    async content() {
        try {
            const response = await axios.get('/home/content')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}