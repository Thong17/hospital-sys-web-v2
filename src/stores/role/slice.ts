import { createSlice } from "@reduxjs/toolkit";
import { getRoleCreate } from "./action";

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
    },
})

export const { actions: roleAction, reducer: roleReducer } = roleSlice