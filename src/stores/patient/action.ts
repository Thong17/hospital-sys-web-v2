import { createAsyncThunk } from "@reduxjs/toolkit";
import { PatientService } from "services/patient";
import { serviceWrapper } from "utils/index";

const service = new PatientService()

export const getPatientCreate: any = createAsyncThunk(
    'patient/create',
    serviceWrapper(service.create)
)

export const getPatientUpdate: any = createAsyncThunk(
    'patient/update',
    serviceWrapper(service.update)
)

export const getPatientDelete: any = createAsyncThunk(
    'patient/delete',
    serviceWrapper(service.delete)
)

export const getPatientList: any = createAsyncThunk(
    'patient/list',
    serviceWrapper(service.list)
)

export const getPatientDetail: any = createAsyncThunk(
    'patient/detail',
    serviceWrapper(service.detail)
)

export const getPatientRecord: any = createAsyncThunk(
    'patient/record',
    serviceWrapper(service.record)
)

export const getPatientHistory: any = createAsyncThunk(
    'patient/history',
    serviceWrapper(service.history)
)

export const getPatientExport: any = createAsyncThunk(
    'patient/export',
    serviceWrapper(service._export)
)

export const getPatientValidate: any = createAsyncThunk(
    'patient/validate',
    serviceWrapper(service._validate)
)

export const getPatientImport: any = createAsyncThunk(
    'patient/import',
    serviceWrapper(service._import)
)