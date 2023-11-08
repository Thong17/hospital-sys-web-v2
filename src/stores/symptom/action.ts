import { createAsyncThunk } from "@reduxjs/toolkit";
import { SymptomService } from "services/symptom";
import { serviceWrapper } from "utils/index";

const service = new SymptomService()

export const getSymptomCreate: any = createAsyncThunk(
    'symptom/create',
    serviceWrapper(service.create)
)

export const getSymptomDelete: any = createAsyncThunk(
    'symptom/delete',
    serviceWrapper(service.delete)
)

export const getSymptomList: any = createAsyncThunk(
    'symptom/list',
    serviceWrapper(service.list)
)