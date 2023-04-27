'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import MinimumDistanceSlider from './populationSlider';
import SelectAutoWidth from './dropdownFilter';
import Check, { CheckIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/outline';
import flterObjectAndIndex, { fltrObjectAndIndex } from '../countriesDisplay';
import { PaginateType } from './paginate';
import PopulationsUpdate from './populationsUpdate';
import { FilterOptions } from '@global/interfaces';

type FilterComponentProps = {
  filterCallback: (filterOptions: FilterOptions[]) => void;
  setSearchWidth: (setWidth: boolean) => void;
};

function FilterComponent({ filterCallback, setSearchWidth }: FilterComponentProps) {
  const filters: FilterOptions[] = [
    { filterName: 'region', value: [], active: false, filterEdit: false },
    { filterName: 'borders', value: [], active: false, filterEdit: false },
    {
      filterName: 'population',
      value: [0, 15],
      active: false,
      filterEdit: false
    }
  ];

  const [options, setOptions] = useState<FilterOptions[]>(filters);
  const [populationValue, setPopulationValue] = useState<[number, number]>();
  const [selectedOption, setSelectedOption] = useState<JSX.Element | null>(null);
  const [filterButtonShown, setFilterButtonShown] = useState(true);
  const [showPopulationUpdate, setShowPopulationUpdate] = useState(false);
  const [singleOption, setSingleOption] = useState<FilterOptions | null>(null);

  const scalePopValues = (pops: [number, number]): [number, number] => {
    const min_population = 1000;
    const max_population = 1410000000;

    const scaledPops = pops.map((pop) =>
      Math.round(min_population + (pop * (max_population - min_population)) / 100)
    );

    return scaledPops as [number, number];
  };

  useEffect(() => {
    // options.forEach((option) => console.log(option));
    if (options.some((option) => option.active)) {
      const filtersFound = options.filter((option) => option.active && option.filterEdit);

      filterCallback(filtersFound);
    } else {
      filterCallback([]);
    }
  }, [options]);

  useEffect(() => {
    const popActive = options.some(
      (pop) => pop.filterName.toLocaleLowerCase() === 'population' && pop.active
    );

    const populationOption = options.find((op) => op.filterName.toLowerCase() === 'population');
    const scaledPops = scalePopValues(populationOption?.value as [number, number]);

    popActive ? setPopulationValue(scaledPops) : '';
  }, []);

  const filterOptions = (
    filter: FilterOptions[],
    filterName: string,
    valuePassed: [number, number] | string[]
  ) => {
    const filterAndIndex = fltrObjectAndIndex(filterName, filter);

    switch (filterName.toLocaleLowerCase()) {
      case 'population':
        const scaledPops = scalePopValues(valuePassed as [number, number]);
        setPopulationValue(scaledPops);
        const updatedOptionPopulation = {
          ...(options ? options[filterAndIndex.index ?? -1] : {}),
          value: scaledPops ?? [0, 0],
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
    const filterOp = options.find((option) => {
      return option.filterName.toLocaleLowerCase() === name.toLocaleLowerCase();
    });

    filterOp?.active ? setSearchWidth(false) : setSearchWidth(true);
    const index = options.findIndex(
      (x) => x.filterName.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (index !== -1) {
      const updatedOption = {
        ...options[index],
        filterEdit: !options[index].filterEdit,
        active: !options[index].active
      };
      const updatedOptions = [...options];

      updatedOptions[index] = updatedOption;

      !updatedOptions[index].active && !updatedOptions[index].filterEdit
        ? (updatedOptions[index].value =
            updatedOptions[index].filterName === 'population' ? [0, 15] : [])
        : '';

      setOptions(updatedOptions);
      if (updatedOption.active && updatedOption.filterEdit) {
        setSelectedOption(showOptionSlider(name, options) || null);
      } else {
        setFilterButtonShown((prevstate) => !prevstate);
      }
    }
  };

  const handleCheckClicked = () => {
    setFilterButtonShown((prevstate) => !prevstate);
    setSearchWidth(false);
    setSelectedOption(null);
    setSingleOption(null);
    setShowPopulationUpdate((prevstate) => !prevstate);
  };

  const changeWidth = () => {
    setTimeout(() => {
      setSearchWidth(true);
    }, 1);
  };

  const handleEdit = (name: string) => {
    setFilterButtonShown((prevstate) => !prevstate);
    const index = options.findIndex(
      (x) => x.filterName.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    const optionsEdit = [...options];

    if (optionsEdit[index].active && optionsEdit[index].filterEdit) {
      setSelectedOption(showOptionSlider(name, optionsEdit) || null);
    } else {
      setFilterButtonShown((prevstate) => !prevstate);
    }
    changeWidth();
  };

  //

  const showOptionSlider = (queue: string, options: FilterOptions[]) => {
    const option = options.find(
      (x) => x.filterName.toLocaleLowerCase() === queue.toLocaleLowerCase()
    );
    setSingleOption(option ? option : null);
    switch (option?.filterName.toLocaleLowerCase()) {
      case 'population':
        return (
          <div className="flex align-middle justify-center items-center w-full pt-6">
            <MinimumDistanceSlider filterOps={options} callback={filterOptions} />
            <CheckIcon
              onClick={() => handleCheckClicked()}
              className=" w-[30px] h-[30px] text-green-600 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5"
            />
          </div>
        );
      case 'region':
        return (
          <div className="flex align-middle justify-center items-center w-full">
            <div className="w-full flex items-center justify-center sm:mt-5">
              <SelectAutoWidth filterOps={options} callback={filterOptions} title="Region" />
              <CheckIcon
                onClick={() => handleCheckClicked()}
                className="w-[30px] h-[30px] min-w-[30px] min-h-[30px] text-green-600 mr-20 sm:mr-0 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5 mt-1 sm:mt-[3px]"
              />
            </div>
          </div>
        );
      case 'borders':
        return (
          <div className="flex align-middle justify-center items-center w-full">
            <div className="w-full flex items-center justify-center sm:mt-5">
              <SelectAutoWidth filterOps={options} callback={filterOptions} title="Borders" />
              <CheckIcon
                onClick={() => handleCheckClicked()}
                className="w-[30px] h-[30px] min-w-[30px] min-h-[30px] text-green-600 mr-20 sm:mr-0 hover:text-green-400 transition-all hover:cursor-pointer pb-1 px-0.5 ml-1.5 mt-1 sm:mt-[3px]"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log('in use singleOption: ' + singleOption?.filterName);
  }, [singleOption]);

  return (
    <div className="flex w-full flex-col justify-start sm:justify-end sm:items-end items-start">
      <div
        className={`w-[300px] py-2 pl-2 flex flex-col items-end transition-opacity transition-max-height duration-400 overflow-hidden ${
          !filterButtonShown ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'
        }`}>
        {selectedOption ? selectedOption : <></>}
        {options.some(
          (option) => option.active && option.filterName.toLocaleLowerCase() === 'population'
        ) ? (
          <div className="p-2 mt-1 w-[100%] flex justify-end">
            <PopulationsUpdate
              population={
                options.find((option) => option.filterName.toLocaleLowerCase() === 'population')
                  ?.value as [number, number]
              }
              shown={singleOption?.filterName.toLowerCase() === 'population' ? true : false}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div id="filter-button-container" className="relative md:pl-2 py-4 items-end flex">
        {filterButtonShown && (
          <button
            type="button"
            className="inline-flex items-center w-32 h-[45px] right-0 top-0 rounded-md border border-gray-300 hover:border-lime-600 px-4 py-2 
                  dark:bg-slate-700 text-black shadow-black shadow-md bg-white text-sm font-medium  
                  hover:bg-gray-50 focus:outline-none focus:ring-2 dark:text-white  
              focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true">
            Filters
            <svg
              className="ml-11 mt-1 min-w-[20px] min-h-[20px]"
              viewBox="0 0 20 20"
              fill="currentColor">
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
                              <PencilIcon
                                onClick={() => handleEdit(options.filterName.toLocaleLowerCase())}
                                className="w-[22px] h-[22px] z-50 text-yellow-300 hover:text-yellow-200 hover:scale-105"
                              />
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
