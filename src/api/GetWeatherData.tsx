import { WeatherClient } from "../clients/weatherClient"
import type { WeatherAPIResponse } from "../types/weatherSearch.interface";

async function GetWeatherData(latitude: number, longitude: number, units: 'metric' | 'imperial') : Promise <WeatherAPIResponse | null> {

    if (latitude == null || longitude == null) return null;

    const res = await WeatherClient.get<WeatherAPIResponse>("/forecast", {
        params: {
            latitude,
            longitude,
            current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code",
            hourly: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code",
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code",

            temperature_unit: units === "metric" ? "celsius" : "fahrenheit",
            wind_speed_unit: units === "metric" ? "kmh" : "mph",
            precipitation_unit: units === "metric" ? "mm" : "inch",
            
            timezone: "auto",
        }
    });
  return res.data
}

export default GetWeatherData
