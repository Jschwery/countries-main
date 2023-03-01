import { Slider, styled } from '@mui/material'
import React, { ReactNode, Suspense } from 'react'
import CountryLink from '../components/countryLink'
import FilterComponent from '../components/filterComponent'
import SearchBar from '../components/searchBar'
import { fetchCountries } from './(helpers)/countryFetch'

type Props = {
  params?:{
    countryName?: string,
    countryRegion?: string,
    paginate?: number,
  }
  searchParams?:{
    q: string | undefined
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
  currencies?: { [key: string]: object[] },
  capital?: string[],
  languages?: { [key: string]: string },
maps?: {
  googleMaps?: string
}
}

const HomePage = async ({ searchParams }: Props) => {
  const q = searchParams?.q;

  
  const getCountries = async () => {
    try {
      const countries = await fetchCountries();
      return countries || []; // add defensive code to handle empty response
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  
  const countries = await getCountries();
  
  const filteredCountries = (q: string | undefined, countries: Country[]) => {
    const matchingQuery = countries.filter((country) => {
      const name = country.name.common
      if(name && name.toLowerCase().includes(q?.toLocaleLowerCase()??"")){
        return true;
      }
      return false;
    });
    return matchingQuery;
  };
  
  
  const filtered: Country[] = q && countries ? filteredCountries(q, countries) : countries;

  return (
    <>
    <div id='divWrapper' className='container mx-auto flex flex-wrap'>
    <div className=' w-[80%] mx-auto flex justify-center flex-wrap sm:justify-between items-baseline filters-column search-filter search-filter-md'>
        <SearchBar  />
        <div className=' bg-yellow-200 flex'>
          <FilterComponent  />
        </div>
    </div>
    
    {filtered.map((country, index) => (
      <div className=" flex mx-auto card-center">
        
      <CountryLink href={`/${(country.name.common.trim().split(' ').join('+'))}`}>
          <div key={`${country.name.common}-${index}`} className="country flex w-56 h-64 flex-col bg-slate-600 rounded-md shadow-md shadow-black m-4 cursor-pointer cards-sm">
            <div className="h-1/2 bg-gray-600 flex justify-center items-center rounded-md flex-auto">
              <img className="object-cover w-full h-full rounded-md" src={country.flags?.svg || country.flags?.png} alt={country.name.common} />
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
    </>
  ) 
}

export default HomePage;
