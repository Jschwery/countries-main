'use client';
import CountryLink from '@components/countryLink';
import FilterComponent, { FilterOptions } from '@components/filters/filterComponent';
import TablePaginationDemo from '@components/filters/paginate';
import SearchBar from '@components/filters/searchBar';
import React, { useEffect, useState } from 'react';
import { Country } from '../app/page';
import Image from 'next/image';

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
  console.log('the countries display is from CountriesDisplay Prop ' + countries.length);

  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);
  const [searchWidth, setSearchWidth] = useState(false);

  useEffect(() => {
    console.log('the countries length is: ' + countries.length);

    setFilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    console.log('the filtered countries length is: ' + filteredCountries.length);
  }, [filteredCountries]);

  const filterCallback = (filterOptions: FilterOptions[]) => {
    console.log('within the COUNTRY DISPLAY FILTER CALLBACK IMPORTANT!!!!!!!!!!!!!!!!!!!!!!');
    filterOptions.forEach((op) => console.log(op.filterName + ' is it active?: ' + op.active));

    if (filterOptions.some((option) => option.active)) {
      const countriesFiltered = filteredCountries.filter((country) => {
        return filterOptions.every((filter) => {
          switch (filter.filterName.toLocaleLowerCase()) {
            case 'region':
              return (
                filter.value &&
                typeof filter.value === 'object' &&
                (filter.value as string[]).includes(country?.region || '')
              );
            case 'borders':
              return (
                country.borders &&
                country.borders.every((border) =>
                  (filter.value as string[]).some(
                    (filterValue) => filterValue.toLowerCase() === border.toLowerCase()
                  )
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
      });
      setFilteredCountries(countriesFiltered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const handleSetSearchWidth = (setWidth: boolean) => {
    setWidth ? setSearchWidth(!searchWidth) : setSearchWidth(false);
  };

  return (
    <div>
      <div className="w-full flex flex-wrap pt-5">
        <div className="w-[90%] flex mx-auto flex-wrap changeCol mb-2">
          <div className="w-[50%] min-w-[200px]">
            <div
              className={`flex flex-col items-start md:items-baseline justify-center h-full mt-2 ${
                searchWidth ? 'ml-[28px] md:ml-0' : ''
              }`}>
              <SearchBar />
            </div>
          </div>

          <div className="w-[50%] min-w-[250px] flex items-start md:items-end">
            <FilterComponent
              filterCallback={filterCallback}
              setSearchWidth={handleSetSearchWidth}
            />
          </div>
        </div>
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
                  <h5 className="text-start pl-4 py-1 text-sm mb-1 leading-3 text-white sm:text-lg">
                    {country.name.common.length > 20
                      ? `${country.name.common.slice(0, 20)}...`
                      : `${country.name.common}`}
                  </h5>
                  <ul className="country-info text-start pl-4">
                    <li className="">
                      <span>Population:</span>
                      {country.population}
                    </li>
                    <li>
                      <span>Region:</span>
                      {country.region}
                    </li>
                    <li>
                      <span>Capital: </span>
                      {country.capital}
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
