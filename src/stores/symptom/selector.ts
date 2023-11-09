import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectSymptomCreate = createSelector(
    (state: RootState) => state.symptom.create,
    (state) => state
)

export const selectSymptomList = createSelector(
    (state: RootState) => state.symptom.list,
    (state) => state
)
