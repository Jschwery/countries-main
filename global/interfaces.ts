import { PaginateType } from '@components/filters/paginate';

export interface CountryLong {
  name?: string;
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  callingCodes?: string[];
  capital?: string;
  altSpellings?: string[];
  subregion?: string;
  region?: string;
  latlng?: number[];
  population?: number;
  demonym?: string;
  area?: number;
  timezones?: string[];
  borders?: string[];
  nativeName?: string | undefined;
  numericCode?: string;
  flags?: {
    svg: string;
    png: string;
  };
  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages?: (
    | {
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName: string;
      }
    | {
        iso639_2: string;
        name: string;
        nativeName: string;
        iso639_1?: undefined;
      }
  )[];
  translations?: {
    [key: string]: string | undefined;
  };
  flag?: string;
  regionalBlocs?: {
    acronym: string;
    name: string;
  }[];
  cioc?: string;
  independent?: boolean;
}

export interface Country {
  name: {
    common: string;
  };
  region?: string;
  borders?: string[];
  population?: number;
  flags?: {
    png: string;
    svg: string;
  };
  capital?: string[];
  languages?: { [key: string]: string };
  maps?: {
    googleMaps?: string;
  };
  cca3?: string;
}

export interface FilterOptions {
  filterName: string;
  value: [number, number] | string[] | PaginateType;
  active?: boolean;
  filterEdit?: boolean;
}
