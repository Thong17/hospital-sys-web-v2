import { createSlice } from "@reduxjs/toolkit";
import { getHomeContent } from "./action";

interface IHome {
    content: {
        isLoading: boolean,
        data: any,
        error: any
    }
}

const initialState: IHome = {
    content: { isLoading: false, data: null, error: null }
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.content.data = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getHomeContent.pending, (state) => {
            state.content.isLoading = true
        })
        builder.addCase(getHomeContent.rejected, (state, action) => {
            state.content.isLoading = false
            state.content.error = action.payload?.response?.data
        })
        builder.addCase(getHomeContent.fulfilled, (state, action) => {
            state.content.error = null
            state.content.isLoading = false
            state.content.data = action.payload
        })
    },
})

export const { actions: homeAction, reducer: homeReducer } = homeSlice