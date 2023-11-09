import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectSpecialtyCreate = createSelector(
    (state: RootState) => state.specialty.create,
    (state) => state
)

export const selectSpecialtyList = createSelector(
    (state: RootState) => state.specialty.list,
    (state) => state
)
