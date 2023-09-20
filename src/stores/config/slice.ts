import { createSlice } from "@reduxjs/toolkit";

interface IConfig {
    isOpenedSidebar: boolean
    isAttachedSidebar: boolean
}

const initialState: IConfig = {
    isOpenedSidebar: false,
    isAttachedSidebar: false
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        toggleOpenSidebar: (state) => {
            state.isOpenedSidebar = !state.isOpenedSidebar
        },
        toggleAttachSidebar: (state) => {
            state.isAttachedSidebar = !state.isAttachedSidebar
        }
    },
})

export const { actions: configAction, reducer: configReducer } = configSlice