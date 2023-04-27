'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { fetchCountries } from '@components/helpers/countryFetch';
import { Country } from '@global/interfaces';
import { IconButton, Tooltip } from '@mui/material';
import continents from '@public/continents.json';
interface CountriesFetched {
  countryOrContinent: string;
  children: React.ReactNode;
  showTools: boolean;
}
interface Continent {
  continent: string;
  imageURL: string;
}

function ToolTip({ countryOrContinent, children, showTools }: CountriesFetched) {
  const [toolCountries, setToolCountries] = useState<Country[]>([]);
  const [matchingCountryOrContinent, setMatchingCountryOrContinent] = useState<
    Country | Continent
  >();
  const [tools, setTools] = useState(showTools);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setToolCountries(countries);
    };
    fetchCountriesData();
  }, []);

  const findContinent = (name: string) => {
    return continents.find((continent) => continent.continent.toLowerCase() === name.toLowerCase());
  };

  useEffect(() => {
    const foundContinent = findContinent(countryOrContinent);
    if (!foundContinent) {
      const c = toolCountries.find(
        (country) => country.cca3?.toLocaleLowerCase() === countryOrContinent.toLocaleLowerCase()
      );
      setMatchingCountryOrContinent(c);
      return;
    }
    setMatchingCountryOrContinent(foundContinent);
  }, [countryOrContinent, toolCountries]);

  const handleTools = () => {
    setTools(!tools);
  };

  const tooltipContent = matchingCountryOrContinent ? (
    'cca3' in matchingCountryOrContinent ? (
      <div onMouseEnter={handleTools}>
        <div>{'Country Name: ' + matchingCountryOrContinent.name.common}</div>
        <img
          src={matchingCountryOrContinent.flags?.png || matchingCountryOrContinent.flags?.svg}
          alt={`${matchingCountryOrContinent.name} flag`}
          width="30"
          height="20"
        />
      </div>
    ) : (
      <div onMouseEnter={handleTools}>
        {(matchingCountryOrContinent as Continent).continent !== '' &&
          (matchingCountryOrContinent as Continent).continent !== undefined && (
            <>
              <div>{'Continent: ' + (matchingCountryOrContinent as Continent).continent}</div>
              <img
                src={(matchingCountryOrContinent as Continent).imageURL}
                alt={`${(matchingCountryOrContinent as Continent).continent} image`}
                width="30"
                height="20"
              />
            </>
          )}
      </div>
    )
  ) : null;

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
