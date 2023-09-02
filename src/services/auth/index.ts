export class AuthService {
    login({ username, password }: { username: string, password: string }) {
        console.log(username, password)
    }
}