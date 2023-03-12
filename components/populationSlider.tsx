'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Slider, SliderThumb as Thumb } from '@mui/material';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useGlobalContext } from '@global/provider';
function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;


export default function MinimumDistanceSlider() {

  const [value2, setValue2] = React.useState<number[]>([0, 15]);

  React.useEffect(()=>{
    console.log(value2)
  }, [value2])

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

  // const handleCheckClick = () =>{
     
  // }


  return (
    <div className='flex items-center w-full'> 

<Slider
  className='transition-all'
  getAriaLabel={() => 'Minimum distance shift'}
  value={value2}
  onChange={handleChange2}
  valueLabelDisplay="auto"
  getAriaValueText={valuetext}
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
            boxShadow: '0 0 0 8px rgba(76, 175, 80, 0.16)',
          }
        }}
      />
    )
  }}
/>
{/* onClick={handleCheckClick} */}
    <CheckIcon   className=' w-[30px] h-[30px] text-green-600 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5'/>
    </div>
  );
}
