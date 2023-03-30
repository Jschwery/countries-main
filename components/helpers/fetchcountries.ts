import { fetchCountries } from './countryFetch';

export const getCountries = async () => {
  try {
    const countries = await fetchCountries();
    return countries || [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
