'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, useTransition } from 'react';
import { countryData } from '@public/countryData';
import CountryLink from '../countryLink';
import Image from 'next/image';
import Loading from '@app/loading';

export default function Search({ disabled }: { disabled?: boolean }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [phrase, setPhrase] = useState('');
  const [phraseCopy, setPhraseCopy] = useState('');
  const router = useRouter();
  /*make it a dropdown from clicking a button*/
  function handleSearch(term: string) {
    setPhrase(term);
    setPhraseCopy(term);
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  const handleCountryListClick = (countryName: string) => {
    const country = countryData.find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

    if (country) {
      const countryUrl = `/${country.name.trim().split(' ').join('+')}`;
      router.push(countryUrl);
    }
  };

  function clearStates() {
    setPhrase('');
  }

  return (
    <div className="flex items-center">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div
        className=" relative"
        onMouseLeave={() => clearStates()}
        onMouseEnter={() => setPhrase(phraseCopy)}>
        {!phrase && (
          <MagnifyingGlassIcon className="absolute top-1/2 left-40 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          placeholder="Search by name..."
          spellCheck={false}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-[40px] mb-0 pb-0
           text-xl rounded bg-transparent focus:outline-none relative"
        />
        {phrase && (
          <div className=" absolute top-10  bg-slate-900 z-20  max-h-72 overflow-auto rounded">
            <ul className="">
              {countryData
                .filter((country) => {
                  const name = country.name.toString();
                  return name.toLowerCase().includes(phrase.toLowerCase());
                })
                .map((c, iteration) => {
                  return (
                    <li
                      key={c.name + '-' + iteration}
                      onClick={() => handleCountryListClick(c.name)}
                      className="hover:bg-slate-700 hover:opacity-60 p-2 leading-[24px] text-lg cursor-pointer h-[45px] flex align-baseline">
                      <Image
                        alt="flag"
                        width={48}
                        height={35}
                        className="rounded-md px-1"
                        src={`${c.flags.png || c.flags.svg}`}
                      />

                      <h5 title={c.name} className="truncate self-center">
                        {c.name.length > 15 ? `${c.name.trim().slice(0, 20)}...` : `${c.name}`}
                      </h5>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
