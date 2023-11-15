import { createSlice } from "@reduxjs/toolkit";
import { getStockCreate, getStockDelete, getStockDetail, getStockHistory, getStockList, getStockUpdate } from "./action";
import { TypeStatus } from "stores/constant";

interface IStock {
    form: {
        isLoading: boolean
    }
    create: {
        isLoading: boolean,
        data: any,
        error: any
    }
    update: {
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
    detail: {
        status: TypeStatus
        data: any,
        error: any
    }
    history: {
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

const initialState: IStock = {
    form: { isLoading: false },
    create: { isLoading: false, data: null, error: null },
    update: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    detail: { status: 'INIT', data: null, error: null },
    history: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getStockCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getStockCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getStockCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getStockDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getStockDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getStockDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getStockList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getStockList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getStockList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getStockDetail.pending, (state) => {
            state.detail.status = 'PENDING'
        })
        builder.addCase(getStockDetail.rejected, (state, action) => {
            state.detail.status = 'FAILED'
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getStockDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.status = 'COMPLETED'
            state.detail.data = action.payload?.data
        })

        // History
        builder.addCase(getStockHistory.pending, (state) => {
            state.history.status = 'PENDING'
        })
        builder.addCase(getStockHistory.rejected, (state, action) => {
            state.history.status = 'FAILED'
            state.history.error = action.payload?.response?.data
        })
        builder.addCase(getStockHistory.fulfilled, (state, action) => {
            state.history.error = null
            state.history.status = 'COMPLETED'
            state.history.data = action.payload?.data
        })

        // Update
        builder.addCase(getStockUpdate.pending, (state) => {
            state.update.isLoading = true
        })
        builder.addCase(getStockUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getStockUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.update.data = action.payload?.data
        })
    },
})

export const { actions: stockAction, reducer: stockReducer } = stockSlice