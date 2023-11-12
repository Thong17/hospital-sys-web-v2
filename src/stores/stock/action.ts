import { createAsyncThunk } from "@reduxjs/toolkit";
import { StockService } from "services/stock";
import { serviceWrapper } from "utils/index";

const service = new StockService()

export const getStockCreate: any = createAsyncThunk(
    'stock/create',
    serviceWrapper(service.create)
)

export const getStockUpdate: any = createAsyncThunk(
    'stock/update',
    serviceWrapper(service.update)
)

export const getStockDelete: any = createAsyncThunk(
    'stock/delete',
    serviceWrapper(service.delete)
)

export const getStockList: any = createAsyncThunk(
    'stock/list',
    serviceWrapper(service.list)
)

export const getStockDetail: any = createAsyncThunk(
    'stock/detail',
    serviceWrapper(service.detail)
)

export const getStockHistory: any = createAsyncThunk(
    'stock/history',
    serviceWrapper(service.history)
)