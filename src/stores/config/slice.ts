import { createSlice } from "@reduxjs/toolkit";

interface IConfig {
    sidebar: boolean
}

const initialState: IConfig = {
    sidebar: false
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar
        }
    },
})

export const { actions: configAction, reducer: configReducer } = configSlice