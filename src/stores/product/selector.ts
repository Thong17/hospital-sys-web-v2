import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectProductCreate = createSelector(
    (state: RootState) => state.product.create,
    (state) => state
)

export const selectProductList = createSelector(
    (state: RootState) => state.product.list,
    (state) => state
)

export const selectProductForm = createSelector(
    (state: RootState) => state.product.form,
    (state) => state
)

export const selectProductDetail = createSelector(
    (state: RootState) => state.product.detail,
    (state) => state
)

export const selectProductHistory = createSelector(
    (state: RootState) => state.product.history,
    (state) => state
)

export const selectProductExport = createSelector(
    (state: RootState) => state.product.export,
    (state) => state
)

export const selectProductValidate = createSelector(
    (state: RootState) => state.product.validate,
    (state) => state
)

export const selectProductImport = createSelector(
    (state: RootState) => state.product.import,
    (state) => state
)
