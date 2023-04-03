'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { fetchCountries } from '@components/helpers/countryFetch';
import { Country } from '@app/page';
import { IconButton, Tooltip } from '@mui/material';

interface CountriesFetched {
  countryOrContinent: string;
  children: React.ReactNode;
  showTools: boolean;
}

function ToolTip({ countryOrContinent, children, showTools }: CountriesFetched) {
  const [toolCountries, setToolCountries] = useState<Country[]>([]);
  const [matchingCountry, setMatchingCountry] = useState<Country>();
  const [tools, setTools] = useState(showTools);
  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setToolCountries(countries);
    };
    fetchCountriesData();
  }, []);

  useEffect(() => {
    console.log('the country or continent is: ' + countryOrContinent);
    const c = toolCountries.find(
      (country) => country.cca3?.toLocaleLowerCase() === countryOrContinent.toLocaleLowerCase()
    );
    setMatchingCountry(c);
  }, [countryOrContinent, toolCountries]);

  useEffect(() => {
    const matchingCountry = countryOrContinent
      ? toolCountries.find(
          (country) => country.cca3?.toLocaleLowerCase() === countryOrContinent.toLocaleLowerCase()
        )
      : undefined;
    setMatchingCountry(matchingCountry ? (matchingCountry as Country) : undefined);
    console.log('the matching country name is: ' + matchingCountry?.name.common);
  }, [matchingCountry]);

  const handleTools = () => {
    setTools(!tools);
  };

  // Prepare the tooltip content based on the matching country
  const tooltipContent = matchingCountry ? (
    <div onMouseEnter={handleTools}>
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
      {tools && (
        <Tooltip title={tooltipContent} arrow>
          {children as ReactElement}
        </Tooltip>
      )}
    </div>
  );
}

export default ToolTip;
