import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectReportSale = createSelector(
    (state: RootState) => state.report.sale,
    (state) => state
)

export const selectReportProduct = createSelector(
    (state: RootState) => state.report.product,
    (state) => state
)

export const selectReportTransaction = createSelector(
    (state: RootState) => state.report.transaction,
    (state) => state
)