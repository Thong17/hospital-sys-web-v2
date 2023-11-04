import { createSlice } from "@reduxjs/toolkit";
import { TypeStatus } from "stores/constant";
import { getExchangeRateCreate, getExchangeRateDelete, getExchangeRateList } from "./action";

interface IExchangeRate {
    form: {
        isLoading: boolean
    }
    create: {
        isLoading: boolean,
        data: any,
        error: any
    }
    delete: {
        isLoading: boolean,
        data: any,
        error: any
    }
    list: {
        status: TypeStatus
        data: any,
        error: any,
        metaData: {
            skip: number,
            limit: number,
            total: number,
        }
    }
}

const initialState: IExchangeRate = {
    form: { isLoading: false },
    create: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const exchangeRateSlice = createSlice({
    name: 'exchangeRate',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getExchangeRateCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getExchangeRateCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getExchangeRateCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getExchangeRateDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getExchangeRateDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getExchangeRateDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getExchangeRateList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getExchangeRateList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getExchangeRateList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })
    },
})

export const { actions: exchangeRateAction, reducer: exchangeRateReducer } = exchangeRateSlice