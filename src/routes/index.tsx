import AuthGuard from 'auth/AuthGuard'
import NotFound from 'components/shared/NotFound'
import { Admin, Role, RoleCreate, RoleUpdate } from 'pages/admin'
import User from 'pages/admin/user'
import { Login, Register } from 'pages/auth'
import Home from 'pages/home/Home'
import { RouteObject } from 'react-router'

const routes: RouteObject[] = [
    {
        path: '/home',
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
        element: <Admin />,
        children: [
            {
                path: 'role',
                element: (
                    <AuthGuard>
                        <Role />
                    </AuthGuard>
                ),
                children: [
                    {
                        path: 'create',
                        element: (
                            <AuthGuard>
                                <RoleCreate />
                            </AuthGuard>
                        ),
                    },
                    {
                        path: 'update/:id',
                        element: (
                            <AuthGuard>
                                <RoleUpdate />
                            </AuthGuard>
                        ),
                    }
                ]
            },
            {
                path: 'user',
                element: (
                    <AuthGuard>
                        <User />
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
