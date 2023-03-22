import { Slider, styled } from '@mui/material';
import React, { ReactNode, Suspense } from 'react';
import CountryLink from '@components/countryLink';
import FilterComponent from '@components/filters/filterComponent';
import SearchBar from '@components/filters/searchBar';
import _ from 'lodash';
import TablePaginationDemo from '@components/filters/paginate';
import { getCountries } from '@components/helpers/fetchcountries';
import Image from 'next/image';
import CountriesDisplay from '@components/countriesDisplay';

type Props = {
  props?: {
    countryName?: string;
    countryRegion?: string;
    paginate?: number;
    borders?: string[];
    currency?: string[];
  };
  searchParams?: {
    q?: string;
  };
};
export interface Country {
  name: {
    common: string;
  };
  region?: string;
  borders?: string[];
  population?: number;
  flags?: {
    png: string;
    svg: string;
  };
  capital?: string[];
  languages?: { [key: string]: string };
  maps?: {
    googleMaps?: string;
  };
}

const HomePage = async ({ searchParams }: Props) => {
  //check if there is both query and props,
  //query first because it gets whole array
  const filterCheckAndApply = (q: string | undefined, countries: Country[]) => {
    let filteredCountries: Country[] = countries;
    if (q !== undefined) {
      if (q.length > 0) {
        //if there are props
        filteredCountries = queryFilter(filteredCountries, { q });
      } else if (q.length > 0) {
        filteredCountries = queryFilter(filteredCountries, { q });
      }
      if (filteredCountries.length === 0) {
        console.log('No countries match the specified filters and query params.');
      }
    }
    return filteredCountries;
  };

  // Apply additional filter based on searchParams.q
  const queryFilter = (filtered: Country[], searchParams?: { q: string }) => {
    if (searchParams?.q && searchParams.q.length > 0) {
      return filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchParams.q.toLowerCase())
      );
    }
    return filtered;
  };

  const countriesFetched: Country[] = await getCountries();
  const countriesFiltered: Country[] = filterCheckAndApply(searchParams?.q, countriesFetched);

  console.log('filtered: ' + countriesFiltered.length);

  return (
    <>
      <CountriesDisplay countries={countriesFiltered} />
    </>
  );
};

export default HomePage;
