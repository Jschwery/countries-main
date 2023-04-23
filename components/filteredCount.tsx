import { Country } from '@app/page';
import React from 'react';

function FilteredCount({ countries }: { countries: Country[] }) {
  return (
    <>
      <div className="flex w-full items-start justify-start">
        <h3 className="text-green-700 dark:text-green-500 flex-1">
          {`Countries filtered: `}
          <span className="text-green-700 dark:text-green-500 font-bold">{countries.length}</span>
        </h3>
      </div>
    </>
  );
}

export default FilteredCount;
