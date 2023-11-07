import { createAsyncThunk } from "@reduxjs/toolkit";
import { ScheduleService } from "services/schedule";
import { serviceWrapper } from "utils/index";

const service = new ScheduleService()

export const getScheduleStart: any = createAsyncThunk(
    'schedule/start',
    serviceWrapper(service.start)
)

export const getScheduleEnd: any = createAsyncThunk(
    'schedule/end',
    serviceWrapper(service.end)
)

export const getScheduleList: any = createAsyncThunk(
    'schedule/list',
    serviceWrapper(service.list)
)

export const getScheduleDetail: any = createAsyncThunk(
    'schedule/detail',
    serviceWrapper(service.detail)
)