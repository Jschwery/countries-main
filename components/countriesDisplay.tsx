'use client';
import CountryLink from '@components/countryLink';
import FilterComponent, { FilterOptions } from '@components/filters/filterComponent';
import TablePaginationDemo from '@components/filters/paginate';
import SearchBar from '@components/filters/searchBar';
import React, { useEffect, useState } from 'react';
import { Country } from '../app/page';
import Image from 'next/image';

export function fltrObjectAndIndex(filterName: String, filterOptions: FilterOptions[]) {
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
  const [resultCount, setResultCount] = useState(countries.length);
  const [countryFilters, setCountryFilters] = useState<FilterOptions[]>([]);

  /*
this is the top display, 

if the filter component, which has the information from each of the filters, such as the population slider, and borders
that has access to whether or not the sliders 


*/

  const filterCallback = (
    filterOptions: FilterOptions[],
  ) => {
    useEffect(() => {
       setCountryFilters(filterOptions))

    }

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
              <FilterComponent />
            </div>
          </div>
          <div className="w-full flex justify-center pt-4 sm:pt-0 align-middle">
            <TablePaginationDemo resultCount={countries.length} />
          </div>
          {countries.map((country, index) => (
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
  };
}
export default CountriesDisplay;
