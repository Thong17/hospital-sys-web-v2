import { createSlice } from "@reduxjs/toolkit";
import { getReservationAccept, getReservationCreate, getReservationDelete, getReservationDetail, getReservationExport, getReservationHistory, getReservationImport, getReservationList, getReservationRefuse, getReservationUpdate, getReservationValidate } from "./action";
import { TypeStatus } from "stores/constant";

interface IReservation {
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
        records: any[],
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

const initialState: IReservation = {
    form: { isLoading: false },
    create: { isLoading: false, data: null, error: null },
    update: { isLoading: false, data: null, error: null },
    delete: { isLoading: false, data: null, error: null },
    export: { isLoading: false, data: null, error: null },
    validate: { isLoading: false, data: null, error: null },
    import: { isLoading: false, data: null, error: null },
    detail: { status: 'INIT', data: null, records: [], error: null },
    history: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getReservationCreate.pending, (state) => {
            state.create.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getReservationCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getReservationCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.form.isLoading = false
            state.create.data = action.payload
        })

        // Delete
        builder.addCase(getReservationDelete.pending, (state) => {
            state.delete.isLoading = true
            state.form.isLoading = true
        })
        builder.addCase(getReservationDelete.rejected, (state, action) => {
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.error = action.payload?.response?.data
        })
        builder.addCase(getReservationDelete.fulfilled, (state, action) => {
            state.delete.error = null
            state.delete.isLoading = false
            state.form.isLoading = false
            state.delete.data = action.payload
        })

        // List
        builder.addCase(getReservationList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getReservationList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getReservationList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getReservationDetail.pending, (state) => {
            state.detail.status = 'PENDING'
        })
        builder.addCase(getReservationDetail.rejected, (state, action) => {
            state.detail.status = 'FAILED'
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getReservationDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.status = 'COMPLETED'
            state.detail.data = action.payload?.data
            state.detail.records = action.payload?.records
        })

        // History
        builder.addCase(getReservationHistory.pending, (state) => {
            state.history.status = 'PENDING'
        })
        builder.addCase(getReservationHistory.rejected, (state, action) => {
            state.history.status = 'FAILED'
            state.history.error = action.payload?.response?.data
        })
        builder.addCase(getReservationHistory.fulfilled, (state, action) => {
            state.history.error = null
            state.history.status = 'COMPLETED'
            state.history.data = action.payload?.data
        })

        // Update
        builder.addCase(getReservationUpdate.pending, (state) => {
            state.update.isLoading = true
        })
        builder.addCase(getReservationUpdate.rejected, (state, action) => {
            state.update.isLoading = false
            state.update.error = action.payload?.response?.data
        })
        builder.addCase(getReservationUpdate.fulfilled, (state, action) => {
            state.update.error = null
            state.update.isLoading = false
            state.update.data = action.payload?.data
        })

        // Reject
        builder.addCase(getReservationRefuse.pending, (state) => {
            state.form.isLoading = true
        })
        builder.addCase(getReservationRefuse.rejected, (state) => {
            state.form.isLoading = false
        })
        builder.addCase(getReservationRefuse.fulfilled, (state) => {
            state.form.isLoading = false
        })

        // Accept
        builder.addCase(getReservationAccept.pending, (state) => {
            state.form.isLoading = true
        })
        builder.addCase(getReservationAccept.rejected, (state) => {
            state.form.isLoading = false
        })
        builder.addCase(getReservationAccept.fulfilled, (state) => {
            state.form.isLoading = false
        })

        // Export
        builder.addCase(getReservationExport.pending, (state) => {
            state.export.isLoading = true
        })
        builder.addCase(getReservationExport.rejected, (state, action) => {
            state.export.isLoading = false
            state.export.error = action.payload?.response?.data
        })
        builder.addCase(getReservationExport.fulfilled, (state, action) => {
            state.export.error = null
            state.export.isLoading = false
            state.export.data = action.payload?.data
        })

        // Validate
        builder.addCase(getReservationValidate.pending, (state) => {
            state.validate.isLoading = true
        })
        builder.addCase(getReservationValidate.rejected, (state, action) => {
            state.validate.isLoading = false
            state.validate.error = action.payload?.response?.data
        })
        builder.addCase(getReservationValidate.fulfilled, (state, action) => {
            state.validate.error = null
            state.validate.isLoading = false
            state.validate.data = action.payload?.data
        })

        // Import
        builder.addCase(getReservationImport.pending, (state) => {
            state.import.isLoading = true
        })
        builder.addCase(getReservationImport.rejected, (state, action) => {
            state.import.isLoading = false
            state.import.error = action.payload?.response?.data
        })
        builder.addCase(getReservationImport.fulfilled, (state, action) => {
            state.import.error = null
            state.import.isLoading = false
            state.import.data = action.payload?.data
        })
    },
})

export const { actions: reservationAction, reducer: reservationReducer } = reservationSlice