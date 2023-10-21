import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectRolePermission = createSelector(
    (state: RootState) => state.role.permission,
    (state) => state
)