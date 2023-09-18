import AuthGuard from 'auth/AuthGuard'
import NotFound from 'components/shared/NotFound'
import { Role } from 'pages/admin'
import { Login, Register } from 'pages/auth'
import Home from 'pages/home/Home'
import { RouteObject } from 'react-router'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <AuthGuard><Home /></AuthGuard>,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/admin',
        children: [
            {
                path: 'role',
                element: (
                    <AuthGuard role={{ route: 'role', action: 'view' }}>
                        <Role />
                    </AuthGuard>
                ),
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]

export default routes
