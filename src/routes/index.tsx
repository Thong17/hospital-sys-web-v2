import AuthGuard from 'auth/AuthGuard'
import NotFound from 'components/shared/NotFound'
import { Admin, Doctor, DoctorCreate, DoctorDetail, DoctorHistory, DoctorUpdate, Patient, PatientCreate, PatientDetail, PatientHistory, PatientUpdate, Role, RoleCreate, RoleDetail, RoleHistory, RoleUpdate, UserCreate, UserDetail, UserHistory, UserUpdate } from 'pages/admin'
import User from 'pages/admin/user'
import { Login, Register } from 'pages/auth'
import Home from 'pages/home/Home'
import { Operation, Reservation, ReservationCreate, ReservationDetail, ReservationHistory, ReservationUpdate } from 'pages/operation'
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

            // Patient
            {
                path: 'patient',
                element: (
                    <AuthGuard>
                        <Patient />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/create',
                element: (
                    <AuthGuard>
                        <PatientCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/update/:id',
                element: (
                    <AuthGuard>
                        <PatientUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/detail/:id',
                element: (
                    <AuthGuard>
                        <PatientDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/detail/:id/history',
                element: (
                    <AuthGuard>
                        <PatientHistory />
                    </AuthGuard>
                ),
            },
        ],
    },
    {
        path: '/operation',
        element: <Operation />,
        children: [
            {
                path: 'reservation',
                element: (
                    <AuthGuard>
                        <Reservation />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/create',
                element: (
                    <AuthGuard>
                        <ReservationCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/update/:id',
                element: (
                    <AuthGuard>
                        <ReservationUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/detail/:id',
                element: (
                    <AuthGuard>
                        <ReservationDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/detail/:id/history',
                element: (
                    <AuthGuard>
                        <ReservationHistory />
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
