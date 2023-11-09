import { createAsyncThunk } from "@reduxjs/toolkit";
import { SpecialtyService } from "services/specialty";
import { serviceWrapper } from "utils/index";

const service = new SpecialtyService()

export const getSpecialtyCreate: any = createAsyncThunk(
    'specialty/create',
    serviceWrapper(service.create)
)

export const getSpecialtyDelete: any = createAsyncThunk(
    'specialty/delete',
    serviceWrapper(service.delete)
)

export const getSpecialtyList: any = createAsyncThunk(
    'specialty/list',
    serviceWrapper(service.list)
)