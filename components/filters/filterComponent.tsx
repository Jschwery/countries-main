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
    { filterName: 'Region', value: [''], active: false, filterEdit: false },
    { filterName: 'Borders', value: [''], active: false, filterEdit: false },
    {
      filterName: 'Population',
      value: [0, 0],
      active: false,
      filterEdit: false
    }
  ];

  const [options, setOptions] = useState<FilterOptions[]>(filters);
  const [queue, setQueue] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<JSX.Element | null>(null);
  const [filterButtonShown, setFilterButtonShown] = useState(true);

  useEffect(() => {
    console.log('options changed in filter component: ');

    options.forEach((option) => console.log(option));
    // options.some((option) => {
    //   option.active;
    // })
    //   ? filterCallback(options)
    //   : console.log('no filters active');
  }, [options]);

  const filterOptions = (filter: FilterOptions[], filterName: string) => {
    const filterAndIndex = fltrObjectAndIndex(filterName, filter);

    switch (filterName.toLocaleLowerCase()) {
      case 'population':
        const updatedOptionPopulation = {
          ...(options ? options[filterAndIndex.index ?? -1] : {}),
          value: filterAndIndex.filterOption?.value ?? [0, 0],
          filterName: filterAndIndex.filterOption?.filterName ?? 'Population'
        };
        const updatedOptionsPopulation = [
          ...options.slice(0, filterAndIndex.index),
          updatedOptionPopulation,
          ...options.slice(filterAndIndex.index + 1)
        ];
        setOptions(updatedOptionsPopulation);
        break;
      case 'region':
        const updatedOptionRegion = {
          ...(options ? options[filterAndIndex.index ?? -1] : {}),
          value: filterAndIndex.filterOption?.value ?? [''],
          filterName: filterAndIndex.filterOption?.filterName ?? ''
        };
        const updatedOptionsRegion = [
          ...options.slice(0, filterAndIndex.index),
          updatedOptionRegion,
          ...options.slice(filterAndIndex.index + 1)
        ];
        setOptions(updatedOptionsRegion);
        break;
      case 'border':
        const updatedOptionBorders = {
          ...(options ? options[filterAndIndex.index ?? -1] : {}),
          value: filterAndIndex.filterOption?.value ?? [''],
          filterName: filterAndIndex.filterOption?.filterName ?? ''
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

  const handleSetQueue = (name: string) => {
    if (queue.includes(name)) {
      const filteredQueue = queue.filter((item) => item !== name);
      setQueue(filteredQueue);
      return filteredQueue;
    }
    const updatedQueue = [...queue, name];
    setQueue(updatedQueue);
    return updatedQueue;
  };

  const filterClicked = (name: string) => {
    const index = options.findIndex((x) => x.filterName === name);
    setFilterButtonShown(!filterButtonShown);
    if (index !== -1) {
      const updatedOption = {
        ...options[index],
        options: !options[index].active,
        filerEdit: !options[index].filterEdit
      };
      const updatedOptions = [...options];
      updatedOptions[index] = updatedOption;
      setOptions(updatedOptions);
      const updatedQueue = handleSetQueue(updatedOption.filterName);
      setSelectedOption(showOptionSlider(updatedQueue) || null);
    }
  };

  const removeActiveList = (name: string) => {
    const removeItem = queue.filter((q) => q !== name);
    setQueue(removeItem);
  };

  const handleHideContainer = () => {
    setSelectedOption(null);
    setQueue([]);
  };

  const showOptionSlider = (queue: string[]) => {
    const name = queue[0];
    const option = options.find((x) => x.filterName === name);

    switch (option?.filterName) {
      case 'Population':
        return (
          <div className="flex align-middle justify-center items-center w-full bg-amber-400">
            <MinimumDistanceSlider filterOps={options} callback={filterOptions} />
          </div>
        );
      case 'Region':
        return (
          <div className="flex align-middle justify-center items-center w-full bg-amber-400">
            <SelectAutoWidth filterOps={options} callback={filterOptions} title="Region" />
          </div>
        );
      case 'Borders':
        return (
          <div className="flex align-middle justify-center items-center w-full bg-amber-400">
            <SelectAutoWidth filterOps={options} callback={filterOptions} title="Borders" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full justify-start sm:justify-end items-start">
      {selectedOption ? selectedOption : ''}
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
                    className="hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer flex truncate"
                    onClick={() => filterClicked(options.filterName)}>
                    <div className="flex items-center justify-between">
                      <div className="w-[175px]">
                        <span className=" px-1">{options.filterName}</span>
                      </div>
                      {options.filterEdit && options.active ? (
                        <div>
                          <PencilIcon className=" w-[22px] h-[22px] text-yellow-300" />
                        </div>
                      ) : (
                        <></>
                      )}
                      {options.active ? (
                        <CheckCircleIcon className=" text-green-500 w-[25px] h-[25px]" />
                      ) : (
                        <CheckCircleIcon className=" text-gray-500 w-[25px] h-[25px]" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterComponent;
