import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectDoctorCreate = createSelector(
    (state: RootState) => state.doctor.create,
    (state) => state
)

export const selectDoctorList = createSelector(
    (state: RootState) => state.doctor.list,
    (state) => state
)

export const selectDoctorForm = createSelector(
    (state: RootState) => state.doctor.form,
    (state) => state
)

export const selectDoctorDetail = createSelector(
    (state: RootState) => state.doctor.detail,
    (state) => state
)

export const selectDoctorHistory = createSelector(
    (state: RootState) => state.doctor.history,
    (state) => state
)

export const selectDoctorExport = createSelector(
    (state: RootState) => state.doctor.export,
    (state) => state
)

export const selectDoctorValidate = createSelector(
    (state: RootState) => state.doctor.validate,
    (state) => state
)

export const selectDoctorImport = createSelector(
    (state: RootState) => state.doctor.import,
    (state) => state
)
