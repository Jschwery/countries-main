import React, { Suspense } from 'react';
import { countryData } from '@public/countryData';
import { Country } from '@global/interfaces';
import { CountryLong } from '@global/interfaces';
import { fetchCountries } from '@components/helpers/countryFetch';
import RecentCountries from '@components/recentCountries';
import Image from 'next/image';
import GlobalCountries from './globalCountries';
import { MapForCountry } from './mapForCountry';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import AddonBar from './addonBar';

interface CountryProps {
  params: {
    country: string;
  };
}

function CountryHome({ params: { country } }: CountryProps) {
  const foundCountry = countryData.find(
    (c) =>
      c.name.toLowerCase().trim().split(' ').join('+') === decodeURIComponent(country).toLowerCase()
  );

  console.log('the found country name is: ' + foundCountry?.name.toLowerCase());

  return (
    <div className="flex flex-wrap flex-col sm:flex-row items-center w-screen h-full justify-center">
      {/* <div className="w-full flex items-center justify-center ">
        <MapForCountry name={foundCountry?.name.toLowerCase()} />
      </div> */}
      <div className="w-full flex items-center justify-center ">
        <AddonBar countryName={foundCountry?.name} />
      </div>
      {/*within the */}
      <div className="w-[50%] min-w-[300px] flex md:mt-1">
        <Image
          height={50}
          width={50}
          src={foundCountry?.flag ?? ''}
          className="w-full h-full min-h-[180px] max-h-[215px] m-4 rounded-md object-cover"
          alt={`${foundCountry?.name}'s Flag `}
        />
      </div>
      <div className="p-4 rounded-md w-[50%] leading-8 sm:w-[40%] min-w-[300px] flex justify-start items-start">
        <ul
          id="country-cat"
          className="flex flex-wrap justify-start items-start flex-col w-full max-h-[280px] max-w-[250px]">
          <li className="">
            <span className=" font-bold">Native Name:</span> {foundCountry?.nativeName}
          </li>
          <li className="">
            <span className=" font-bold">Population:</span> {foundCountry?.population}
          </li>
          <li className="">
            <span className=" font-bold">Region:</span> {foundCountry?.region}
          </li>
          <li className="">
            <span className=" font-bold">Capital:</span> {foundCountry?.capital}
          </li>
          <li className="">
            <span className=" font-bold">Top Level Domain:</span> {foundCountry?.topLevelDomain}
          </li>
          <ul>
            {foundCountry?.currencies?.map((currency) => (
              <li key={currency.code}>
                {' '}
                <span className=" font-bold">Currency:</span> {currency.name} - {currency.symbol}
              </li>
            ))}
          </ul>
          <ul>
            {foundCountry?.languages?.map((language, index) => (
              <li key={`${language.name}-${index}`}>Name: {language.name}</li>
            ))}
          </ul>
        </ul>
        <GlobalCountries name={foundCountry?.name} />
      </div>
    </div>
  );
}
//Creates the paths for each of the countries at build time, enabling them to be statically rendered and near instant load times
export async function generateStaticParams() {
  const fetchedCountries: Country[] = await fetchCountries();
  return fetchedCountries.map((c) => {
    return {
      country: c.name.common.trim().split(' ').join('+')
    };
  });
}

export default CountryHome;
