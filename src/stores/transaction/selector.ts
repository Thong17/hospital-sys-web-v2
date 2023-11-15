import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectTransactionCreate = createSelector(
    (state: RootState) => state.transaction.create,
    (state) => state
)

export const selectTransactionList = createSelector(
    (state: RootState) => state.transaction.list,
    (state) => state
)
