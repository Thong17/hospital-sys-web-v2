import { createSlice } from "@reduxjs/toolkit";

interface IConfig {
    theme: string
    isOpenedCart: boolean
    isOpenedSidebar: boolean
    isAttachedSidebar: boolean
    expandedSidebarItems: String[]
}

const initialState: IConfig = {
    theme: 'Light',
    isOpenedCart: false,
    isOpenedSidebar: false,
    isAttachedSidebar: true,
    expandedSidebarItems: []
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload
        },
        toggleOpenCart: (state) => {
            state.isOpenedCart = !state.isOpenedCart
        },
        toggleOpenSidebar: (state) => {
            state.isOpenedSidebar = !state.isOpenedSidebar
        },
        toggleAttachSidebar: (state) => {
            state.isAttachedSidebar = !state.isAttachedSidebar
        },
        toggleExpandedSidebarItem: (state, action) => {
            const listExpanded = state.expandedSidebarItems || []
            const isExpanded = listExpanded.find(item => item === action.payload.item)
            if (isExpanded) state.expandedSidebarItems = listExpanded.filter(item => item !== action.payload.item)
            else state.expandedSidebarItems = [...listExpanded, action.payload.item]
        }
    },
})

export const { actions: configAction, reducer: configReducer } = configSlice