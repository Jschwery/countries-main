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
import { FilterState } from './populationSlider';
import { fetchCountries } from '@components/helpers/countryFetch';
import { useEffect, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import ToolTip from '@components/misc/toolTip';

const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    className: 'rounded h-[175px] !bg-slate-200 dark:!bg-slate-600 '
  },
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'left' as const
  },
  transformOrigin: {
    vertical: 'top' as const,
    horizontal: 'left' as const
  },
  getContentAnchorEl: null
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
  const [countryOrContinent, setCountryOrContinent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = (name: string) => {
    setCountryOrContinent(name);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setCountryOrContinent('');
  };
  const handleMouseEnterIcon = () => {
    setShowTooltip(true);
  };

  const handleMouseLeaveIcon = () => {
    setShowTooltip(false);
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

  const menuItems = names.map((name, index) => {
    if (!name) {
      return null;
    }
    return (
      <MenuItem
        key={name + '-' + index}
        value={name}
        className={`menu-item dark:hover:!bg-slate-800 dark:!text-slate-100  
        ${bordersOrRegion.includes(name) ? 'selected' : ''}`}
        onMouseOver={() => handleMouseEnter(name)}
        style={getStyles(name, bordersOrRegion, theme)}>
        {name}
        {name ? (
          (name as string).toLocaleLowerCase() === countryOrContinent.toLocaleLowerCase() ? (
            <ToolTip countryOrContinent={name} showTools={showTooltip}>
              <InformationCircleIcon
                onMouseEnter={handleMouseEnterIcon}
                onMouseLeave={handleMouseLeaveIcon}
                className={`info-circle-icon ${
                  (name as string).toLocaleLowerCase() === countryOrContinent.toLocaleLowerCase()
                    ? 'info-circle-icon-visible'
                    : ''
                }`}
              />
            </ToolTip>
          ) : null
        ) : (
          <></>
        )}
      </MenuItem>
    );
  });
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
          input={
            <OutlinedInput
              className="dark:text-slate-200 dark:bg-slate-700 dark:border-slate-700"
              id="select-multiple-chip"
              label="Chip"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip className="dark:bg-slate-600 dark:text-slate-200" key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {names && menuItems}
        </Select>
      </FormControl>
    </div>
  );
}
