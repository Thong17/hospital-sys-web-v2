import { createSlice } from "@reduxjs/toolkit";
import { getRolePermission } from "./action";

interface IRole {
    permission: {
        isLoading: boolean,
        data: any,
        error: any
    }
}

const initialState: IRole = {
    permission: { isLoading: false, data: null, error: null }
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRolePermission.pending, (state) => {
            state.permission.isLoading = true
        })
        builder.addCase(getRolePermission.rejected, (state, action) => {
            state.permission.isLoading = false
            state.permission.error = action.payload?.response?.data
        })
        builder.addCase(getRolePermission.fulfilled, (state, action) => {
            state.permission.error = null
            state.permission.isLoading = false
            state.permission.data = action.payload
        })
    },
})

export const { actions: roleAction, reducer: roleReducer } = roleSlice