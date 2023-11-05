import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReservationService } from "services/reservation";
import { serviceWrapper } from "utils/index";

const service = new ReservationService()

export const getReservationCreate: any = createAsyncThunk(
    'reservation/create',
    serviceWrapper(service.create)
)

export const getReservationUpdate: any = createAsyncThunk(
    'reservation/update',
    serviceWrapper(service.update)
)

export const getReservationDelete: any = createAsyncThunk(
    'reservation/delete',
    serviceWrapper(service.delete)
)

export const getReservationList: any = createAsyncThunk(
    'reservation/list',
    serviceWrapper(service.list)
)

export const getReservationDetail: any = createAsyncThunk(
    'reservation/detail',
    serviceWrapper(service.detail)
)

export const getReservationHistory: any = createAsyncThunk(
    'reservation/history',
    serviceWrapper(service.history)
)

export const getReservationExport: any = createAsyncThunk(
    'reservation/export',
    serviceWrapper(service._export)
)

export const getReservationValidate: any = createAsyncThunk(
    'reservation/validate',
    serviceWrapper(service._validate)
)

export const getReservationImport: any = createAsyncThunk(
    'reservation/import',
    serviceWrapper(service._import)
)