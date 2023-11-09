import { createSlice } from "@reduxjs/toolkit";
import { getScheduleDetail, getScheduleList } from "./action";
import { TypeStatus } from "stores/constant";

interface ISchedule {
    form: {
        isLoading: boolean
    }
    list: {
        status: TypeStatus
        data: any,
        error: any,
        metaData: {
            skip: number,
            limit: number,
            total: number,
        }
    }
    detail: {
        status: TypeStatus
        data: any,
        error: any
    }
}

const initialState: ISchedule = {
    form: { isLoading: false },
    detail: { status: 'INIT', data: null, error: null },
    list: { status: 'INIT', data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // List
        builder.addCase(getScheduleList.pending, (state) => {
            state.list.status = 'PENDING'
        })
        builder.addCase(getScheduleList.rejected, (state, action) => {
            state.list.status = 'FAILED'
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getScheduleList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.status = 'COMPLETED'
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })

        // Detail
        builder.addCase(getScheduleDetail.pending, (state) => {
            state.detail.status = 'PENDING'
        })
        builder.addCase(getScheduleDetail.rejected, (state, action) => {
            state.detail.status = 'FAILED'
            state.detail.error = action.payload?.response?.data
        })
        builder.addCase(getScheduleDetail.fulfilled, (state, action) => {
            state.detail.error = null
            state.detail.status = 'COMPLETED'
            state.detail.data = action.payload?.data
        })
    },
})

export const { actions: scheduleAction, reducer: scheduleReducer } = scheduleSlice