import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectAuthLogin = createSelector(
    (state: RootState) => state.auth.login,
    (state) => state
)