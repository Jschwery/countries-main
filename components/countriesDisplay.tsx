'use client';
import CountryLink from '@components/countryLink';
import FilterComponent, { FilterOptions } from '@components/filters/filterComponent';
import TablePaginationDemo from '@components/filters/paginate';
import SearchBar from '@components/filters/searchBar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Country } from '../app/page';
import Image from 'next/image';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { countryData } from '@public/countryData';
import FilteredCount from './filteredCount';

export function fltrObjectAndIndex(filterName: string, filterOptions: FilterOptions[]) {
  const indexToUpdate = filterOptions.findIndex(
    (option) => option.filterName.toLocaleLowerCase() === filterName.toLocaleLowerCase()
  );

  const foundFilter = filterOptions.find((op) => {
    op.filterName.toLocaleLowerCase() === filterName.toLocaleLowerCase();
  });

  return {
    index: indexToUpdate,
    filterOption: foundFilter
  };
}

function CountriesDisplay({ countries }: { countries: Country[] }) {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);
  const [searchWidth, setSearchWidth] = useState(false);
  const [noFilterMatch, setNoFilterMatch] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions[]>([]);

  const applyFilters = (countries: Country[], filterOptions: FilterOptions[]) => {
    return (
      countries &&
      countries.filter((country) => {
        return filterOptions.every((filter) => {
          switch (filter.filterName.toLocaleLowerCase()) {
            case 'region':
              return (
                filter.value &&
                (filter.value as string[]).some(
                  (region) => region.toLowerCase() === (country?.region || '').toLowerCase()
                )
              );
            case 'borders':
              return (
                country.borders &&
                (filter.value as string[]).every(
                  (value) =>
                    country.borders &&
                    country.borders.some((border) => value.toLowerCase() === border.toLowerCase())
                )
              );
            case 'population':
              return (
                country.population &&
                country.population >= (filter.value as [number, number])[0] &&
                country.population <= (filter.value as [number, number])[1]
              );
            default:
              return true;
          }
        });
      })
    );
  };
  useEffect(() => {
    const filtered = applyFilters(countries, activeFilters);
    activeFilters.length > 0 ? setFilteredCountries(filtered) : setFilteredCountries(countries);
  }, [countries, activeFilters]);

  const filterCallback = useCallback(
    (filterOptions: FilterOptions[]) => {
      setActiveFilters(filterOptions);
      const filtered = applyFilters(countries, filterOptions);
      setFilteredCountries(filtered);
      filterOptions.forEach((filter) => console.log(filter));
    },
    [countries]
  );

  useEffect(() => {
    console.log('filtermatch: ' + noFilterMatch);
  }, [noFilterMatch]);

  const handleSetSearchWidth = (setWidth: boolean) => {
    setWidth ? setSearchWidth(!searchWidth) : setSearchWidth(false);
  };
  return (
    <div>
      <div className="w-full flex flex-wrap pt-5">
        <div className="w-[90%] flex mx-auto flex-wrap changeCol mb-2">
          <div className="w-[50%] flex-grow flex-shrink min-w-[200px]">
            <div
              className={`flex flex-col items-start md:items-baseline justify-center h-full mt-2 ${
                searchWidth ? 'ml-[28px] md:ml-0' : ''
              }`}>
              <SearchBar />
            </div>
          </div>

          <div className="w-[50%] flex-grow flex-shrink min-w-[250px] flex items-start md:items-end">
            <FilterComponent
              filterCallback={filterCallback}
              setSearchWidth={handleSetSearchWidth}
            />
          </div>

          {filteredCountries.length > 0 && filteredCountries.length !== 250 && (
            <div
              className={`items-start md:items-baseline justify-center ${
                searchWidth ? 'ml-[28px] md:ml-0' : ''
              }`}>
              <FilteredCount countries={filteredCountries} />
            </div>
          )}
        </div>
        {filteredCountries.length === 0 &&
          !activeFilters.some(
            (filter) => filter.filterName.toLowerCase() === 'region' && activeFilters.length === 1
          ) && (
            <div
              className={`w-full items-start md:items-baseline justify-center ${
                searchWidth ? 'ml-[28px] md:ml-0' : ''
              }`}>
              <InformationCircleIcon className="text-yellow-300  max-w-[35px] max-h-[35px] ml-[2.45rem]" />
            </div>
          )}

        <div className="w-full flex justify-center pt-4 sm:pt-0 align-middle">
          {/* <TablePaginationDemo resultCount={countries.length} /> */}
        </div>

        {filteredCountries.map((country, index) => (
          <div key={`${country.name.common}-${index}`} className="flex mx-auto card-center">
            <CountryLink href={`/${country.name.common.trim().split(' ').join('+')}`}>
              <div
                className="country flex w-56 h-64 flex-col bg-slate-600 
          rounded-md shadow-md shadow-black m-4 cursor-pointer cards-sm">
                <div className="h-1/2 bg-gray-600 flex justify-center items-center rounded-md flex-auto">
                  <Image
                    className="object-cover w-full h-full rounded-md"
                    src={country.flags?.svg ?? country.flags?.png ?? ''}
                    alt={country.name.common}
                    width={44}
                    height={44}
                  />
                </div>
                <div className="h-1/2 flex flex-col justify-center flex-auto">
                  <h5
                    className="text-start underline pl-4 mt-3 font-bold text-sm leading-[18px] text-white sm:text-lg"
                    title={country.name.common}>
                    {country.name.common.length > 20
                      ? `${country.name.common.slice(0, 20)}...`
                      : `${country.name.common}`}
                  </h5>

                  <ul className="country-info text-start pl-4 flex flex-col justify-around h-full w-full p-1">
                    <li className="">
                      <span>Population: </span>
                      {country.population}
                    </li>
                    <li>
                      <span>Region: </span>
                      {country.region}
                    </li>
                    <li>
                      <span>Capital: </span>
                      {country.capital ?? 'N/A'}
                    </li>
                  </ul>
                </div>
              </div>
            </CountryLink>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CountriesDisplay;
