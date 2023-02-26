'use client';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';

function FilterComponent() {
  const [phrase, setPhrase] = useState('');
  const [phraseCopy, setPhraseCopy] = useState('');
  const [active, setActive] = useState(false);
  // const { replace } = useRouter();

  const filterOptions = [
    { filterType: 'Population' },
    { filterType: 'Region' },
    { filterType: 'Currency' },
    { filterType: 'Borders' },
  ];


  function handleSearch(term: string) {
    setPhrase(term);
    setPhraseCopy(term);
  }

  const stateReset = () => {
    setActive(false);
    setPhrase('');
  };

  const stateReenter = () => {
    setPhrase(phraseCopy);
  };

  return (
    <div className="relative mt-5" onMouseLeave={stateReset} onMouseEnter={stateReenter}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative bg-yellow-300">
        <input
          type="text"
          name="search"
          value={phraseCopy}
          id="search"
          placeholder="Search by name..."
          spellCheck={false}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-[40px] text-xl rounded bg-transparent focus:outline-none relative"
        />
        {(phrase || active) && !(phrase && active) && (
          <div className="absolute top-10 bg-slate-900 z-20 max-h-72 overflow-auto rounded w-44">
            <ul className="">
              {filterOptions.map((c) => {
                return (
                  <li className="hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer flex truncate">
                    {c.filterType.valueOf() === 'Borders' ? (
                      <a>
                        {c.filterType}
                        {/*get matching*/}
                        hello!!
                      </a>
                    ) : (
                      c.filterType
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <ArrowDownCircleIcon
        className="absolute top-1/2 left-40 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
        onClick={() => setActive(!active)}
      />
    </div>
  );
}

export default FilterComponent;
