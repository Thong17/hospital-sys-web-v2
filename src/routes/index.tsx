import AuthGuard from 'auth/AuthGuard'
import NotFound from 'components/shared/NotFound'
import { Admin, Doctor, DoctorCreate, DoctorDetail, DoctorHistory, DoctorUpdate, Role, RoleCreate, RoleDetail, RoleHistory, RoleUpdate, UserCreate, UserDetail, UserHistory, UserUpdate } from 'pages/admin'
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
            },
            {
                path: 'role/create',
                element: (
                    <AuthGuard>
                        <RoleCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'role/update/:id',
                element: (
                    <AuthGuard>
                        <RoleUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'role/detail/:id',
                element: (
                    <AuthGuard>
                        <RoleDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'role/detail/:id/history',
                element: (
                    <AuthGuard>
                        <RoleHistory />
                    </AuthGuard>
                ),
            },
            // User
            {
                path: 'user',
                element: (
                    <AuthGuard>
                        <User />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/create',
                element: (
                    <AuthGuard>
                        <UserCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/update/:id',
                element: (
                    <AuthGuard>
                        <UserUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/detail/:id',
                element: (
                    <AuthGuard>
                        <UserDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/detail/:id/history',
                element: (
                    <AuthGuard>
                        <UserHistory />
                    </AuthGuard>
                ),
            },
            // Doctor
            {
                path: 'doctor',
                element: (
                    <AuthGuard>
                        <Doctor />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/create',
                element: (
                    <AuthGuard>
                        <DoctorCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/update/:id',
                element: (
                    <AuthGuard>
                        <DoctorUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/detail/:id',
                element: (
                    <AuthGuard>
                        <DoctorDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/detail/:id/history',
                element: (
                    <AuthGuard>
                        <DoctorHistory />
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
