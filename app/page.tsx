import { Slider, styled } from '@mui/material'
import React, { ReactNode, Suspense } from 'react'
import CountryLink from '../components/countryLink'
import FilterComponent from '../components/filterComponent'
import SearchBar from '../components/searchBar'
import { fetchCountries } from './(helpers)/countryFetch'

type Props = {
  props?:{
    countryName?: string,
    countryRegion?: string,
    paginate?: number,
    borders?: string[],
    currency?: string
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

const HomePage = async ({ searchParams, props }: Props) => {

  const getCountries = async () => {
    try {
      const countries = await fetchCountries();
      return countries || []; 
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  
  const countries = await getCountries();

  const filteredCountries = (props: Props = {}, searchParams: Props["searchParams"] = "" || undefined, countries: Country[]) => {

    



  }
  
  

    const filtered = props && searchParams && countries ? filteredCountries(props, searchParams, countries) :

    const matchingQuery = countries.filter((country) => {
      const name = country.name.common
      if(name && name.toLowerCase().includes(searchParams?.q?.toLocaleLowerCase()??"")){
        return true;
      }
      return false;
    });
    return matchingQuery;
  };
  
  //if we have props and search params then we need to filter with both of them, else filter with whichever
  // const filtered: Country[] = (props && searchParams && countries ? filteredCountries(props, searchParams, countries) : countries ) ?? (props || searchParams)


  // const filtered: Country[] = (searchParams?.q ?? (props?.borders || props?.countryRegion || props?.currency 
  //   || props?.paginate !== undefined) && countries
  //   ? filteredCountries(searchParams?.q, countries.filter((country) => 
  //     (props?.borders ? country.borders.includes(props.borders) : true) && 
  //     (props?.countryRegion ? country.region === props.countryRegion : true)
  //     // add any other prop checks here
  //   ))
  //   : countries;
  

  return (
    <>
    <div id='divWrapper' className='container mx-auto flex flex-wrap'>
    <div className=' w-[80%] mx-auto flex justify-center flex-wrap sm:justify-between items-baseline 
    filters-column search-filter search-filter-md'>
        <SearchBar  />
        <div className=' bg-yellow-200 flex'>
          <FilterComponent  />
        </div>
    </div>
    
    {filtered.map((country, index) => (
      <div className=" flex mx-auto card-center">
        
      <CountryLink href={`/${(country.name.common.trim().split(' ').join('+'))}`}>
          <div key={`${country.name.common}-${index}`} className="country flex w-56 h-64 flex-col bg-slate-600 
          rounded-md shadow-md shadow-black m-4 cursor-pointer cards-sm">
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
//countryname countryregion paginate
//these will all be globalstate
//need to create a redux slice of each of those



// export async function getServerSideProps(){


  
//   return { props:
//      { 
//       countryName: ,
//       countryRegion: ,
//       paginate: , } 
// }

export default HomePage;
