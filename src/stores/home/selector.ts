import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectHomeContent = createSelector(
    (state: RootState) => state.home.content,
    (state) => state
)