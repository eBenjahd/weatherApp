import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GetCityData from "../api/GetCityData";
import useDebounce from "./useDebounce";
import type CitySearch from "../types/citySearch.interface"

export function useCitySearch() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { 
    data: cityData,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['city', debouncedQuery],
    queryFn: () => GetCityData(debouncedQuery),
    enabled: debouncedQuery.length > 2,
  });

  const options: CitySearch[] = cityData?.results?.map((city: any, index: number) => ({
    ...city,
    id: index
  })) || [];

  return {
    query,
    setQuery,
    searchQuery,
    setSearchQuery,
    options,
    isLoading,
    isError,
    isSuccess,
  };
}