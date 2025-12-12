import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import GetWeatherData from "../api/GetWeatherData";
import { normalizeWeatherData } from "../utils/normalizeWeatherData";

export function useWeatherData(coords: { latitud: number; longitud: number; city: string; country: string } | null, metric: 'metric' | 'imperial', setWeatherData: (data: any) => void) {

  const { data: fetchWeatherData, refetch } = useQuery({
    queryKey: ['weather', coords, metric],
    queryFn: () => GetWeatherData(coords!.latitud, coords!.longitud, metric),
    enabled: false,
  });

  useEffect(() => {
    if (fetchWeatherData && coords) {
      const normalized = normalizeWeatherData(
        fetchWeatherData,
        coords.city,
        coords.country
      );
      setWeatherData(normalized);
    }
  }, [fetchWeatherData, coords]);

  return { refetch };
}