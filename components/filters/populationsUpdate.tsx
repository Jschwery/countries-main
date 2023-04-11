'use client';
import React, { useEffect } from 'react';

interface Populations {
  population: [number, number];
}

function PopulationsUpdate({ population }: Populations) {
  return (
    <>
      <div className="flex flex-col justify-between rounded p-2 mt-1 shadow-black shadow-sm dark:bg-slate-600 w-[95%] min-w-[250px]  max-w-[300px] h-auto">
        <div className="flex h-[10%] text-lg px-4 mb-2">
          <p>Population</p>
        </div>

        <div className="flex flex-grow justify-between w-full">
          <div className="flex flex-1 w-[40%] justify-start py-2 px-4">
            {population && (
              <p>
                Min:
                <br /> {population[0]}
              </p>
            )}
          </div>
          <div className="flex flex-1 w-[40%] justify-end py-2 px-4">
            {population && (
              <p>
                Max:
                <br /> {population[1]}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopulationsUpdate;
