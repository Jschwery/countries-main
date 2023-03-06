import { Country } from "../../app/page";

export const fetchCountries = async (): Promise<Country[]> => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all', {cache: 'force-cache'}); //makes certain that each fetch request opts into caching, however revalidation frequency can still be lowered by individual fetch requests
      if (!response.ok) {
        throw Error('could not fetch data');
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.log(e);
    }
    console.log('no data fetched, returning empty array from fetchCountries')
    return [];
  };
  