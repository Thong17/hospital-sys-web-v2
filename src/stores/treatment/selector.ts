import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectTreatmentCreate = createSelector(
    (state: RootState) => state.treatment.create,
    (state) => state
)

export const selectTreatmentList = createSelector(
    (state: RootState) => state.treatment.list,
    (state) => state
)
