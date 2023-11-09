import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  PersistConfig,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from 'stores/auth/slice'
import { configReducer } from 'stores/config/slice'
import { homeReducer } from 'stores/home/slice'
import { roleReducer } from 'stores/role/slice'
import { userReducer } from 'stores/user/slice'
import { doctorReducer } from 'stores/doctor/slice'
import { specialtyReducer } from 'stores/specialty/slice'
import { exchangeRateReducer } from 'stores/exchangeRate/slice'
import { patientReducer } from 'stores/patient/slice'
import { sessionReducer } from 'stores/session/slice'
import { reservationReducer } from 'stores/reservation/slice'
import { scheduleReducer } from 'stores/schedule/slice'
import { symptomReducer } from 'stores/symptom/slice'
import { categoryReducer } from 'stores/category/slice'

const mainReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  session: sessionReducer,
  config: configReducer,
  role: roleReducer,
  user: userReducer,
  doctor: doctorReducer,
  patient: patientReducer,
  specialty: specialtyReducer,
  exchangeRate: exchangeRateReducer,
  reservation: reservationReducer,
  schedule: scheduleReducer,
  symptom: symptomReducer,
  category: categoryReducer,
})

const rootReducer = (state: any, action: any) => {
  return mainReducer(state, action)
}

const persistConfig: PersistConfig<any> = {
  key: 'hospital-system',
  version: 1,
  storage,
  whitelist: ['session', 'config'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })

const store = configureStore({
  reducer: persistedReducer,
  middleware,
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
