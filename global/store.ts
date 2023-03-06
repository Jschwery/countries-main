'use client';
import { configureStore } from '@reduxjs/toolkit'
import { borderSlice } from './features/border/bordersSlice'
import {countryHistorySlice} from './features/countryHistory/countryHistorySlice';
import {populationSlice} from './features/population/populationSlice';


export const store = configureStore({
  reducer: {
    countryHistory: countryHistorySlice.reducer,
    border: borderSlice.reducer,
    population: populationSlice.reducer,
  },
});
  
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch