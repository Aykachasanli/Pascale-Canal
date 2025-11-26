import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './homeSlice'
import modalReducer from './modalSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    modal: modalReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
