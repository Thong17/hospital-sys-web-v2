import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExchangeRateService } from "services/exchangeRate";
import { serviceWrapper } from "utils/index";

const service = new ExchangeRateService()

export const getExchangeRateCreate: any = createAsyncThunk(
    'exchangeRate/create',
    serviceWrapper(service.create)
)

export const getExchangeRateDelete: any = createAsyncThunk(
    'exchangeRate/delete',
    serviceWrapper(service.delete)
)

export const getExchangeRateList: any = createAsyncThunk(
    'exchangeRate/list',
    serviceWrapper(service.list)
)