import axios from 'configs/axios'

export class AuthService {
    async login(data: { username: string, password: string }) {
        try {
            const response = await axios.post('/auth/login', data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
}