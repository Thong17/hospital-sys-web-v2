import { createSlice } from "@reduxjs/toolkit";
import { getAuthLogin } from "./action";

interface IAuth {
    login: {
        isLoading: boolean,
        data: any
    }
}

const initialState: IAuth = {
    login: { isLoading: false, data: null }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAuthLogin.pending, (state) => {
            state.login.isLoading = true
        })
        builder.addCase(getAuthLogin.rejected, (state) => {
            state.login.isLoading = false
        })
        builder.addCase(getAuthLogin.fulfilled, (state, action) => {
            state.login.isLoading = false
            state.login.data = action.payload?.data
        })
    },
})

export const { actions: authAction, reducer: authReducer } = authSlice