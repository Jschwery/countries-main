import React from 'react'
import { countryData } from '../../../public/countryData'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { Country } from '../../page';
import { fetchCountries } from '../../(helpers)/countryFetch';

interface CountryProps{
  params:{
    country: string,
  }
}

function CountryHome({ params: { country } }: CountryProps) {

  console.log(country)

  const foundCountry = countryData.find(
    (c) => c.name.toLowerCase().trim().split(' ').join('+') === decodeURIComponent(country).toLowerCase()
  );

  return (
    <div className=' flex flex-col md:flex-row md:items-center w-screen h-screen justify-center items-center'> 
        <div className='w-[50%] min-w-[300px]'>
          <img src={foundCountry?.flag} className='w-full m-4 rounded' alt={`${foundCountry?.name}'s Flag `} />
        </div>
        <div className= 'p-4 rounded-md w-[50%] min-w-[225px] md:leading-8 md:w-[40%]'>
         <ul id='country-cat' className='flex flex-col md: mx-auto md:p-5'>
         <li className=''>
            <span className=' font-bold'>Native Name:</span> {foundCountry?.nativeName}
          </li>
          <li className=''>
            <span className=' font-bold'>Population:</span> {foundCountry?.population}
          </li>
          <li className=''>
            <span className=' font-bold'>Region:</span> {foundCountry?.region}
          </li>
          <li className=''>
            <span className=' font-bold'>Capital:</span> {foundCountry?.capital}
          </li>
          <li className=''>
            <span className=' font-bold'>Top Level Domain:</span> {foundCountry?.topLevelDomain}
          </li>
          <ul>
            {foundCountry?.currencies?.map((currency) => (
              <li key={currency.code}> <span className=' font-bold'>Currency:</span> {currency.name} - {currency.symbol}</li>
            ))}
          </ul>
          <ul>
            {foundCountry?.languages?.map((language, index) => (
              <li key={`${language.name}-${index}`}>Name: {language.name}</li>
            ))}
          </ul>
         </ul>
        </div>
    </div>
  )
}
//Creates the paths for each of the countries at build time, enabling them to be statically rendered and near instant load times
export async function generateStaticParams(){
  const fetchedCountries:Country[] = await fetchCountries();
  return fetchedCountries.map((c)=>{
    return {
        country: c.name.common.trim().split(' ').join('+')
    };
  })
}

export default CountryHome;