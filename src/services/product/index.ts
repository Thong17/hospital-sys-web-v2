import axios from 'configs/axios'
import { languages } from 'contexts/language/constant'
import { notify } from 'contexts/notify/NotifyContext'
import { convertToFormData } from 'utils/index'

export class ProductService {
    async create(data: any) {
        try {
            const body = convertToFormData(data)
            const response = await axios.post('/organize/product/create', body, { headers: { 'Content-Type': 'multipart/form-data' } })
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async update({ id, data }: { id: String, data: any }) {
        try {
            const response = await axios.put(`/organize/product/update/${id}`, data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async delete({ id, reason }: { id: String, reason: String }) {
        try {
            const response = await axios.delete(`/organize/product/delete/${id}?reason=${reason}`)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async detail({ id }: { id: String }) {
        try {
            const response = await axios.get(`/organize/product/detail/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async history({ id }: { id: String }) {
        try {
            const response = await axios.get(`/organize/product/history/${id}`)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async list({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.get('/organize/product/list', { params })
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _export({ params }: { params?: URLSearchParams }) {
        try {
            const response = await axios.post('/organize/product/export', { languages: Object.keys(languages) }, { params } )
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _validate({ file }: { file: Blob }) {
        try {
            const formData = new FormData()
            formData.append('excel', file)
            const response = await axios.post('/organize/product/validate', formData)
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
    async _import({ data }: { data: any }) {
        try {
            const response = await axios.post('/organize/product/import', data)
            notify(response?.data?.message, 'success')
            return response
        } catch (error: any) {
            console.error(error)
            notify(error?.response?.data?.message, 'error')
            throw error
        }
    }
}