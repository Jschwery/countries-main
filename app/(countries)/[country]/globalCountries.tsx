'use client';

import React, { useEffect, useState } from 'react'
import { Country } from '@app/page';
import { addCountryHistory, CountryHistory } from '@global/features/countryHistory/countryHistorySlice';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@global/store';
import { countryData } from '@public/countryData';


interface CountryName {
  name?: string;
}


 function GlobalCountries({name}: CountryName) {
  const countryHistory: CountryHistory = useSelector((state: RootState ) => state.countryHistory);
  const dispatch = useDispatch();

 const foundCountry = countryData.find(
    (c) => {
        return c.name.toLowerCase() === name?.toLowerCase();
    }
);

useEffect(() => {
    if (foundCountry) { 
      dispatch(addCountryHistory([foundCountry?.name, foundCountry?.flags.svg || foundCountry?.flags.png]));
    }
  }, [dispatch, foundCountry]);


  return (
  <p></p>
  )
 }

export default GlobalCountries;