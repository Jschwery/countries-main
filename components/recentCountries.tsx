'use client';

import React, { useEffect, useState } from 'react'
import { fetchCountries } from './helpers/countryFetch';
import { Country } from '@app/page';
import { CountryHistory } from '@global/features/countryHistory/countryHistorySlice';
import Image from 'next/dist/client/image';


interface CountryName {
    name?: string,
}

//  countryData.filter((country) => {
//                   const name = country.name.toString();
//                   return name.toLowerCase().includes(phrase.toLowerCase());
//                 }).map((c, iteration)=>{
//                   return(
//                     <CountryLink href={`/${c.name}`}>
//                    <li key={c.name+"-"+iteration} className='hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer h-[45px] flex align-baseline'>
//                     <Image alt='flag' width={48} height={35} className='  rounded-md px-1' src={`${c.flags.png||c.flags.svg}`}/>
//                     <div className='truncate self-center'>
//                       {c.name.length > 15 ? `${c.name.trim().slice(0,20)}...` : `${c.name}`}

{/* 
//[countriespage] will need to set the country name into the global state
//then it can be used by the recent countries */}


const initialState: CountryHistory = {
  value : [['', '']]
}

async function RecentCountries({name}: CountryName) {
  const fetchedCountries = await fetchCountries();
  const [countries, setCountries] = useState<CountryHistory>(initialState);

  useEffect(()=>{
    const foundCountry: Country | undefined = fetchedCountries.find((country) =>{
      country.name.common === name;
      if(foundCountry){
        setCountries([[foundCountry.name.common], [foundCountry.flags]])
      }


    })
  }, [])




  return (
    <div className='flex dark:bg-slate-500 max-w-md'>
        {countries && countries.value.map((c, index) => (
          <div key={`${c}-${index}`}>
            <h3>{c[1]}</h3>
            <img src={`${c[1]}`} alt={`${c[0]}'s flag`} />
          </div>
        ))}
    </div>

  )
}

export default RecentCountries;