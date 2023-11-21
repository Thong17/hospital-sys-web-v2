import { createSlice } from "@reduxjs/toolkit";
import { getUserCreate, getUserDelete, getUserDetail, getUserExport, getUserHistory, getUserImport, getUserInfo, getUserList, getUserUpdate, getUserValidate } from "./action";
import { TypeStatus } from "stores/constant";

interface IUser {
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
    export: {
        isLoading: boolean,
        data: any,
        error: any
    }
    validate: {
        isLoading: boolean,
        data: any,
        error: any
    }
    import: {
        isLoading: boolean,
        data: any,
        error: any
    }
    detail: {
        status: TypeStatus
        data: any,
        error: any
    }
    info: {
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

const initialState: IUser = {
    form: { isLoading: false },
    create: { isLoading: false, data: null, error: null },
    update: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    export: { isLoading: false, data: null, error: null },
    validate: { isLoading: false, data: null, error: null },
    import: { isLoading: false, data: null, error: null },
    detail: { status: 'INIT', data: null, error: null },
    info: { status: 'INIT', data: null, error: null },
    history: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getUserCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getUserCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getUserDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getUserDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getUserDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getUserList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getUserList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getUserDetail.pending, (state) => {
            state.detail.status = 'PENDING'
        })
        builder.addCase(getUserDetail.rejected, (state, action) => {
            state.detail.status = 'FAILED'
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getUserDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.status = 'COMPLETED'
            state.detail.data = action.payload?.data
        })

        // Info
        builder.addCase(getUserInfo.pending, (state) => {
            state.info.status = 'PENDING'
        })
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.info.status = 'FAILED'
            state.info.error = action.payload?.response?.data
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.info.error = null
            state.info.status = 'COMPLETED'
            state.info.data = action.payload?.data
        })

        // History
        builder.addCase(getUserHistory.pending, (state) => {
            state.history.status = 'PENDING'
        })
        builder.addCase(getUserHistory.rejected, (state, action) => {
            state.history.status = 'FAILED'
            state.history.error = action.payload?.response?.data
        })
        builder.addCase(getUserHistory.fulfilled, (state, action) => {
            state.history.error = null
            state.history.status = 'COMPLETED'
            state.history.data = action.payload?.data
        })

        // Update
        builder.addCase(getUserUpdate.pending, (state) => {
            state.update.isLoading = true
        })
        builder.addCase(getUserUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getUserUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.update.data = action.payload?.data
        })

        // Export
        builder.addCase(getUserExport.pending, (state) => {
            state.export.isLoading = true
        })
        builder.addCase(getUserExport.rejected, (state, action) => {
            state.export.isLoading = false
            state.export.error = action.payload?.response?.data
        })
        builder.addCase(getUserExport.fulfilled, (state, action) => {
            state.export.error = null
            state.export.isLoading = false
            state.export.data = action.payload?.data
        })

        // Validate
        builder.addCase(getUserValidate.pending, (state) => {
            state.validate.isLoading = true
        })
        builder.addCase(getUserValidate.rejected, (state, action) => {
            state.validate.isLoading = false
            state.validate.error = action.payload?.response?.data
        })
        builder.addCase(getUserValidate.fulfilled, (state, action) => {
            state.validate.error = null
            state.validate.isLoading = false
            state.validate.data = action.payload?.data
        })

        // Import
        builder.addCase(getUserImport.pending, (state) => {
            state.import.isLoading = true
        })
        builder.addCase(getUserImport.rejected, (state, action) => {
            state.import.isLoading = false
            state.import.error = action.payload?.response?.data
        })
        builder.addCase(getUserImport.fulfilled, (state, action) => {
            state.import.error = null
            state.import.isLoading = false
            state.import.data = action.payload?.data
        })
    },
})

export const { actions: userAction, reducer: userReducer } = userSlice