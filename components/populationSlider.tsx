'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import type { RootState } from "../global/store";
import { useSelector, useDispatch } from "react-redux";
import { addPopulationRange, clearPopulationRange } from "../global/features/population/populationSlice"

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {

const population = useSelector((state: RootState ) => state.population);
const dispatch = useDispatch();


  const [value2, setValue2] = React.useState<number[]>([20, 37]);

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };


  React.useEffect(() => {
   dispatch(addPopulationRange([value2[0], value2[1]]))
  }, [value2]);

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
