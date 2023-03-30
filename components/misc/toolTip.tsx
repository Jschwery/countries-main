'use client';
import React, { useEffect, useState } from 'react';
import { fetchCountries } from '@components/helpers/countryFetch';
import { Country } from '@app/page';
import { IconButton, Tooltip } from '@mui/material';

interface CountriesFetched {
  countryName: string;
}

function ToolTip({ countryName }: CountriesFetched) {
  const [toolCountries, setToolCountries] = useState<Country[]>([]);
  const [matchingCountry, setMatchingCountry] = useState<Country>();
  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setToolCountries(countries);
    };
    fetchCountriesData();
  }, []);

  useEffect(() => {
    console.log('the countryname is: ' + countryName);
  }, [countryName]);

  useEffect(() => {
    const matchingCountry = countryName
      ? toolCountries.find(
          (country) => country.name.common.toLocaleLowerCase() === countryName.toLocaleLowerCase()
        )
      : undefined;
    setMatchingCountry(matchingCountry ? (matchingCountry as Country) : undefined);
    console.log('the matching country name is: ' + matchingCountry?.name.common);
  }, [matchingCountry]);

  // Prepare the tooltip content based on the matching country
  const tooltipContent = matchingCountry ? (
    <div>
      <div>{'Country Name: ' + matchingCountry.name.common}</div>
      <img
        src={matchingCountry.flags?.png || matchingCountry.flags?.svg}
        alt={`${matchingCountry.name} flag`}
        width="30"
        height="20"
      />
    </div>
  ) : (
    <div>No matching country found</div>
  );

  return (
    <div className="flex bg-slate-700">
      <Tooltip title={tooltipContent} arrow>
        <IconButton></IconButton>
      </Tooltip>
    </div>
  );
}

export default ToolTip;
