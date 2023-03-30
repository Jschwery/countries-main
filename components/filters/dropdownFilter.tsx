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
import { filter, reject } from 'lodash';
import { useEffect, useState } from 'react';
import { log } from 'console';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import ToolTip from '@components/misc/toolTip';

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
        const regions = countries.map((country) => country.region);
        return [...new Set(regions)];
      }
      case 'borders': {
        const borders = countries.flatMap((country) => country.borders);
        return [...new Set(borders)];
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
  const [bordersOrRegion, setBordersOrRegion] = useState<string[]>([]);
  const [names, setNames] = useState<string[] | any[]>(['']);
  const [initialValue, setInitialValue] = useState<string[]>([]);
  const [hoveredCountryName, setHoveredCountryName] = useState('');

  const handleMouseEnter = (name: string) => {
    setHoveredCountryName(name);
  };

  const handleMouseLeave = () => {
    setHoveredCountryName('');
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await countryBordersOrRegion(title);
      setNames(result ?? []);
    };
    console.log('1st useEffect - title:', title);

    fetchData();
  }, [title]);

  useEffect(() => {
    const dropDownFilterIndex = filterOps.findIndex(
      (filter) => filter.filterName.toLocaleLowerCase() === title.toLocaleLowerCase()
    );
    const recentFilters = [...filterOps];

    setInitialValue(recentFilters[dropDownFilterIndex].value as string[]);
  }, [filterOps, title]);

  useEffect(() => {
    if (initialValue.length > 0) {
      setBordersOrRegion(initialValue);
    }
  }, [initialValue]);

  const handleChange = (event: SelectChangeEvent<typeof bordersOrRegion>) => {
    const {
      target: { value }
    } = event;

    const updatedBordersOrRegion = typeof value === 'string' ? value.split(',') : value;
    setBordersOrRegion(updatedBordersOrRegion);
  };

  useEffect(() => {
    const recentFilters = [...filterOps];
    const dropDownFilterIndex = filterOps.findIndex(
      (filter) => filter.filterName.toLocaleLowerCase() === title.toLocaleLowerCase()
    );

    recentFilters[dropDownFilterIndex].value = filterOps[dropDownFilterIndex].value;
    recentFilters[dropDownFilterIndex].filterEdit = true;
    recentFilters[dropDownFilterIndex].active = true;
    callback(recentFilters, title.toLocaleLowerCase(), bordersOrRegion);
  }, [bordersOrRegion]);

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
          {names &&
            names.map((name, index) =>
              name ? (
                <MenuItem
                  key={name + '-' + index}
                  value={name}
                  onMouseEnter={() => handleMouseEnter(name)}
                  style={getStyles(name, bordersOrRegion, theme)}>
                  {name}
                  {name ? (
                    (name as string).toLocaleLowerCase() ===
                    hoveredCountryName.toLocaleLowerCase() ? (
                      <>
                        <InformationCircleIcon className="w-[15px] h-[15px]" />
                      </>
                    ) : null
                  ) : (
                    <></>
                  )}
                </MenuItem>
              ) : (
                <></>
              )
            )}
        </Select>
      </FormControl>
    </div>
  );
}
