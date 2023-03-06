'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryHistory {
  value: [[string, string]]
}

const initialState: CountryHistory = {
  value: [['', '']],
};

export const countryHistorySlice = createSlice({
  name: 'countryHistory',
  initialState,
  reducers: {
    addCountryHistory: (state: CountryHistory, action: PayloadAction<[[string, string]]>) => {
      state.value = action.payload;
    },
    clearCountryHistory: (state: CountryHistory) => {
      state.value = [['', '']];
    },
  },
});

export const { addCountryHistory, clearCountryHistory } = countryHistorySlice.actions;

export default countryHistorySlice.reducer;

