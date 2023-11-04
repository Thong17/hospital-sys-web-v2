import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectExchangeRateCreate = createSelector(
    (state: RootState) => state.exchangeRate.create,
    (state) => state
)

export const selectExchangeRateList = createSelector(
    (state: RootState) => state.exchangeRate.list,
    (state) => state
)
