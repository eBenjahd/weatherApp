import { useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { CoordsContext } from "../context/CoordsContext";
import GetWeatherData from "../api/GetWeatherData";
import GetCityData from "../api/GetCityData";
import useDebounce from "../hooks/useDebounce";
import ButtonSearch from "./ButtonSearch";
import WeatherCard from "./WeatherCard";
import { WeatherContext } from "../context/WeatherContext";
import { normalizeWeatherData } from "../utils/normalizeWeatherData";
import InputSearch from "./InputSearch";

function CitySearch() {

    // Flujo correcto es hacer fetch para obtener simplemente latitud y longitud, 
    // luego de eso que el city search devuelve estos dos valores y lo utilizamos
    // en el fetch a la url de clima
    // `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=
    // temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability
    // ,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);

    const context = useContext(CoordsContext);
    if (!context) throw new Error("CoordsContext must be used within a CoordsProvider");
    const {coords, setCoords} = context

    const weatherContext= useContext(WeatherContext);
    if (!weatherContext) throw new Error('WeatherContext must be used within WeatherProvider')
    const {weatherData, setWeatherData} = weatherContext
    
    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    
    const { data: cityData} = useQuery({
        queryKey: ['city', debouncedQuery],
        queryFn: () => GetCityData(debouncedQuery),
        enabled: debouncedQuery.length > 2
    })


    const { data: fetchWeatherData, refetch} = useQuery({
        queryKey: ['weather'],
        queryFn: () => GetWeatherData(coords!.latitud, coords!.longitud , "metric" ), //modificar metric para que sea dinamico
        enabled: false,
    })

    const options = cityData?.results?.map((city, index) => ({
        ...city,
        id: index
      })) || [];

    useEffect(() => {
        if (fetchWeatherData) {
            const normalized = normalizeWeatherData(
                fetchWeatherData,
                coords!.city!,
                coords!.country!
            );
            setWeatherData(normalized);
        }
    }, [fetchWeatherData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!coords) return;
        refetch();
      };

    return (
        <>

        <form onSubmit={handleSubmit}>

            <InputSearch
            value={query}
            onChange={handleSearch}
            onSelect={(city) => {
                setQuery(`${city.name} - ${city.country}`);
                setCoords({
                latitud: city.latitude,
                longitud: city.longitude,
                city: city.name,
                country: city.country,
                });
            }}
            options={options}
            placeholder="Search for a place..."
            />
            <ButtonSearch />
        </form>
    
        { weatherData && 
            <WeatherCard 
                city={weatherData?.city} 
                country={weatherData?.country} 
                date={weatherData?.current.date} 
                temperature={weatherData?.current.temperature} 
                weatherCode={weatherData.daily[0].weatherCode} /> 
        }
        </>
  )
}

export default CitySearch
