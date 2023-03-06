'use client';

import React, { useEffect, useState } from 'react'
import { fetchCountries } from './helpers/countryFetch';

interface CountryHistory {
    name: string,
}
/*
 countryData.filter((country) => {
                  const name = country.name.toString();
                  return name.toLowerCase().includes(phrase.toLowerCase());
                }).map((c, iteration)=>{
                  return(
                    <CountryLink href={`/${c.name}`}>
                   <li key={c.name+"-"+iteration} className='hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer h-[45px] flex align-baseline'>
                    <Image alt='flag' width={48} height={35} className='  rounded-md px-1' src={`${c.flags.png||c.flags.svg}`}/>
                    <div className='truncate self-center'>
                      {c.name.length > 15 ? `${c.name.trim().slice(0,20)}...` : `${c.name}`}
*/

useEffect(()=>{

}, [])

async function RecentCountries({name}: CountryHistory) {
    const fetchedCountries = await fetchCountries();

    const [countries, setCountries] = useState<CountryHistory[]>([]);

  return (
    <div className='flex dark:bg-slate-500 max-w-md'>
        {countries && countries.map((c, index) => (
            <div key={`${c.name}-${index}`}>{c.name}</div>
        ))}
    </div>

  )
}

export default RecentCountries;