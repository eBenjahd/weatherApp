export interface CurrentWeather {
    temperature: number;              // Temp actual
    feelsLike: number;                // Sensación térmica
    humidity: number;                 // %
    windSpeed: number;                // km/h o mph
    precipitationProbability: number; // %
    weatherCode: number;              // Icono
    date: string;                     // Fecha ISO
}

export interface DailyWeather {
    day: string;            // "Tue", "Wed", etc.
    weatherCode: number;    // Icono
    tempMax: number;
    tempMin: number;
}

export interface HourlyWeather {
    hour: string;           // "3 PM", "11 AM"
    weatherCode: number;    // Icono
    temperature: number;    
}

export interface WeatherData {
    city: string;
    country: string;
    current: CurrentWeather;
    daily: DailyWeather[];        // 7 días
    hourlyByDay: Record<string, HourlyWeather[]>; 
    // Ejemplo:
    // {
    //   "2025-12-02": [ ...24 horas... ],
    //   "2025-12-03": [ ...24 horas... ]
    // }
}

export interface WeatherContextType {
    weatherData: WeatherData | null;
    setWeatherData: (data: WeatherData) => void;

    selectedDay: string;          // para hourly forecast
    setSelectedDay: (day: string) => void;
}
