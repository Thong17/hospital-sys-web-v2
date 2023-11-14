import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaymentService } from "services/payment";
import { serviceWrapper } from "utils/index";

const service = new PaymentService()

export const getPaymentCreate: any = createAsyncThunk(
    'payment/create',
    serviceWrapper(service.create)
)

export const getPaymentUpdate: any = createAsyncThunk(
    'payment/update',
    serviceWrapper(service.update)
)

export const getPaymentAppendTransaction: any = createAsyncThunk(
    'payment/appendTransaction',
    serviceWrapper(service.appendTransaction)
)

export const getPaymentRemoveTransaction: any = createAsyncThunk(
    'payment/removeTransaction',
    serviceWrapper(service.removeTransaction)
)

export const getPaymentDelete: any = createAsyncThunk(
    'payment/delete',
    serviceWrapper(service.delete)
)

export const getPaymentList: any = createAsyncThunk(
    'payment/list',
    serviceWrapper(service.list)
)

export const getPaymentDetail: any = createAsyncThunk(
    'payment/detail',
    serviceWrapper(service.detail)
)

export const getPaymentHistory: any = createAsyncThunk(
    'payment/history',
    serviceWrapper(service.history)
)