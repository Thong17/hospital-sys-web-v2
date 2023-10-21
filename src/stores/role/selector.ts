import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectRoleCreate = createSelector(
    (state: RootState) => state.role.create,
    (state) => state
)

