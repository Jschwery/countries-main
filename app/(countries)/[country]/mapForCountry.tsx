'use client';
import { useEffect, useState } from 'react';
import { countryData } from '@public/countryData';
import Skeleton from 'react-loading-skeleton';
import { SkeletonLoad } from '@components/misc/skeletonBuilder';

interface MapForCountryProps {
  name: string | undefined;
}
export function MapForCountry({ name }: MapForCountryProps) {
  useEffect(() => {
    console.log('passed in country name: ' + name);
  }, []);

  const foundCountry = countryData.find((c) => c.name.toLowerCase() === name?.toLowerCase());

  useEffect(() => {
    console.log('found country: ');
    console.log(foundCountry);
    console.log('\nfound country name: ' + foundCountry?.name);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const lat = foundCountry?.latlng ? foundCountry?.latlng[0] : undefined;
  const long = foundCountry?.latlng ? foundCountry?.latlng[1] : undefined;
  return (
    <div className="flex flex-col md:flex-row md:items-center w-[75%] h-full justify-center items-center">
      {isLoading && <SkeletonLoad className="w-full h-full" />}
      <iframe
        onLoad={() => setIsLoading(false)}
        allowFullScreen
        className={`w-full rounded-sm h-full max-w-[350px] mt-4 bg-slate-600 shadow-md shadow-slate-800 ${
          isLoading ? 'hidden' : ''
        }`}
        src={`https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${lat},${long}&zoom=5`}></iframe>
    </div>
  );
}
