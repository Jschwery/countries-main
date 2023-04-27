export type Props = {
  props?: {
    countryName?: string;
    countryRegion?: string;
    paginate?: number;
    borders?: string[];
    currency?: string[];
  };
  searchParams?: {
    q?: string;
  };
};
