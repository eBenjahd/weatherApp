import type { JSX } from "react"
import type { WeatherResult } from "../types/weatherCard.interface"
import { formatDate } from "../utils/dateFormatter"

function WeatherCard({city ,country, date, weatherCode, temperature}: WeatherResult ) : JSX.Element{
  return (
    <div>
        <p>{city}</p>
        <p>{country}</p>
        <p>{date ? formatDate(date) : ''}</p>
        <p>{weatherCode}</p>
        <p>{temperature}</p>
      
    </div>
  )
}

export default WeatherCard
