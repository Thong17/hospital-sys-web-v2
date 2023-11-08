import { createAsyncThunk } from "@reduxjs/toolkit";
import { TreatmentService } from "services/treatment";
import { serviceWrapper } from "utils/index";

const service = new TreatmentService()

export const getTreatmentCreate: any = createAsyncThunk(
    'treatment/create',
    serviceWrapper(service.create)
)

export const getTreatmentDelete: any = createAsyncThunk(
    'treatment/delete',
    serviceWrapper(service.delete)
)

export const getTreatmentList: any = createAsyncThunk(
    'treatment/list',
    serviceWrapper(service.list)
)