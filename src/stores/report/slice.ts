import { createSlice } from "@reduxjs/toolkit";
import { getReportSale } from "./action";

interface IReport {
    sale: {
        isLoading: boolean,
        data: any,
        error: any
    }
}

const initialState: IReport = {
    sale: { isLoading: false, data: null, error: null },
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getReportSale.pending, (state) => {
            state.sale.isLoading = true
        })
        builder.addCase(getReportSale.rejected, (state, action) => {
            state.sale.isLoading = false
            state.sale.error = action.payload?.response?.data
        })
        builder.addCase(getReportSale.fulfilled, (state, action) => {
            state.sale.error = null
            state.sale.isLoading = false
            state.sale.data = action.payload
        })
    },
})

export const { actions: reportAction, reducer: reportReducer } = reportSlice