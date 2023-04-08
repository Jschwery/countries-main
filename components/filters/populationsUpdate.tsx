'use client';
import React, { useEffect } from 'react';

interface Populations {
  population: [number, number];
}

function PopulationsUpdate({ population }: Populations) {
  useEffect(() => {
    console.log('the population has changed ' + population);
  }, [population]);

  return (
    <>
      <div className="flex justify-between rounded p-2 mt-1 shadow-black shadow-sm dark:bg-slate-600">
        {population && <p>Minimum: {population[0]}</p>}
        {population && <p>Maximum: {population[1]}</p>}
      </div>
    </>
  );
}

export default PopulationsUpdate;
