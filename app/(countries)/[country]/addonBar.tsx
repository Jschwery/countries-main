'use client';
import { countryData } from '@public/countryData';
import React, { useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
interface CountryAddon {
  countryName: string | undefined;
}
function AddonBar({ countryName }: CountryAddon) {
  const foundCountry = countryData.find(
    (country) => country.name.toLowerCase() === countryName?.toLowerCase()
  );
  const [mobileActive, setMobileActive] = useState(false);

  const handleMobileClick = () => {
    setMobileActive((active) => !active);
  };

  useEffect(() => {
    console.log('the mobile active is: ' + mobileActive);
  }, [mobileActive]);
  return (
    <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 mt-0.5 mx-0.5 rounded-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
        <div className="flex  justify-between w-full items-start">
          <div className="flex items-center">
            <img
              src={foundCountry?.flags.png ? foundCountry?.flags.svg : foundCountry?.flags.png}
              className="h-6 mr-3"
              alt="Flowbite Logo"
            />
            <span className=" text-xl font-semibold whitespace-nowrap dark:text-white">
              {foundCountry?.name.toUpperCase()}
            </span>
          </div>
          <div className="items-start justify-between hidden w-full sm:flex sm:w-auto md:order-1">
            <ul className="flex flex-col font-medium border border-gray-100 rounded-lg bg-gray-50 sm:flex-row sm:space-x-3 sm:mt-0 sm:border-0 sm:bg-white dark:bg-gray-800 sm:dark:bg-gray-900 dark:border-gray-700">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true">
                    Options
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button">
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0">
                      Account settings
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-1">
                      Support
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-2">
                      License
                    </a>
                    <form method="POST" action="#" role="none">
                      <button
                        type="submit"
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        role="menuitem"
                        id="menu-item-3">
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:mt-1.5 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Services
                </a>
              </li>
            </ul>
          </div>
          <div className="w-auto sm:hidden">
            <Bars3Icon
              onClick={handleMobileClick}
              className="p-0.5 w-[28px] cursor-pointer h-[28px] text-black rounded dark:text-slate-50 dark:hover:bg-slate-600"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AddonBar;
