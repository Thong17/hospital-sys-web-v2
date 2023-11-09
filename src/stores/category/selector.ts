import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectCategoryCreate = createSelector(
    (state: RootState) => state.category.create,
    (state) => state
)

export const selectCategoryList = createSelector(
    (state: RootState) => state.category.list,
    (state) => state
)
