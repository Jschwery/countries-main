'use client';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { HTMLAttributes } from 'react';
import { countryData } from '../public/countryData';


interface SearchFilter{
  filter: (s: string)=> void;
}

interface Option {
  label: string;
  value: string;
}

function FilterComponent({filter} : SearchFilter) {
  const countryNames: string[] = Array.from(new Set(countryData.map((c) => c.region)));


  let x = 0;
  const options: Option[] = countryNames.map((op)=>{
      x++;
      return {
          label: op,
          value: op
      }

  }
  )

  const defaultProps: AutocompleteProps<string | Option, true, true, true> = {
      options: options,

      getOptionLabel: (option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.label;
      },
      renderOption: (props, option) => {
        const label = typeof option === 'string' ? option : option.label;

        return <div {...(props as unknown as HTMLAttributes<HTMLDivElement>)}>{label}</div>;
      },
      renderInput: (params) => <TextField {...params} label="Filter" />,
      sx:{width: 150},
      onChange: (event, value) => {
        if (typeof value === 'string') {
          filter(value);
        }     
      }
  };
  
  return (
      <Autocomplete {...defaultProps} id="clear-on-escape" clearOnEscape />
  );
}
export default FilterComponent;
