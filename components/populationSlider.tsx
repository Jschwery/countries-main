import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface SliderProps {
  onChange: (values: number[]) => void;
}

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider({ onChange }: SliderProps) {
  const [value1, setValue1] = React.useState<number[]>([20, 37]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  React.useEffect(() => {
    onChange(value1);
  }, [value1, onChange]);

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
