import { createAsyncThunk } from "@reduxjs/toolkit";
import { DoctorService } from "services/doctor";
import { serviceWrapper } from "utils/index";

const service = new DoctorService()

export const getDoctorCreate: any = createAsyncThunk(
    'doctor/create',
    serviceWrapper(service.create)
)

export const getDoctorUpdate: any = createAsyncThunk(
    'doctor/update',
    serviceWrapper(service.update)
)

export const getDoctorDelete: any = createAsyncThunk(
    'doctor/delete',
    serviceWrapper(service.delete)
)

export const getDoctorList: any = createAsyncThunk(
    'doctor/list',
    serviceWrapper(service.list)
)

export const getDoctorDetail: any = createAsyncThunk(
    'doctor/detail',
    serviceWrapper(service.detail)
)

export const getDoctorHistory: any = createAsyncThunk(
    'doctor/history',
    serviceWrapper(service.history)
)

export const getDoctorExport: any = createAsyncThunk(
    'doctor/export',
    serviceWrapper(service._export)
)

export const getDoctorValidate: any = createAsyncThunk(
    'doctor/validate',
    serviceWrapper(service._validate)
)

export const getDoctorImport: any = createAsyncThunk(
    'doctor/import',
    serviceWrapper(service._import)
)