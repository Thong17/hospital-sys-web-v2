import { createSlice } from "@reduxjs/toolkit";
import { getDoctorCreate, getDoctorDelete, getDoctorDetail, getDoctorExport, getDoctorHistory, getDoctorImport, getDoctorList, getDoctorUpdate, getDoctorValidate } from "./action";
import { TypeStatus } from "stores/constant";

interface IDoctor {
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

const initialState: IDoctor = {
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

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getDoctorCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getDoctorCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getDoctorDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getDoctorDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getDoctorList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getDoctorList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getDoctorDetail.pending, (state) => {
            state.detail.status = 'PENDING'
        })
        builder.addCase(getDoctorDetail.rejected, (state, action) => {
            state.detail.status = 'FAILED'
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.status = 'COMPLETED'
            state.detail.data = action.payload?.data
        })

        // History
        builder.addCase(getDoctorHistory.pending, (state) => {
            state.history.status = 'PENDING'
        })
        builder.addCase(getDoctorHistory.rejected, (state, action) => {
            state.history.status = 'FAILED'
            state.history.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorHistory.fulfilled, (state, action) => {
            state.history.error = null
            state.history.status = 'COMPLETED'
            state.history.data = action.payload?.data
        })

        // Update
        builder.addCase(getDoctorUpdate.pending, (state) => {
            state.update.isLoading = true
        })
        builder.addCase(getDoctorUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.update.data = action.payload?.data
        })

        // Export
        builder.addCase(getDoctorExport.pending, (state) => {
            state.export.isLoading = true
        })
        builder.addCase(getDoctorExport.rejected, (state, action) => {
            state.export.isLoading = false
            state.export.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorExport.fulfilled, (state, action) => {
            state.export.error = null
            state.export.isLoading = false
            state.export.data = action.payload?.data
        })

        // Validate
        builder.addCase(getDoctorValidate.pending, (state) => {
            state.validate.isLoading = true
        })
        builder.addCase(getDoctorValidate.rejected, (state, action) => {
            state.validate.isLoading = false
            state.validate.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorValidate.fulfilled, (state, action) => {
            state.validate.error = null
            state.validate.isLoading = false
            state.validate.data = action.payload?.data
        })

        // Import
        builder.addCase(getDoctorImport.pending, (state) => {
            state.import.isLoading = true
        })
        builder.addCase(getDoctorImport.rejected, (state, action) => {
            state.import.isLoading = false
            state.import.error = action.payload?.response?.data
        })
        builder.addCase(getDoctorImport.fulfilled, (state, action) => {
            state.import.error = null
            state.import.isLoading = false
            state.import.data = action.payload?.data
        })
    },
})

export const { actions: doctorAction, reducer: doctorReducer } = doctorSlice