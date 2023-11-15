import AuthGuard from 'auth/AuthGuard'
import NotFound from 'components/shared/NotFound'
import { Admin, Doctor, DoctorCreate, DoctorDetail, DoctorHistory, DoctorUpdate, Patient, PatientCreate, PatientDetail, PatientHistory, PatientUpdate, Role, RoleCreate, RoleDetail, RoleHistory, RoleUpdate, UserCreate, UserDetail, UserHistory, UserUpdate } from 'pages/admin'
import PatientRecord from 'pages/admin/patient/record'
import User from 'pages/admin/user'
import { Login, Register } from 'pages/auth'
import Home from 'pages/home/Home'
import { Operation, Reservation, ReservationCreate, ReservationDetail, ReservationHistory, ReservationUpdate, Schedule, ScheduleDetail } from 'pages/operation'
import { Product, ProductCreate, ProductDetail, ProductHistory, ProductStock, ProductUpdate } from 'pages/organize'
import { Payment, PaymentDetail, PointOfSale, Sale } from 'pages/pos'
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
            // ? MENU: Role
            {
                path: 'role',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'role', action: 'list' }}>
                        <Role />
                    </AuthGuard>
                ),
            },
            {
                path: 'role/create',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'role', action: 'create' }}>
                        <RoleCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'role/update/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'role', action: 'update' }}>
                        <RoleUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'role/detail/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'role', action: 'detail' }}>
                        <RoleDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'role/detail/:id/history',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'role', action: 'detail' }}>
                        <RoleHistory />
                    </AuthGuard>
                ),
            },
            // ? MENU: User
            {
                path: 'user',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'user', action: 'list' }}>
                        <User />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/create',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'user', action: 'create' }}>
                        <UserCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/update/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'user', action: 'update' }}>
                        <UserUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/detail/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'user', action: 'detail' }}>
                        <UserDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'user/detail/:id/history',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'user', action: 'detail' }}>
                        <UserHistory />
                    </AuthGuard>
                ),
            },
            
            // ? Menu: Doctor
            {
                path: 'doctor',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'doctor', action: 'list' }}>
                        <Doctor />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/create',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'doctor', action: 'create' }}>
                        <DoctorCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/update/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'doctor', action: 'update' }}>
                        <DoctorUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/detail/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'doctor', action: 'detail' }}>
                        <DoctorDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'doctor/detail/:id/history',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'doctor', action: 'detail' }}>
                        <DoctorHistory />
                    </AuthGuard>
                ),
            },

            // ? MENU: Patient
            {
                path: 'patient',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'patient', action: 'list' }}>
                        <Patient />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/create',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'patient', action: 'create' }}>
                        <PatientCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/update/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'patient', action: 'update' }}>
                        <PatientUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/detail/:id',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'patient', action: 'detail' }}>
                        <PatientDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/detail/:id/history',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'patient', action: 'detail' }}>
                        <PatientHistory />
                    </AuthGuard>
                ),
            },
            {
                path: 'patient/detail/:id/record',
                element: (
                    <AuthGuard role={{ menu: 'admin', route: 'patient', action: 'detail' }}>
                        <PatientRecord />
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
                    <AuthGuard role={{ menu: 'operation', route: 'reservation', action: 'list' }}>
                        <Reservation />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/create',
                element: (
                    <AuthGuard role={{ menu: 'operation', route: 'reservation', action: 'create' }}>
                        <ReservationCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/update/:id',
                element: (
                    <AuthGuard role={{ menu: 'operation', route: 'reservation', action: 'update' }}>
                        <ReservationUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/detail/:id',
                element: (
                    <AuthGuard role={{ menu: 'operation', route: 'reservation', action: 'detail' }}>
                        <ReservationDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'reservation/detail/:id/history',
                element: (
                    <AuthGuard role={{ menu: 'operation', route: 'reservation', action: 'detail' }}>
                        <ReservationHistory />
                    </AuthGuard>
                ),
            },
            // ? MENU: Schedule
            {
                path: 'schedule',
                element: (
                    <AuthGuard role={{ menu: 'operation', route: 'schedule', action: 'list' }}>
                        <Schedule />
                    </AuthGuard>
                ),
            },
            {
                path: 'schedule/:id',
                element: (
                    <AuthGuard role={{ menu: 'operation', route: 'schedule', action: 'detail' }}>
                        <ScheduleDetail />
                    </AuthGuard>
                ),
            },
        ],
    },
    {
        path: '/organize',
        element: <Operation />,
        children: [
            {
                path: 'product',
                element: (
                    <AuthGuard role={{ menu: 'organize', route: 'product', action: 'list' }}>
                        <Product />
                    </AuthGuard>
                ),
            },
            {
                path: 'product/create',
                element: (
                    <AuthGuard role={{ menu: 'organize', route: 'product', action: 'create' }}>
                        <ProductCreate />
                    </AuthGuard>
                ),
            },
            {
                path: 'product/update/:id',
                element: (
                    <AuthGuard role={{ menu: 'organize', route: 'product', action: 'update' }}>
                        <ProductUpdate />
                    </AuthGuard>
                ),
            },
            {
                path: 'product/detail/:id',
                element: (
                    <AuthGuard role={{ menu: 'organize', route: 'product', action: 'detail' }}>
                        <ProductDetail />
                    </AuthGuard>
                ),
            },
            {
                path: 'product/stock/:id',
                element: (
                    <AuthGuard role={{ menu: 'organize', route: 'product', action: 'stock' }}>
                        <ProductStock />
                    </AuthGuard>
                ),
            },
            {
                path: 'product/detail/:id/history',
                element: (
                    <AuthGuard role={{ menu: 'organize', route: 'product', action: 'detail' }}>
                        <ProductHistory />
                    </AuthGuard>
                ),
            },
        ],
    },
    {
        path: '/pos',
        element: <PointOfSale />,
        children: [
            {
                path: 'sale',
                element: (
                    <AuthGuard role={{ menu: 'pos', route: 'sale', action: 'list' }}>
                        <Sale />
                    </AuthGuard>
                ),
            },
            {
                path: 'payment',
                element: (
                    <AuthGuard role={{ menu: 'pos', route: 'payment', action: 'list' }}>
                        <Payment />
                    </AuthGuard>
                ),
            },
            {
                path: 'payment/:id',
                element: (
                    <AuthGuard role={{ menu: 'pos', route: 'payment', action: 'detail' }}>
                        <PaymentDetail />
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
