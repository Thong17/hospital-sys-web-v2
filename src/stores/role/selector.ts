import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectRoleCreate = createSelector(
    (state: RootState) => state.role.create,
    (state) => state
)

export const selectRoleList = createSelector(
    (state: RootState) => state.role.list,
    (state) => state
)

export const selectRoleForm = createSelector(
    (state: RootState) => state.role.form,
    (state) => state
)

export const selectRoleDetail = createSelector(
    (state: RootState) => state.role.detail,
    (state) => state
)

export const selectRoleHistory = createSelector(
    (state: RootState) => state.role.history,
    (state) => state
)

export const selectRoleExport = createSelector(
    (state: RootState) => state.role.export,
    (state) => state
)

export const selectRoleValidate = createSelector(
    (state: RootState) => state.role.validate,
    (state) => state
)

export const selectRoleImport = createSelector(
    (state: RootState) => state.role.import,
    (state) => state
)
