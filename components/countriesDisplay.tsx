'use client';
import CountryLink from '@components/countryLink'
import FilterComponent, { FilterOptions } from '@components/filters/filterComponent'
import TablePaginationDemo from '@components/filters/paginate'
import SearchBar from '@components/filters/searchBar'
import React, { useEffect, useState } from 'react'
import { Country } from '../app/page'
import Image from 'next/image'
import { FilterOption, Filter } from '@components/filters/filterComponent';

function CountriesDisplay({countries}: {countries: Country[]}) {

//get the filters from the filter component
//this will be done passing a callback function, which has the same shape as the array of filters

//the callback should take the filters from the child component and add them to state
//in order to keep updating the state of the parent component, the callback needs the setfilters within it

const [resultCount, setResultCount] = useState(countries.length);
const [countryFilters, setCountryFilters] = useState<FilterOption[]>([])

const filterCallback = (filterOptions: FilterOptions) =>{
  //useEffect to call the setResult each time the result changes
  useEffect(()=>{
    if(removeFilter){
      const indexToUpdate = filterOptions.findIndex((option) => 
      option.filterType.toLocaleLowerCase() === removeFilter.toLocaleLowerCase()
    );
    switch(removeFilter.toLocaleLowerCase()){
      case "population":
        
      const updatedOptionPopulation = {
        ...filterOptions[indexToUpdate],
        value: population ?? [0,0], 
        active: true, 
        filterEdit: false
        
      };
      const updatedOptionsPopulation = [
        ...options.slice(0, indexToUpdate),
        updatedOptionPopulation,
        ...options.slice(indexToUpdate + 1),
      ];
      setOptions(updatedOptionsPopulation);
      break;   
      case "region":
      const updatedOptionRegion = {
        ...filterOptions[indexToUpdate],
        value: bordersOrRegion ?? [], 
        active: true, 
        filterEdit: false,
      };
      const updatedOptions = [
        ...options.slice(0, indexToUpdate),
        updatedOptionRegion,
        ...options.slice(indexToUpdate + 1),
      ];
      setOptions(updatedOptions);
      break;   
      case "border":
      const updatedOptionBorders = {
        ...filterOptions[indexToUpdate],

        value: bordersOrRegion ?? [], 
        active: true,
        filterEdit: false,
      };
      const updatedOptionsBorders = [
        ...options.slice(0, indexToUpdate),
        updatedOptionBorders,
        ...options.slice(indexToUpdate + 1),
      ];
      setOptions(updatedOptionsBorders);
      break;   
    }
  }

  }


  },[filterOptions, removeFilter])


}




const filterCheckAndApply = (q: string|undefined, props: Props['props'], countries: Country[])=>{
  let filteredCountries: Country[] = countries;
  if (q !== undefined){
  if (props && q.length>0) {//if there are props 
    filteredCountries = queryFilter(filteredCountries, {q});
    filteredCountries = filterCountries(filteredCountries, filtersPassed);
  }
  else if(q.length > 0) {
    filteredCountries = queryFilter(filteredCountries, {q});
  }
  else if (props){
      filteredCountries = filterCountries(filteredCountries, filtersPassed);
  }
  if (filteredCountries.length === 0) {
    console.log('No countries match the specified filters and query params.');
  }
}
  return filteredCountries;
}


  type Filter = {
    key: string,
    filterAction: (c: Country, index?: number, countries?: Country[]) => boolean,
  };

  const filtersPassed: Filter[] = Object.keys(props || {}).reduce((filters: Filter[], key) => {
    switch (key) {
      case 'countryRegion':
        filters.push({
          key,
          filterAction: (c: Country) => {
            return c.region === props?.countryRegion
          }
        });
        break;
        case 'borders':
          filters.push({
            key,
            filterAction: (c: Country, index?: number, countries?: Country[]) => {
              const { borders } = props || {};//get borders from props
              if (borders && borders.length > 0) {
                return borders.every((border) => c.borders?.includes(border));
              }
              return true;
            }
          });
          break;         
      default:
        throw new Error(`Invalid prop key: ${key}`);
    }
    return filters;
  }, []);
  
  const filterCountries = (countries: Country[], filters: Filter[]): Country[] => { 
    return _.filter(countries, (country, index) => {//takes in countries list
      return filters.every((filter) => {//each filter applied to the countries
        const { key, filterAction } = filter; //each filter in the array
        switch (key) {//for each filter we will apply it on every country
          case 'region':
            return filterAction(country, undefined, countries);
          case 'borders':
            return filterAction(country, undefined, countries);
          default:
            return true;
        }
      });
    });
  };
  

  useEffect(() => {
    setResultCount(countries.length);
    console.log('countries display: '+ countries.length);
  }, [countries]);
  return (
    <div>
    <div className='w-full flex flex-wrap pt-5'>
      <div className='w-[90%] flex mx-auto flex-wrap changeCol mb-3'>
        <div className='w-[50%] min-w-[200px] bg-yellow-300'>
          <div className='flex flex-col align-middle'>
            <SearchBar />
          </div>
        </div>
        <div className='w-[50%] min-w-[250px] bg-purple-600 flex items-end'>
          <FilterComponent />
        </div>
      </div>
      <div className='w-full flex justify-center pt-4 sm:pt-0 align-middle'>
          <TablePaginationDemo resultCount={countries.length} />
      </div>
    {countries.map((country, index) => (
      <div key={`${country.name.common}-${index}`} className="flex mx-auto card-center">
        
      <CountryLink href={`/${(country.name.common.trim().split(' ').join('+'))}`}>
          <div className="country flex w-56 h-64 flex-col bg-slate-600 
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
                {country.name.common.length > 20 ? `${country.name.common.slice(0,20)}...` : `${country.name.common}`}</h5>
              <ul className="country-info text-start pl-4">
                <li className=''>
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
  )
}

export default CountriesDisplay