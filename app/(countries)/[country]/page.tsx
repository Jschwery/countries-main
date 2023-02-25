import React from 'react'
import { countryData } from '../../../public/countryData'
import useLocalStorage from '../../../hooks/useLocalStorage'
interface CountryProps{
  params:{
    country: string,
  }

}


function CountryHome({ params: { country } }: CountryProps) {
  
  
  const foundCountry = countryData.find((c) => c.name === country);


  return (
    <div className=' flex flex-col md:flex-row w-screen h-screen'> 
        <div className=' w-[80%]'>
          <img src={foundCountry?.flag} className='w-full md:w-6/12' alt={`${foundCountry?.name}'s Flag `} />
        </div>

        <div className= 'p-4 rounded-md'>
         <ul>
         <li className='text-black'>
            <span className=' font-bold'>Native Name:</span> {foundCountry?.nativeName}
          </li>
          <li className='text-black'>
            <span className=' font-bold'>Population:</span> {foundCountry?.population}
          </li>
          <li className='text-black'>
            <span className=' font-bold'>Region:</span> {foundCountry?.region}
          </li>
          <li className='text-black'>
            <span className=' font-bold'>Capital:</span> {foundCountry?.capital}
          </li>
          <li className='text-black'>
            <span className=' font-bold'>Top Level Domain:</span> {foundCountry?.topLevelDomain}
          </li>
          <ul>
            {foundCountry?.currencies?.map((currency) => (
              <li key={currency.code}> <span className=' font-bold'>Currency:</span> {currency.name} - {currency.symbol}</li>
            ))}
          </ul>
          <ul>
            {foundCountry?.languages?.map((language) => (
              <li key={language.iso639_1}>Name: {language.name}</li>
            ))}
          </ul>
         </ul>
        </div>
    </div>
//border countries need to pair with other text attributes:
/*
  <ul>
            {foundCountry?.languages?.map((language) => (
              <li key={language.iso639_1}>Name: {language.name}</li>
            ))}
          </ul>
*/
  )
}

export async function generateStaticParams(){
  return countryData.map((c) =>({
    country: c.name,
  }));


}


export default CountryHome;