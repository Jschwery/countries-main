'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useState, useTransition } from 'react';
import { countryData } from '@public/countryData';
import CountryLink from './countryLink';
import Image from 'next/image';
import Loading from '@app/loading';

export default function Search({ disabled }: { disabled?: boolean }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [phrase, setPhrase] = useState('');
  const [phraseCopy, setPhraseCopy] = useState('');

 /*just make it a dropdown from clicking a button*/
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

  function clearStates(){
    setPhrase('');
  }

  /**
   * TODO
   * fix links with countries containing spaces
   * add paginate option
   * get filters working
   * tune layout of flags page
   * 
   * create oauth with google
   * add option to like countries
   * add a quiz
   * add mui stats
   */

  return (
    
    <div className="relative mt-5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className=' relative' onMouseLeave={()=> clearStates()} onMouseEnter={() => setPhrase(phraseCopy)}>
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
          className="h-[40px] mb-0 pb-0
           text-xl rounded bg-transparent focus:outline-none relative"
          
        />
       {phrase && (
          <div className=' absolute top-10  bg-slate-900 z-20  max-h-72 overflow-auto rounded'>
            <ul className=''>
              {
                countryData.filter((country) => {
                  const name = country.name.toString();
                  return name.toLowerCase().includes(phrase.toLowerCase());
                }).map((c, iteration)=>{
                  return(
                    <CountryLink key={c.name+"-"+iteration} href={`/${c.name}`}>
                   <li className='hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer h-[45px] flex align-baseline'>
                    <Image alt='flag' width={48} height={35} className='  rounded-md px-1' src={`${c.flags.png||c.flags.svg}`}/>
                    <div className='truncate self-center'>
                      {c.name.length > 15 ? `${c.name.trim().slice(0,20)}...` : `${c.name}`}
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
