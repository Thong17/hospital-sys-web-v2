import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectStockCreate = createSelector(
    (state: RootState) => state.stock.create,
    (state) => state
)

export const selectStockList = createSelector(
    (state: RootState) => state.stock.list,
    (state) => state
)

export const selectStockForm = createSelector(
    (state: RootState) => state.stock.form,
    (state) => state
)

export const selectStockDetail = createSelector(
    (state: RootState) => state.stock.detail,
    (state) => state
)

export const selectStockHistory = createSelector(
    (state: RootState) => state.stock.history,
    (state) => state
)
