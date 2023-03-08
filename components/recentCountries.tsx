'use client';

import React, { useEffect, useState } from 'react'
import { fetchCountries } from './helpers/countryFetch';
import { Country } from '@app/page';
import { usePathname } from "next/navigation";
import Image from 'next/image';

interface CountryName {
  name?: string;
}

const initialState: CountryHistory = {
  value: [['', '']],
};

 function RecentCountries() {
  const name = usePathname();


  const [countries, setCountries] = useState<CountryHistory>(initialState);
  
  useEffect(() => {

    const fetchData = async () => {
      const fetchedCountries = await fetchCountries();
      
      const foundCountry = fetchedCountries.find((country) => country.name.common === name);
   
      setCountries((oldState) => {
        const newCountries = [
          ...(oldState.value || []), 
          [foundCountry?.name || '', foundCountry?.flags?.png||foundCountry?.flags?.svg || '']
        ];
        return { value: newCountries as [[string, string]] };
      });
    
      console.log(countries)
    };

    fetchData();
  }, [name]);

  return (
    <div className='flex dark:bg-slate-500 max-w-md'>
        {countries && countries.value?.map((c, index) => (
          <div key={`${c}-${index}`}>
            <h3>{c[1]}</h3>
            <Image height={24} width={24} src={`${c[1]}`} alt={`${c[0]}'s flag`} />
          </div>
        ))}
    </div>

  )
  }

export default RecentCountries;