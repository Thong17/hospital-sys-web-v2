import { createSlice } from "@reduxjs/toolkit";
import { getRoleCreate, getRoleDelete, getRoleDetail, getRoleList, getRoleUpdate } from "./action";

interface IRole {
    form: {
        isProcessing: boolean
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
        isLoading: boolean,
        data: any,
        error: any,
        metaData: {
            skip: number,
            limit: number,
            total: number,
        }
    }
    detail: {
        isLoading: boolean,
        data: any,
        error: any
    }
}

const initialState: IRole = {
    form: { isProcessing: false },
    create: { isLoading: false, data: null, error: null },
    update: { isLoading: false, data: null, error: null },
    detail: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    list: { isLoading: false, data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRoleCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isProcessing = true
        })
        builder.addCase(getRoleCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isProcessing = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getRoleCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isProcessing = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getRoleDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isProcessing = true
        })
        builder.addCase(getRoleDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isProcessing = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getRoleDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isProcessing = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getRoleList.pending, (state) => {
            state.list.isLoading = true
        })
        builder.addCase(getRoleList.rejected, (state, action) => {
            state.list.isLoading = false
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getRoleList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.isLoading = false
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getRoleDetail.pending, (state) => {
            state.detail.isLoading = true
        })
        builder.addCase(getRoleDetail.rejected, (state, action) => {
            state.detail.isLoading = false
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getRoleDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.isLoading = false
            state.detail.data = action.payload?.data
        })

        // Update
        builder.addCase(getRoleUpdate.pending, (state) => {
            state.update.isLoading = true
        })
        builder.addCase(getRoleUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getRoleUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.update.data = action.payload?.data
        })
    },
})

export const { actions: roleAction, reducer: roleReducer } = roleSlice