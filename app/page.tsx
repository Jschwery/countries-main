import { Slider, styled } from '@mui/material'
import React, { ReactNode, Suspense } from 'react'
import CountryLink from '@components/countryLink'
import FilterComponent from '@components/filterComponent'
import SearchBar from '@components/searchBar'
import _ from 'lodash';
import TablePaginationDemo from '@components/paginate'
import { getCountries } from '@components/helpers/fetchcountries'
import Image from 'next/image'
import CountriesDisplay from './countriesDisplay'

type Props = {
  props?:{
    countryName?: string,
    countryRegion?: string,
    paginate?: number,
    borders?: string[],
    currency?: string[]
  }
  searchParams?:{
    q?: string
  }
}
export interface Country{
  name: {
    common: string;
  }
  region?: string,
  borders?: string[],
  population?: number,
  flags?:{
    png: string,
    svg: string
  }
  capital?: string[],
  languages?: { [key: string]: string },
maps?: {
  googleMaps?: string
}
}

const HomePage = async ({ searchParams, props }: Props) => {
  
  //check if there is both query and props,
  //query first because it gets whole array
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
  
  
  /*takes array of countries, and an array of filters(functions)
  returns a list of filtered countries based on the filters provided
  each filter is applied to every single country via the .every() 
  */
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
  
    // Apply additional filter based on searchParams.q
    const queryFilter = (filtered: Country[],searchParams?: { q: string }) => {
      if (searchParams?.q && searchParams.q.length > 0) {
        return filtered.filter((country) =>
          country.name.common.toLowerCase().includes(searchParams.q.toLowerCase())
        );
      }
      return filtered;
    };
  
  const countriesFetched: Country[] = await getCountries()
  const countriesFiltered: Country[] = filterCheckAndApply(searchParams?.q, props, countriesFetched);
  

  return (
    <>
      <CountriesDisplay countries={countriesFiltered} />
    </>
  )
}

export default HomePage;
