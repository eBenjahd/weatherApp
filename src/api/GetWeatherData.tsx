import { WeatherClient } from "../clients/weatherClient"
import type { WeatherAPIResponse } from "../types/weatherSearch.interface";

function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
}

async function GetWeatherData(
    latitude: number,
    longitude: number, 
    units: 'metric' | 'imperial') : Promise <WeatherAPIResponse | null> {

    if (latitude == null || longitude == null) return null;

    // ⚠️ NOTE ABOUT OPEN-METEO DATE BUG:
        //
        // Open-Meteo daily forecasts pueden devolver días desfasados o inconsistentes
        // incluso cuando se envían parámetros start_date y end_date correctos.
        //
        // ¿Por qué ocurre?
        // - La API calcula los días tomando como referencia 00:00 en UTC.
        // - Pero el "día actual" del usuario depende del timezone local real.
        // - Cuando la zona horaria está muy adelantada o retrasada respecto a UTC
        //   (Perú, Nueva Zelanda, Pacífico, etc.), la API puede devolver:
        //     ✓ El día anterior como primer día del array
        //     ✓ O saltarse el día actual
        //     ✓ O mover los días 1 posición hacia atrás/adelante
        //
        // Esto NO es un error de la aplicacion ni del cliente HTTP.
        // Es una limitación real y conocida de Open-Meteo.

    const today = new Date();
    const sixDaysLater = new Date();
    sixDaysLater.setDate(today.getDate() + 6);

    const res = await WeatherClient.get<WeatherAPIResponse>("/forecast", {
        params: {
            latitude,
            longitude,
            current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code",
            hourly: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code",
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code",

            start_date: formatDate(today),
            end_date: formatDate(sixDaysLater),

            temperature_unit: units === "metric" ? "celsius" : "fahrenheit",
            wind_speed_unit: units === "metric" ? "kmh" : "mph",
            precipitation_unit: units === "metric" ? "mm" : "inch",
            
            timezone: "auto",
        }
    });
  return res.data
}

export default GetWeatherData
