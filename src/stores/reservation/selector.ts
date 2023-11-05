import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectReservationCreate = createSelector(
    (state: RootState) => state.reservation.create,
    (state) => state
)

export const selectReservationList = createSelector(
    (state: RootState) => state.reservation.list,
    (state) => state
)

export const selectReservationForm = createSelector(
    (state: RootState) => state.reservation.form,
    (state) => state
)

export const selectReservationDetail = createSelector(
    (state: RootState) => state.reservation.detail,
    (state) => state
)

export const selectReservationHistory = createSelector(
    (state: RootState) => state.reservation.history,
    (state) => state
)

export const selectReservationExport = createSelector(
    (state: RootState) => state.reservation.export,
    (state) => state
)

export const selectReservationValidate = createSelector(
    (state: RootState) => state.reservation.validate,
    (state) => state
)

export const selectReservationImport = createSelector(
    (state: RootState) => state.reservation.import,
    (state) => state
)
