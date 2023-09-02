import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "stores/auth/slice";

const mainReducer = combineReducers({
    auth: authReducer
})

const rootReducer = (state: any, action: any) => {
    return mainReducer(state, action)
}

const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage,
    whitelist:  ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = (getDefaultMiddleware: any) => 
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })


const store = configureStore({
    reducer: persistedReducer,
    middleware
})
const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<String>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export { store, persistor }