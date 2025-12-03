import type { WeatherData } from "../types/weatherContext.interface";

export function normalizeWeatherData(
    raw: any,
    city: string,
    country: string
): WeatherData {

    return {
        city,
        country,
        current: {
            temperature: raw.current.temperature_2m,
            feelsLike: raw.current.apparent_temperature,
            humidity: raw.current.relative_humidity_2m,
            windSpeed: raw.current.wind_speed_10m,
            precipitationProbability: raw.current.precipitation_probability,
            weatherCode: raw.current.weather_code,
            date: raw.current.time,
        },
        daily: raw.daily.time.map((t: string, i: number) => ({
            day: new Date(t).toLocaleDateString("en-US", { weekday: "short" }),
            weatherCode: raw.daily.weather_code[i],
            tempMax: raw.daily.temperature_2m_max[i],
            tempMin: raw.daily.temperature_2m_min[i],
        })),
        hourlyByDay: raw.hourly.time.reduce((acc: any, time: string, index: number) => {
            const day = time.split("T")[0];

            if (!acc[day]) acc[day] = [];
            acc[day].push({
                hour: new Date(time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                }),
                weatherCode: raw.hourly.weather_code[index],
                temperature: raw.hourly.temperature_2m[index],
            });
            return acc;
        }, {})
    };
}