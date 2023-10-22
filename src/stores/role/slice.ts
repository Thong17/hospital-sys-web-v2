import { createSlice } from "@reduxjs/toolkit";
import { getRoleCreate, getRoleList } from "./action";

interface IRole {
    create: {
        isLoading: boolean,
        data: any,
        error: any
    }
    list: {
        isLoading: boolean,
        data: any,
        error: any,
        metaData: {
            skip: number,
            limit: number,
            total: number,
        }
    }
}

const initialState: IRole = {
    create: { isLoading: false, data: null, error: null },
    list: { isLoading: false, data: [], error: null, metaData: { skip: 0, limit: 10, total: 0 } },
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRoleCreate.pending, (state) => {
            state.create.isLoading = true
        })
        builder.addCase(getRoleCreate.rejected, (state, action) => {
            state.create.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getRoleCreate.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.create.data = action.payload
        })

        // List
        builder.addCase(getRoleList.pending, (state) => {
            state.list.isLoading = true
        })
        builder.addCase(getRoleList.rejected, (state, action) => {
            state.list.isLoading = false
            state.list.error = action.payload?.response?.data
        })
        builder.addCase(getRoleList.fulfilled, (state, action) => {
            state.list.error = null
            state.list.isLoading = false
            state.list.data = action.payload?.data
            state.list.metaData = action.payload?.metaData
        })
    },
})

export const { actions: roleAction, reducer: roleReducer } = roleSlice