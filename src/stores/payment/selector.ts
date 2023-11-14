import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectPaymentCreate = createSelector(
    (state: RootState) => state.payment.create,
    (state) => state
)

export const selectPaymentList = createSelector(
    (state: RootState) => state.payment.list,
    (state) => state
)

export const selectPaymentForm = createSelector(
    (state: RootState) => state.payment.form,
    (state) => state
)

export const selectPaymentDetail = createSelector(
    (state: RootState) => state.payment.detail,
    (state) => state
)

export const selectPaymentHistory = createSelector(
    (state: RootState) => state.payment.history,
    (state) => state
)