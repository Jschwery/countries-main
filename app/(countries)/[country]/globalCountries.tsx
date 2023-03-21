'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGlobalContext } from '@global/provider';
import { fetchCountries } from '@components/helpers/countryFetch';
import { countryData } from '@public/countryData';
import Link from 'next/link';

interface CountryName {
  name?: string;
}

function GlobalCountries({ name }: CountryName) {
  const { state, dispatch } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountries = await fetchCountries();
        const foundCountry = fetchedCountries.find((country) => country.name.common === name);
        if (foundCountry) {
          dispatch({ type: 'ADD_COUNTRY', payload: foundCountry });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [name, dispatch]);

  console.log(state.globalCountries);
  return <></>;
}

export default GlobalCountries;
