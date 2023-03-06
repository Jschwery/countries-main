import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Population {
  value: [number, number];
}

const initialState: Population = {
  value: [20, 30],
};

export const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {
    addPopulationRange: (state: Population, action: PayloadAction<[number, number]>) => {
      state.value = action.payload;
    },
    clearPopulationRange: (state: Population) => {
      state.value = [0, 10];
    },
  },
});

export const { addPopulationRange, clearPopulationRange } = populationSlice.actions;
export default populationSlice.reducer;

