import { useContext, useEffect} from "react";
import { WeatherContext } from "../context/WeatherContext";
import { CoordsContext } from "../context/CoordsContext";
import InputSearch from "./InputSearch";
import ButtonSearch from "./ButtonSearch";
import WeatherCard from "./WeatherCard";
import WeatherDetailCard from "./WeatherDetailCard";
import DailyForecastCard from "./DailyForecastCard";
import HourlyForecast from "./HourlyForecast";
import { useCitySearch } from "../hooks/useCitySearch";
import { useWeatherData } from "../hooks/useWeatherData";
import { MetricContext } from "../context/MetricsContext";

export default function CitySearch() {
  const { query, setQuery, setSearchQuery, options, isLoading, isSuccess} = useCitySearch();
  const { coords, setCoords } = useContext(CoordsContext)!;
  const { weatherData, setWeatherData } = useContext(WeatherContext)!;
  const { metric } = useContext(MetricContext)!;
  const { refetch } = useWeatherData(coords, metric, setWeatherData);

  useEffect(() => {
    if (coords) refetch();
  }, [metric, coords]);

  const handleCitySelect = (city: typeof options[0]) => {
    setQuery(`${city.name} - ${city.country}`);
    setSearchQuery(''); 
    setCoords({
      latitud: city.latitude,
      longitud: city.longitude,
      city: city.name,
      country: city.country,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coords) return;
    refetch();
  };

  return (
    <main>
      <h1>How's the sky looking today?</h1>
      <form onSubmit={handleSubmit}>
        <InputSearch
          value={query}
          onChange={(e) => {
                setQuery(e.target.value)
                setSearchQuery(e.target.value)
            }}
          onSelect={handleCitySelect}
          options={options}
          placeholder="Search for a place..."
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <ButtonSearch />
      </form>

      {weatherData && (<>
      
        <WeatherCard
          city={weatherData.city}
          country={weatherData.country}
          date={weatherData.current.date}
          temperature={weatherData.current.temperature}
          weatherCode={weatherData.daily[0].weatherCode}
        />

        <WeatherDetailCard 
            feelsLike={weatherData.current.feelsLike}
            humidity={weatherData.current.humidity}
            wind={weatherData.current.windSpeed}
            precipitation={weatherData.current.precipitationProbability}
        />

        <DailyForecastCard daily={weatherData.daily}/>

        <HourlyForecast hourlyByDay={weatherData.hourlyByDay}/>
      </>
      )}
    </main>
  );
}