import { useState, createContext, type ReactNode } from "react";
import type { WeatherContextType, WeatherData } from "../types/weatherContext.interface";

export const WeatherContext = createContext<WeatherContextType | null>(null)
function WeatherProvider({children}: {children : ReactNode}) {

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [selectedDay, setSelectedDay] = useState<string>("");

    return (
        <WeatherContext.Provider value={{ weatherData, setWeatherData, selectedDay, setSelectedDay }}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider
