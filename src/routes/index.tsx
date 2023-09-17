import AuthGuard from 'auth/AuthGuard'
import NotFound from 'components/shared/NotFound'
import Login from 'pages/auth/Login'
import Register from 'pages/auth/Register'
import Home from 'pages/home/Home'
import { RouteObject } from 'react-router'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <AuthGuard role={{ route: 'home', action: 'detail' }}><Home /></AuthGuard>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '*',
        element: <NotFound />,
    },
]

export default routes