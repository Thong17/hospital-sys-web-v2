import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectSession = createSelector(
    (state: RootState) => state.session,
    (state) => state
)