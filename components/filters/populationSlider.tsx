'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Slider, SliderThumb as Thumb } from '@mui/material';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useGlobalContext } from '@global/provider';
import { FilterOption } from './filterComponent';
import { FilterOptions } from './filterComponent';

const minDistance = 10;
// export interface FilterOptions {
//   filterName: string;
//   filterOptions: FilterOption[];
//   active: boolean,
//   bordersOrRegion?: [];
//   population?: [number, number];
//   filterEdit?: boolean;

export interface FilterState {
  callback: (filterOption: FilterOptions) => void;
}

export default function MinimumDistanceSlider({ callback }: FilterState) {
  const handleCheckClick = () => {
    console.log('check clicked');
    callback &&
      callback({
        filterName: 'population',
        active: active,
        population: [value2[0], value2[1]],
        filterEdit: true
      });
    React.useEffect(() => {
      setIsActive(!active);
      console.log(`${active ? 'slider is active' : 'slider is not active'}`);
    }, [active]);
  };

  const [value2, setValue2] = React.useState<number[]>([0, 15]);
  const [active, setIsActive] = React.useState(false);
  React.useEffect(() => {
    console.log(value2);
  }, [value2]);

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
  };

  // const handleCheckClick = () =>{

  // }

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

      <CheckIcon
        onClick={handleCheckClick}
        className=" w-[30px] h-[30px] text-green-600 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5"
      />
    </div>
  );
}
