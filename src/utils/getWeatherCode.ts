import { WEATHER_CATEGORIES, DEFAULT_WEATHER, type WeatherCategory } from '../constants/weatherIcons';
  
export function getWeatherCode(code?: number): WeatherCategory {

    if (code === undefined) {
        return DEFAULT_WEATHER;
    }
    
    return (
        WEATHER_CATEGORIES.find(category =>
          category.codes.includes(code)
        ) ?? DEFAULT_WEATHER
    );
  }