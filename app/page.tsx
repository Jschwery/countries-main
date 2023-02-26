import { count } from 'console'
import React, { Suspense } from 'react'
import CountryLink from '../components/countryLink'
import FilterComponent from '../components/filterComponent'
import SearchBar from '../components/searchBar'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

type Props = {
  params:{
    countryName?: string,
    countryRegion?: string,
    paginate?: number,
  }
  searchParams:{
    q?: string
  }
}
interface Country{
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

const HomePage = async ({searchParams: { q }} : Props) => {
  console.log("q: ", q); // check if q is being passed in correctly
  const fetchCountries = async (): Promise<any[]> => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all', {cache: 'force-cache'});
      if (!response.ok) {
        throw Error('could not fetch data');
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.log(e);
    }
    console.log('no data fetched, returning empty array from fetchCountries')
    return [];
  };
  
  const countries = await fetchCountries();
  const filteredCountries = (q: string | undefined, countries: Country[]) => {
    const matchingQuery = countries.filter((country) => {
      const name = country.name.common
      return name.toLowerCase().includes(q?.toLowerCase() ?? '');
    });
    return matchingQuery;
  };
  
  
  const filtered = q ? filteredCountries(q, countries) : countries;

  return (
    <>
    <div id='divWrapper' className='container mx-auto flex flex-wrap'>
    <div className='w-full m-4 flex justify-center flex-wrap sm:justify-between items-baseline'>
        <SearchBar />
        <FilterComponent />
    </div>
    
    {filtered.map((country, index) => (
      <div className=" flex mx-auto sm:mx-0">
        
      <CountryLink href={`/${country.name.common}`}>
          <div key={`${country.name.common}-${index}`} className="country flex w-56 h-64 flex-col bg-slate-600 rounded-md shadow-md shadow-black m-4 cursor-pointer">
            <div className="h-1/2 bg-gray-600 flex justify-center items-center rounded-md flex-auto">
              <img className="object-cover w-full h-full rounded-md" src={country.flags.svg || country.flags.png} alt={country.name.common} />
            </div>
            <div className="h-1/2 flex flex-col justify-center flex-auto">
              <h5 className="text-start pl-4 py-1 text-sm mb-1 leading-3 text-white">{country.name.common}</h5>
              <ul className="text-start pl-4">
                <li>
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