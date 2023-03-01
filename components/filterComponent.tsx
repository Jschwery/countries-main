'use client';
import React, { useState } from 'react'



function filterComponent() {

  const[option, setOption] = useState('');

  const filterOptions = [
    { filterType: 'Population' },
    { filterType: 'Region' },
    { filterType: 'Currency' },
    { filterType: 'Borders' },
  ];

  return (
<div className="relative inline-block text-left filter-spacing">
  <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300  hover:border-lime-600 shadow-sm px-4 py-2 dark:bg-slate-700 bg-white text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 text-white  focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
    Filters
    <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" clip-rule="evenodd" />
    </svg>
  </button>

  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-700 filters-sm">
  <div className="py-1 transition duration-500 ease-in border-transparent hover:border-lime-500
  " role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
      {
          <ul className="">
          {filterOptions
            .map((option) => (
              <li className="hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer flex truncate">
                {option.filterType === 'Borders' ? (
                  <a>
                    {option.filterType}
                    {/*get matching*/}
                    hello!!
                  </a>
                ) : (
                  <span>{option.filterType}</span>
                )}
              </li>
            ))}
        </ul>
  }
    </div>
    </div>
</div>
  )
}
export default filterComponent;