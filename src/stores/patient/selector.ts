import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectPatientCreate = createSelector(
    (state: RootState) => state.patient.create,
    (state) => state
)

export const selectPatientList = createSelector(
    (state: RootState) => state.patient.list,
    (state) => state
)

export const selectPatientForm = createSelector(
    (state: RootState) => state.patient.form,
    (state) => state
)

export const selectPatientDetail = createSelector(
    (state: RootState) => state.patient.detail,
    (state) => state
)

export const selectPatientHistory = createSelector(
    (state: RootState) => state.patient.history,
    (state) => state
)

export const selectPatientExport = createSelector(
    (state: RootState) => state.patient.export,
    (state) => state
)

export const selectPatientValidate = createSelector(
    (state: RootState) => state.patient.validate,
    (state) => state
)

export const selectPatientImport = createSelector(
    (state: RootState) => state.patient.import,
    (state) => state
)
