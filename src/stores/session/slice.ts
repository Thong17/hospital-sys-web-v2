import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./action";

interface ISession {
    accessToken?: string
    refreshToken?: string
    user?: any
    status: 'INIT' | 'LOADING' | 'FAILED' | 'COMPLETED'
}

export const initialState: ISession = {
    accessToken: undefined,
    refreshToken: undefined,
    user: null,
    status: 'INIT'
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            if (action.payload.data) state.user = action.payload.data
        },
        clearSession: (state) => {
            state.accessToken = undefined
            state.refreshToken = undefined
            state.user = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = 'LOADING'
            })
            .addCase(getProfile.rejected, (state) => {
                state.status = 'FAILED'
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = 'COMPLETED'
                state.user = action.payload.data
            })
    },
})

export const { actions: sessionAction, reducer: sessionReducer } = sessionSlice