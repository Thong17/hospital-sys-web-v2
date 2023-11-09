import { createSlice } from "@reduxjs/toolkit";
import { getPatientCreate, getPatientDelete, getPatientDetail, getPatientExport, getPatientHistory, getPatientImport, getPatientList, getPatientRecord, getPatientUpdate, getPatientValidate } from "./action";
import { TypeStatus } from "stores/constant";

interface IPatient {
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
    record: {
        status: TypeStatus
        data: any,
        error: any,
        metaData: {
            skip: number,
            limit: number,
            total: number,
        }
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

const initialState: IPatient = {
    form: { isLoading: false },
    create: { isLoading: false, data: null, error: null },
    update: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    export: { isLoading: false, data: null, error: null },
    validate: { isLoading: false, data: null, error: null },
    import: { isLoading: false, data: null, error: null },
    detail: { status: 'INIT', data: null, error: null },
    history: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
    record: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPatientCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getPatientCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getPatientCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getPatientDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getPatientDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getPatientDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getPatientList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getPatientList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getPatientList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getPatientDetail.pending, (state) => {
            state.detail.status = 'PENDING'
        })
        builder.addCase(getPatientDetail.rejected, (state, action) => {
            state.detail.status = 'FAILED'
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getPatientDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.status = 'COMPLETED'
            state.detail.data = action.payload?.data
        })

        // Record
        builder.addCase(getPatientRecord.pending, (state) => {
            state.record.status = 'PENDING'
        })
        builder.addCase(getPatientRecord.rejected, (state, action) => {
            state.record.status = 'FAILED'
            state.record.error = action.payload?.response?.data
        })
        builder.addCase(getPatientRecord.fulfilled, (state, action) => {
            state.record.error = null
            state.record.status = 'COMPLETED'
            state.record.data = action.payload?.data
        })

        // History
        builder.addCase(getPatientHistory.pending, (state) => {
            state.history.status = 'PENDING'
        })
        builder.addCase(getPatientHistory.rejected, (state, action) => {
            state.history.status = 'FAILED'
            state.history.error = action.payload?.response?.data
        })
        builder.addCase(getPatientHistory.fulfilled, (state, action) => {
            state.history.error = null
            state.history.status = 'COMPLETED'
            state.history.data = action.payload?.data
        })

        // Update
        builder.addCase(getPatientUpdate.pending, (state) => {
            state.update.isLoading = true
        })
        builder.addCase(getPatientUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getPatientUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.update.data = action.payload?.data
        })

        // Export
        builder.addCase(getPatientExport.pending, (state) => {
            state.export.isLoading = true
        })
        builder.addCase(getPatientExport.rejected, (state, action) => {
            state.export.isLoading = false
            state.export.error = action.payload?.response?.data
        })
        builder.addCase(getPatientExport.fulfilled, (state, action) => {
            state.export.error = null
            state.export.isLoading = false
            state.export.data = action.payload?.data
        })

        // Validate
        builder.addCase(getPatientValidate.pending, (state) => {
            state.validate.isLoading = true
        })
        builder.addCase(getPatientValidate.rejected, (state, action) => {
            state.validate.isLoading = false
            state.validate.error = action.payload?.response?.data
        })
        builder.addCase(getPatientValidate.fulfilled, (state, action) => {
            state.validate.error = null
            state.validate.isLoading = false
            state.validate.data = action.payload?.data
        })

        // Import
        builder.addCase(getPatientImport.pending, (state) => {
            state.import.isLoading = true
        })
        builder.addCase(getPatientImport.rejected, (state, action) => {
            state.import.isLoading = false
            state.import.error = action.payload?.response?.data
        })
        builder.addCase(getPatientImport.fulfilled, (state, action) => {
            state.import.error = null
            state.import.isLoading = false
            state.import.data = action.payload?.data
        })
    },
})

export const { actions: patientAction, reducer: patientReducer } = patientSlice