import { createSlice } from "@reduxjs/toolkit";
import { getRolePermission } from "./action";

interface IRole {
    create: {
        isLoading: boolean,
        data: any,
        error: any
    }
}

const initialState: IRole = {
    create: { isLoading: false, data: null, error: null }
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRolePermission.pending, (state) => {
            state.create.isLoading = true
        })
        builder.addCase(getRolePermission.rejected, (state, action) => {
            state.create.isLoading = false
            state.create.error = action.payload?.response?.data
        })
        builder.addCase(getRolePermission.fulfilled, (state, action) => {
            state.create.error = null
            state.create.isLoading = false
            state.create.data = action.payload
        })
    },
})

export const { actions: roleAction, reducer: roleReducer } = roleSlice