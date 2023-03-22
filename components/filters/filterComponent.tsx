'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Slider from '@mui/material/Slider';
import MinimumDistanceSlider from './populationSlider';
import SelectAutoWidth from './dropdownFilter';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Check, { CheckIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/outline';
import flterObjectAndIndex, { fltrObjectAndIndex } from '../countriesDisplay';
import { PaginateType } from './paginate';
import { filter, indexOf } from 'lodash';

export interface FilterOptions {
  filterName: string;
  value: [number, number] | string[] | PaginateType;
  active?: boolean;
  filterEdit?: boolean;
}

type FilterComponentProps = {
  filterCallback: (filterOptions: FilterOptions[]) => void;
};

function FilterComponent({ filterCallback }: FilterComponentProps) {
  const filters: FilterOptions[] = [
    { filterName: 'region', value: [], active: false, filterEdit: false },
    { filterName: 'borders', value: [], active: false, filterEdit: false },
    {
      filterName: 'population',
      value: [0, 0],
      active: false,
      filterEdit: false
    }
  ];

  const [options, setOptions] = useState<FilterOptions[]>(filters);
  const [selectedOption, setSelectedOption] = useState<JSX.Element | null>(null);
  const [filterButtonShown, setFilterButtonShown] = useState(true);

  useEffect(() => {
    options.forEach((option) => {
      console.log(option);
    });

    options.some((option) => {
      option.active;
    })
      ? filterCallback(options)
      : console.log('no filters active');
  }, [options]);

  const filterOptions = (
    filter: FilterOptions[],
    filterName: string,
    valuePassed: [number, number] | string[]
  ) => {
    const filterAndIndex = fltrObjectAndIndex(filterName, filter);

    switch (filterName.toLocaleLowerCase()) {
      case 'population':
        console.log('within population callback');

        const updatedOptionPopulation = {
          ...(options ? options[filterAndIndex.index ?? -1] : {}),
          value: valuePassed ?? [0, 0],
          filterName: filterAndIndex.filterOption?.filterName ?? 'population'
        };
        const updatedOptionsPopulation = [
          ...options.slice(0, filterAndIndex.index),
          updatedOptionPopulation,
          ...options.slice(filterAndIndex.index + 1)
        ];
        setOptions(updatedOptionsPopulation);
        break;
      case 'region':
        console.log('within region callback');

        const updatedOptionRegion = {
          ...(options ? options[filterAndIndex.index ?? -1] : {}),
          value: valuePassed ?? [''],
          filterName: filterAndIndex.filterOption?.filterName ?? 'region'
        };
        const updatedOptionsRegion = [
          ...options.slice(0, filterAndIndex.index),
          updatedOptionRegion,
          ...options.slice(filterAndIndex.index + 1)
        ];
        setOptions(updatedOptionsRegion);
        break;
      case 'borders':
        console.log('within border callback');

        const updatedOptionBorders = {
          ...(options ? options[filterAndIndex.index ?? -1] : {}),
          value: valuePassed ?? [''],
          filterName: filterAndIndex.filterOption?.filterName ?? 'borders'
        };
        const updatedOptionsBorders = [
          ...options.slice(0, filterAndIndex.index),
          updatedOptionBorders,
          ...options.slice(filterAndIndex.index + 1)
        ];
        setOptions(updatedOptionsBorders);
        break;
      default:
        break;
    }
  };

  const filterClicked = (name: string) => {
    setFilterButtonShown((prevstate) => !prevstate);

    const index = options.findIndex(
      (x) => x.filterName.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    console.log('index clicked: ' + index);

    if (index !== -1) {
      const updatedOption = {
        ...options[index],
        filterEdit: !options[index].filterEdit,
        active: !options[index].active
      };
      const updatedOptions = [...options];
      updatedOptions[index] = updatedOption;
      setOptions(updatedOptions);

      setSelectedOption(showOptionSlider(name) || null);
    }
  };

  const handleCheckClicked = (name: string) => {
    setFilterButtonShown((prevstate) => !prevstate);
    setSelectedOption(null);
  };

  const handleHideContainer = () => {
    setSelectedOption(null);
  };

  const showOptionSlider = (queue: string) => {
    const option = options.find(
      (x) => x.filterName.toLocaleLowerCase() === queue.toLocaleLowerCase()
    );
    // console.log('the options Index:' + optionIndex);

    switch (option?.filterName.toLocaleLowerCase()) {
      case 'population':
        return (
          <div className="flex align-middle justify-center items-center w-full bg-amber-400">
            <MinimumDistanceSlider filterOps={options} callback={filterOptions} />
            <CheckIcon
              onClick={() => handleCheckClicked(option.filterName)}
              className=" w-[30px] h-[30px] text-green-600 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5"
            />
          </div>
        );
      case 'region':
        return (
          <div className="flex align-middle justify-center items-center w-full bg-amber-400">
            <SelectAutoWidth filterOps={options} callback={filterOptions} title="Region" />
            <CheckIcon
              onClick={() => handleCheckClicked(option.filterName)}
              className=" w-[30px] h-[30px] text-green-600 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5"
            />
          </div>
        );
      case 'borders':
        return (
          <div className="flex align-middle justify-center items-center w-full bg-amber-400">
            <SelectAutoWidth filterOps={options} callback={filterOptions} title="Borders" />
            <CheckIcon
              onClick={() => handleCheckClicked(option.filterName)}
              className=" w-[30px] h-[30px] text-green-600 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full justify-start sm:justify-end items-start">
      {selectedOption ? selectedOption : <></>}
      <div id="filter-button-container" className="relative md:pl-2 py-4 items-end flex">
        {filterButtonShown && (
          <button
            type="button"
            className="inline-flex w-32 h-[45px] right-0 top-0 rounded-md border border-gray-300 hover:border-lime-600 shadow-sm px-4 py-2 dark:bg-slate-700 bg-white text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 text-white  focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true">
            Filters
            <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        {filterButtonShown && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-700 filters-sm z-20">
            <div
              className="py-1 transition duration-500 ease-in border-transparent hover:border-lime-500"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button">
              {
                <ul className="">
                  {options.map((options, iteration) => (
                    <li
                      key={options.filterName + '-' + iteration}
                      className="hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer truncate"
                      onClick={() => filterClicked(options.filterName.toLocaleLowerCase())}>
                      <div className="flex items-center bg-green-900 justify-around">
                        {options.filterEdit && options.active ? (
                          <div className="flex grow justify-between items-center">
                            <div className="flex align-middle pl-0.5 pb-0.5">
                              <span className="px-1">{options.filterName}</span>
                            </div>
                            <div className="flex items-center px-1">
                              <PencilIcon className="w-[22px] h-[22px] text-yellow-300 hover:text-yellow-200 hover:scale-105" />
                              <CheckCircleIcon className="text-green-500 w-[25px] h-[25px]" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-[175px]">
                              <span className="px-1">{options.filterName}</span>
                            </div>
                            <CheckCircleIcon className="text-gray-500 w-[25px] h-[25px]" />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default FilterComponent;
