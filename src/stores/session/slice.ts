import { createSlice } from "@reduxjs/toolkit";

interface ISession {
    accessToken?: string
    refreshToken?: string
    user?: any
}

const initialState: ISession = {
    accessToken: undefined,
    refreshToken: undefined,
    user: null
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
})

export const { actions: sessionAction, reducer: sessionReducer } = sessionSlice