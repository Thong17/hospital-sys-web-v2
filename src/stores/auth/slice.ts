import { createSlice } from "@reduxjs/toolkit";
import { getAuthLogin } from "./action";

interface IAuth {
    login: {
        isLoading: boolean,
        data: any,
        error: any
    }
}

const initialState: IAuth = {
    login: { isLoading: false, data: null, error: null }
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
        builder.addCase(getAuthLogin.pending, (state) => {
            state.login.isLoading = true
        })
        builder.addCase(getAuthLogin.rejected, (state, action) => {
            state.login.isLoading = false
            state.login.error = action.payload?.response?.data
        })
        builder.addCase(getAuthLogin.fulfilled, (state, action) => {
            state.login.error = null
            state.login.isLoading = false
            state.login.data = action.payload
        })
    },
})

export const { actions: authAction, reducer: authReducer } = authSlice