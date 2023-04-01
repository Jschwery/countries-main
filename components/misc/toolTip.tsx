'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { fetchCountries } from '@components/helpers/countryFetch';
import { Country } from '@app/page';
import { IconButton, Tooltip } from '@mui/material';

interface CountriesFetched {
  countryCode: string;
  children: React.ReactNode;
  visible: boolean;
}

function ToolTip({ countryCode, children, visible }: CountriesFetched) {
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
    const c = toolCountries.find(
      (country) => country.cca3?.toLocaleLowerCase() === countryCode.toLocaleLowerCase()
    );
    setMatchingCountry(c);
  }, [countryCode, toolCountries]);

  useEffect(() => {
    const matchingCountry = countryCode
      ? toolCountries.find(
          (country) => country.cca3?.toLocaleLowerCase() === countryCode.toLocaleLowerCase()
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
    <div className="flex">
      {visible && (
        <Tooltip title={tooltipContent} arrow>
          {children as ReactElement}
        </Tooltip>
      )}
    </div>
  );
}

export default ToolTip;
