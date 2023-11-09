import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectConfig = createSelector(
    (state: RootState) => state.config,
    (state) => state
)