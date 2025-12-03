export interface WeatherAPIResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    current: {
      time: string;
      temperature_2m: number;
      apparent_temperature: number;
      relative_humidity_2m: number;
      wind_speed_10m: number;
      precipitation_probability: number;
      weather_code: number;
    };
    hourly: {
      temperature_2m: number[];
      apparent_temperature: number[];
      relative_humidity_2m: number[];
      wind_speed_10m: number[];
      precipitation_probability: number[];
      weather_code: number[];
    };
    daily: {
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_sum: number[];
      weather_code: number[];
    };
}