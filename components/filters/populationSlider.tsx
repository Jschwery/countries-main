'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Slider, SliderThumb as Thumb } from '@mui/material';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useGlobalContext } from '@global/provider';
import { FilterOptions } from './filterComponent';
import { useState, useEffect } from 'react';
import { fltrObjectAndIndex } from '@components/countriesDisplay';
import { log } from 'console';
const minDistance = 10;

export interface FilterState {
  callback: (
    filterOption: FilterOptions[],
    nameFilter: string,
    valuePassed: [number, number] | string[]
  ) => void;
  filterOps: FilterOptions[];
}

export default function MinimumDistanceSlider({ callback, filterOps }: FilterState) {
  filterOps.forEach((filterOption) => {
    console.log('==========================================');
    console.log('FILTER OPS RECIEVED BY SLIDER');
    console.log('filter: ' + filterOption.filterName);
    console.log('active: ' + filterOption.active);
    console.log('value: ' + filterOption.value);
    console.log('==========================================');
  });

  const [value2, setValue2] = useState<number[]>([0, 15]);
  const populationFilterIndex = filterOps.findIndex(
    (filter) => filter.filterName.toLocaleLowerCase() === 'population'
  );

  const handleChange2 = (event: Event, newValue: number | number[], activeThumb: number) => {
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

    const updatedFilters = [...filterOps];
    updatedFilters[populationFilterIndex].active = true;
    updatedFilters[populationFilterIndex].filterEdit = true;
    updatedFilters[populationFilterIndex].value = [value2[0], value2[1]];
    updatedFilters.forEach((filter) => {
      console.log('within populationSlider');
      console.log('filter: ' + filter.filterName);
      console.log('active: ' + filter.active);
      console.log('value: ' + filter.value);
    });
    callback(updatedFilters, 'population', [value2[0], value2[1]]);
  };

  return (
    <div className="flex items-center w-full">
      <Slider
        className="transition-all"
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        disableSwap
        sx={{ flexGrow: 1 }}
        components={{
          Thumb: (props) => (
            <Thumb
              {...props}
              sx={{
                width: 16,
                height: 16,
                '&:hover': {
                  boxShadow: '0 0 0 8px rgba(76, 175, 80, 0.16)'
                }
              }}
            />
          )
        }}
      />
    </div>
  );
}
