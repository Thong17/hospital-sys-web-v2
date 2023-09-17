import { createSlice } from "@reduxjs/toolkit";
import { getAuthLogin, getAuthRegister } from "./action";

interface IAuth {
    login: {
        isLoading: boolean,
        data: any,
        error: any
    }
    register: {
        isLoading: boolean,
        data: any,
        error: any
    }
}

const initialState: IAuth = {
    login: { isLoading: false, data: null, error: null },
    register: { isLoading: false, data: null, error: null },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.login.data = action.payload
        }
    },
    extraReducers(builder) {
        builder
            // LOGIN
            .addCase(getAuthLogin.pending, (state) => {
                state.login.isLoading = true
            })
            .addCase(getAuthLogin.rejected, (state, action) => {
                state.login.isLoading = false
                state.login.error = action.payload?.response?.data
            })
            .addCase(getAuthLogin.fulfilled, (state, action) => {
                state.login.error = null
                state.login.isLoading = false
                state.login.data = action.payload
            })

            // REGISTER
            .addCase(getAuthRegister.pending, (state) => {
                state.register.isLoading = true
            })
            .addCase(getAuthRegister.rejected, (state, action) => {
                state.register.isLoading = false
                state.register.error = action.payload?.response?.data
            })
            .addCase(getAuthRegister.fulfilled, (state, action) => {
                state.register.error = null
                state.register.isLoading = false
                state.register.data = action.payload
            })
    },
})

export const { actions: authAction, reducer: authReducer } = authSlice