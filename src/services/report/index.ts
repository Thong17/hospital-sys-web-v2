import axios from 'configs/axios'
import { notify } from 'contexts/notify/NotifyContext'

export class ReportService {
    async sale({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/report/sale', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}