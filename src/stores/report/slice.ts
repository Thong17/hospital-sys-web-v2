import { createSlice } from "@reduxjs/toolkit";
import { getReportProduct, getReportSale, getReportTransaction } from "./action";

interface IReport {
    sale: {
        isLoading: boolean,
        data: any,
        error: any
    }
    product: {
        isLoading: boolean,
        data: any,
        error: any
    }
    transactions: {
        isLoading: boolean,
        data: any[],
        error: any
    }
}

const initialState: IReport = {
    sale: { isLoading: false, data: null, error: null },
    product: { isLoading: false, data: null, error: null },
    transactions: { isLoading: false, data: [], error: null },
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

        builder.addCase(getReportProduct.pending, (state) => {
            state.product.isLoading = true
        })
        builder.addCase(getReportProduct.rejected, (state, action) => {
            state.product.isLoading = false
            state.product.error = action.payload?.response?.data
        })
        builder.addCase(getReportProduct.fulfilled, (state, action) => {
            state.product.error = null
            state.product.isLoading = false
            state.product.data = action.payload
        })

        builder.addCase(getReportTransaction.pending, (state) => {
            state.transactions.isLoading = true
        })
        builder.addCase(getReportTransaction.rejected, (state, action) => {
            state.transactions.isLoading = false
            state.transactions.error = action.payload?.response?.data
        })
        builder.addCase(getReportTransaction.fulfilled, (state, action) => {
            state.transactions.error = null
            state.transactions.isLoading = false
            state.transactions.data = action.payload
        })
    },
})

export const { actions: reportAction, reducer: reportReducer } = reportSlice