'use client';

import React, { useEffect, useState } from 'react';
import { fetchCountries } from './helpers/countryFetch';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useGlobalContext } from '@global/provider';

interface CountryName {
  name?: string;
}

function RecentCountries({ name }: CountryName) {
  return (
    <div className="flex dark:bg-slate-500 max-w-md">
      {/* {state.globalCountries.map((country, iteration) => {
        return (
          <Link key={`${country.name}-${iteration}`} href={`/${(country.name.common.trim().split(' ').join('+'))}`}>
            {country.name.common}
          </Link>
        );
      })} */}
    </div>
  );
}

export default RecentCountries;
