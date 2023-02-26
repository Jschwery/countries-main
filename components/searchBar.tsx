'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { countryData } from '../public/countryData';
import CountryLink from './countryLink';

export default function Search({ disabled }: { disabled?: boolean }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [phrase, setPhrase] = useState('');

 /*just make it a dropdown from clicking a button*/
  function handleSearch(term: string) {
    setPhrase(term);
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

  return (
    
    <div className="relative mt-5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className=' relative bg-yellow-300'>
      {!phrase && <MagnifyingGlassIcon className='absolute top-1/2 left-40 transform -translate-y-1/2 w-5 h-5 text-gray-400'/>
      }
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          placeholder="Search by name..."
          spellCheck={false}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-[40px] text-xl rounded bg-transparent focus:outline-none relative"
        />
       {phrase && (
          <div className=' absolute top-10  bg-slate-900 z-20  max-h-72 overflow-auto rounded'>
            <ul className=''>
              {
                countryData.filter((country) => {
                  const name = country.name.toString();
                  return name.toLowerCase().includes(phrase.toLowerCase());
                }).map((c)=>{
                  return(
                    <CountryLink href={`/${c.name}`}>
                   <li className='hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer flex truncate'>
                    <img className=' rounded w-12 mr-2' src={`${c.flags.png||c.flags.svg}`}></img>
                    <div className='truncate'>
                      {c.name.length > 15 ? `${c.name.slice(0,20)}...` : `${c.name}`}
                    </div>
                   </li>
                   </CountryLink>
                  )
                })
              }
            
            </ul>
          </div>
        )}
        </div>
      </div>
            
  );
            
}
