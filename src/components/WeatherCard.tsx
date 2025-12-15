import type { JSX } from "react"
import type { WeatherResult } from "../types/weatherCard.interface"
import { formatDate } from "../utils/dateFormatter"
import { getWeatherCode } from "../utils/getWeatherCode"

function WeatherCard({city ,country, date, weatherCode, temperature}: WeatherResult ) : JSX.Element{

  const weather = getWeatherCode(weatherCode);

  return (
    <section className="hero">
        <div className="main-info">
          <p>{city}, {country}</p>
          <p>{date ? formatDate(date) : ''}</p>
        </div>
        <img src={weather.icon} alt={weather.label} />
        <p>{temperature?.toFixed()}˚</p>
      
    </section>
  )
}

export default WeatherCard
