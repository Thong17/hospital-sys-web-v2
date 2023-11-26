import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectReportSale = createSelector(
    (state: RootState) => state.report.sale,
    (state) => state
)