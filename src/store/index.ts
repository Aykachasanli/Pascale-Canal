import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalSlice'
import homeReducer from './homeSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    modal: modalReducer, 
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
