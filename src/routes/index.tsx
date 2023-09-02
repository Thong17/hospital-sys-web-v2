import Login from 'pages/auth/Login'
import Home from 'pages/home/Home'
import { RouteObject } from 'react-router'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    }
]

export default routes