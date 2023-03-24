'use client';
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { CheckIcon } from '@heroicons/react/24/solid';
import { FilterState } from './populationSlider';
import { fetchCountries } from '@components/helpers/countryFetch';
import { reject } from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

async function countryBordersOrRegion(name: string) {
  try {
    const countries = await fetchCountries();
    switch (name.toLocaleLowerCase()) {
      case 'region': {
        return countries.map((country) => country.region);
      }
      case 'borders': {
        return countries.map((country) => country.borders);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

interface ChipTypes {
  title: string;
}

export default function MultipleSelectChip({
  title,
  callback,
  filterOps
}: ChipTypes & FilterState) {
  const theme = useTheme();
  const [bordersOrRegion, setBordersOrRegion] = React.useState<string[]>([]);
  const [names, setNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const names = async (name: string) => {
      return countryBordersOrRegion(title);
    };

    setNames();
  }, []);

  React.useEffect(() => {
    const dropDownFitlerIndex = filterOps.findIndex(
      (filter) => filter.filterName.toLocaleLowerCase() === title.toLocaleLowerCase()
    );
    const updatedFilters = [...filterOps];
    updatedFilters[dropDownFitlerIndex].value = bordersOrRegion;
    updatedFilters[dropDownFitlerIndex].filterEdit = true;
    updatedFilters[dropDownFitlerIndex].active = true;
    callback(updatedFilters, title.toLocaleLowerCase(), bordersOrRegion);
  }, [bordersOrRegion]);

  const handleChange = (event: SelectChangeEvent<typeof bordersOrRegion>) => {
    const {
      target: { value }
    } = event;
    const updatedBordersOrRegion = typeof value === 'string' ? value.split(',') : value;
    setBordersOrRegion(updatedBordersOrRegion);
  };

  return (
    <div className="relative flex items-center w-full justify-start sm:justify-end ">
      <FormControl sx={{ flexGrow: 1 }}>
        <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={bordersOrRegion}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, bordersOrRegion, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
