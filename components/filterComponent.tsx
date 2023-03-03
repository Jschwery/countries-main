"use client";

  /*
  need a queue, which will be initialized with a string  array[]
  when a list object is set to active 

  call function with the items name, function takes item name,
  displays the correct slider depending on the value

  each slider needs its own state

  slider will be within a div, that contains an red x to close it
  */
  
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Slider from "@mui/material/Slider";
import MinimumDistanceSlider from "./populationSlider";
import SelectAutoWidth from "./dropdownFilter";

function FilterComponent() {
  const filterOptions = [
    { filterType: "Population", value: "", active: false },
    { filterType: "Region", value: "", active: false },
    { filterType: "Currency", value: "", active: false },
    { filterType: "Borders", value: "", active: false },
    { filterType: "Pagination", value: "", active: false },
  ];

  const [options, setOptions] = useState(filterOptions);
  const [queue, setQueue] = useState<string []>([])
  const [selectedOption, setSelectedOption] = useState<JSX.Element | null>(null);

  useEffect(() => {
    console.log('selected option: '+ selectedOption)
  }, [selectedOption]);


  const handleSetQueue = (name: string) => {
    if(queue.includes(name)){
      const filteredQueue = queue.filter((items)=>{
        return items !== name
      })
      setQueue(filteredQueue);
      return filteredQueue; // Return the updated queue
    }
    const updatedQueue = [...queue, name];
    setQueue(updatedQueue);
    console.log('queue: ' + updatedQueue)
    return updatedQueue; // Return the updated queue
  };
  
  const handleFilterClicked = (name: string) => {
    const index = options.findIndex((x) => x.filterType === name);
    if (index !== -1) {
      const updatedOption = { ...options[index], active: !options[index].active };
      const updatedOptions = [...options];
      updatedOptions[index] = updatedOption;
      setOptions(updatedOptions);
      const updatedQueue = handleSetQueue(updatedOption.filterType);
      setSelectedOption(showOptionSlider(updatedQueue) || null);
    }
  };
  
  const showOptionSlider = (queue: string[]) => {
    const name = queue[0];
    const option = options.find((x) => x.filterType === name);
  
    // switch (option?.filterType){
    //   //passing 
    //   case 'Population':
    //     return <MinimumDistanceSlider onChange={(numbers)=>{
           
          
    //     }}
  //     } />;
  
  //     case 'Region':
  //       return <SelectAutoWidth filterType="Region"/> 
  
  //     case 'Currency':
  //       return <SelectAutoWidth filterType="Currency"/> 
  
  //     case 'Borders':
  //       return <SelectAutoWidth filterType="Borders"/> 
  
  //     case 'Pagination':
  //       return <SelectAutoWidth filterType=""/> 
  //   }
  // }
      
  return (
    <div className="flex flex-col sm:flex-row">
    {
      selectedOption ? selectedOption : ''
    }
    <div className="relative">
      
      <button
        type="button"
        className="inline-flex h-[45px] justify-center rounded-md border border-gray-300 mx-2 hover:border-lime-600 shadow-sm px-4 py-2 dark:bg-slate-700 bg-white text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 text-white  focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true">
        Filters
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
            clipRule="evenodd"/>
        </svg>
      </button>

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
                  key={options.filterType + "-" + iteration}
                  className="hover:bg-slate-700 hover:opacity-60 p-2 leading-4 text-lg cursor-pointer flex truncate"
                  onClick={() => handleFilterClicked(options.filterType)}>
                  <div className="flex items-center justify-between">
                    <div className="w-[175px]">
                      <span className=" px-1">{options.filterType}</span>
                    </div>
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
}
export default FilterComponent;
