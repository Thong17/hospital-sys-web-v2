import { createSlice } from "@reduxjs/toolkit";
import { TypeStatus } from "stores/constant";
import { getTransactionCreate, getTransactionDelete, getTransactionList, getTransactionUpdate } from "./action";

interface ITransaction {
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
}

const initialState: ITransaction = {
    form: { isLoading: false },
    create: { isLoading: false, data: null, error: null },
    update: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTransactionCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getTransactionCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getTransactionCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Update
        builder.addCase(getTransactionUpdate.pending, (state) => {
            state.update.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getTransactionUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.form.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getTransactionUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.form.isLoading = false
            state.update.data = action.payload
        })

        // Delete
        builder.addCase(getTransactionDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getTransactionDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getTransactionDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getTransactionList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getTransactionList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getTransactionList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })
    },
})

export const { actions: transactionAction, reducer: transactionReducer } = transactionSlice