import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionService } from "services/transaction";
import { serviceWrapper } from "utils/index";

const service = new TransactionService()

export const getTransactionCreate: any = createAsyncThunk(
    'transaction/create',
    serviceWrapper(service.create)
)

export const getTransactionUpdate: any = createAsyncThunk(
    'transaction/update',
    serviceWrapper(service.update)
)

export const getTransactionDelete: any = createAsyncThunk(
    'transaction/delete',
    serviceWrapper(service.delete)
)

export const getTransactionList: any = createAsyncThunk(
    'transaction/list',
    serviceWrapper(service.list)
)