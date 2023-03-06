'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BorderState {
  value: string[]
}

const initialState: BorderState = {
  value: [],
}

export const borderSlice = createSlice({
  name: 'border',
  initialState,
  reducers: {
    addBorderCountry: (state: BorderState, action: PayloadAction<string>) => {
      state.value = [...state.value, action.payload]
    },
    removeBorderCountry: (state: BorderState, action: PayloadAction<string>) => {
      state.value = state.value.filter(country => country !== action.payload)
    },
    clearBorderCountries: (state: BorderState) => {
      state.value = []
    },
  },
})
export const {addBorderCountry, removeBorderCountry, clearBorderCountries} = borderSlice.actions
export default borderSlice.reducer