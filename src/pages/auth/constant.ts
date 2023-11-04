import * as yup from 'yup'

export const LOGIN_FORM_WIDTH = '450px'
export const loginSchema = yup.object().shape({
    username: yup.string().required('Please fill the username'),
    password: yup.string().required('Please fill the password'),
})

export const registerSchema = yup.object().shape({
    username: yup.string().min(3).required('Please fill the username'),
    password: yup.string().min(7).required('Please fill the password'),
    segment: yup.string().required('Please fill the segment'),
})

export const SEGMENTS = [
    { value: 'GENERAL', label: 'GENERAL' },
    { value: 'DOCTOR', label: 'DOCTOR' },
    { value: 'PATIENT', label: 'PATIENT' },
]

export const GENDERS = [
    { value: 'MALE', label: 'MALE' },
    { value: 'FEMALE', label: 'FEMALE' },
]
