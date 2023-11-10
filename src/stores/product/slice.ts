import { createSlice } from "@reduxjs/toolkit";
import { getProductCreate, getProductDelete, getProductDetail, getProductExport, getProductHistory, getProductImport, getProductList, getProductUpdate, getProductValidate } from "./action";
import { TypeStatus } from "stores/constant";

interface IProduct {
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

const initialState: IProduct = {
    form: { isLoading: false },
    create: { isLoading: false, data: null, error: null },
    update: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    export: { isLoading: false, data: null, error: null },
    validate: { isLoading: false, data: null, error: null },
    import: { isLoading: false, data: null, error: null },
    detail: { status: 'INIT', data: null, error: null },
    history: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProductCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getProductCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getProductCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getProductDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getProductDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getProductDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getProductList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getProductList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getProductList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getProductDetail.pending, (state) => {
            state.detail.status = 'PENDING'
        })
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.detail.status = 'FAILED'
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.status = 'COMPLETED'
            state.detail.data = action.payload?.data
        })

        // History
        builder.addCase(getProductHistory.pending, (state) => {
            state.history.status = 'PENDING'
        })
        builder.addCase(getProductHistory.rejected, (state, action) => {
            state.history.status = 'FAILED'
            state.history.error = action.payload?.response?.data
        })
        builder.addCase(getProductHistory.fulfilled, (state, action) => {
            state.history.error = null
            state.history.status = 'COMPLETED'
            state.history.data = action.payload?.data
        })

        // Update
        builder.addCase(getProductUpdate.pending, (state) => {
            state.update.isLoading = true
        })
        builder.addCase(getProductUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getProductUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.update.data = action.payload?.data
        })

        // Export
        builder.addCase(getProductExport.pending, (state) => {
            state.export.isLoading = true
        })
        builder.addCase(getProductExport.rejected, (state, action) => {
            state.export.isLoading = false
            state.export.error = action.payload?.response?.data
        })
        builder.addCase(getProductExport.fulfilled, (state, action) => {
            state.export.error = null
            state.export.isLoading = false
            state.export.data = action.payload?.data
        })

        // Validate
        builder.addCase(getProductValidate.pending, (state) => {
            state.validate.isLoading = true
        })
        builder.addCase(getProductValidate.rejected, (state, action) => {
            state.validate.isLoading = false
            state.validate.error = action.payload?.response?.data
        })
        builder.addCase(getProductValidate.fulfilled, (state, action) => {
            state.validate.error = null
            state.validate.isLoading = false
            state.validate.data = action.payload?.data
        })

        // Import
        builder.addCase(getProductImport.pending, (state) => {
            state.import.isLoading = true
        })
        builder.addCase(getProductImport.rejected, (state, action) => {
            state.import.isLoading = false
            state.import.error = action.payload?.response?.data
        })
        builder.addCase(getProductImport.fulfilled, (state, action) => {
            state.import.error = null
            state.import.isLoading = false
            state.import.data = action.payload?.data
        })
    },
})

export const { actions: productAction, reducer: productReducer } = productSlice