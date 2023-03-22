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
  console.log('the countries display is here: ' + countries.length);

  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

  useEffect(() => {
    console.log(
      'filtered countries length:' +
        filteredCountries.length +
        '\ncountries length from props: ' +
        countries.length
    );

    setFilteredCountries(countries);
  }, [countries]);

  //need fallback if there is no
  const filterCallback = (filterOptions: FilterOptions[]) => {
    if (filterOptions.some((option) => option.active)) {
      const countriesFiltered = filteredCountries.filter((country) => {
        return filterOptions.every((filter) => {
          switch (filter.filterName.toLocaleLowerCase()) {
            case 'region':
              console.log('top level region display');

              return (
                filter.value &&
                typeof filter.value === 'object' &&
                (filter.value as string[]).includes(country?.region || '')
              );
            case 'borders':
              console.log('top level region display');
              return (
                country.borders &&
                country.borders.every((border) =>
                  (filter.value as string[]).some(
                    (filterValue) => filterValue.toLowerCase() === border.toLowerCase()
                  )
                )
              );
            case 'population':
              console.log('top level region display');
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
      console.log('within else');

      setFilteredCountries(countries);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-wrap pt-5">
        <div className="w-[90%] flex mx-auto flex-wrap changeCol mb-3">
          <div className="w-[50%] min-w-[200px] bg-yellow-300">
            <div className="flex flex-col align-middle">
              <SearchBar />
            </div>
          </div>
          <div className="w-[50%] min-w-[250px] bg-purple-600 flex items-end">
            <FilterComponent filterCallback={filterCallback} />
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
