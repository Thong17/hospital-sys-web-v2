import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectUserCreate = createSelector(
    (state: RootState) => state.user.create,
    (state) => state
)

export const selectUserList = createSelector(
    (state: RootState) => state.user.list,
    (state) => state
)

export const selectUserForm = createSelector(
    (state: RootState) => state.user.form,
    (state) => state
)

export const selectUserDetail = createSelector(
    (state: RootState) => state.user.detail,
    (state) => state
)

export const selectUserInfo = createSelector(
    (state: RootState) => state.user.info,
    (state) => state
)

export const selectUserHistory = createSelector(
    (state: RootState) => state.user.history,
    (state) => state
)

export const selectUserExport = createSelector(
    (state: RootState) => state.user.export,
    (state) => state
)

export const selectUserValidate = createSelector(
    (state: RootState) => state.user.validate,
    (state) => state
)

export const selectUserImport = createSelector(
    (state: RootState) => state.user.import,
    (state) => state
)
