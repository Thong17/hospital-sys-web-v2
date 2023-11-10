import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "services/product";
import { serviceWrapper } from "utils/index";

const service = new ProductService()

export const getProductCreate: any = createAsyncThunk(
    'product/create',
    serviceWrapper(service.create)
)

export const getProductUpdate: any = createAsyncThunk(
    'product/update',
    serviceWrapper(service.update)
)

export const getProductDelete: any = createAsyncThunk(
    'product/delete',
    serviceWrapper(service.delete)
)

export const getProductList: any = createAsyncThunk(
    'product/list',
    serviceWrapper(service.list)
)

export const getProductDetail: any = createAsyncThunk(
    'product/detail',
    serviceWrapper(service.detail)
)

export const getProductHistory: any = createAsyncThunk(
    'product/history',
    serviceWrapper(service.history)
)

export const getProductExport: any = createAsyncThunk(
    'product/export',
    serviceWrapper(service._export)
)

export const getProductValidate: any = createAsyncThunk(
    'product/validate',
    serviceWrapper(service._validate)
)

export const getProductImport: any = createAsyncThunk(
    'product/import',
    serviceWrapper(service._import)
)