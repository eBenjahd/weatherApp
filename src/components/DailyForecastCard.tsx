import type { DailyForescastProps } from "../types/dailyForecastItem.interface"
import { getWeatherCode } from "../utils/getWeatherCode"

function DailyForecastCard({daily}: DailyForescastProps ) {

  return (
    <section className="daily-forecast">
        <h2>Daily Forecast</h2>
        <div className="container">  
          {daily?.map((day, i) => (
              <div key={i}>
                  <h5>{day.day}</h5>
                  <img src={getWeatherCode(day.weatherCode).icon} alt={getWeatherCode(day.weatherCode).label} />
                  <div>
                      <p>{day.tempMin.toFixed()}˚</p>
                      <p>{day.tempMax.toFixed()}˚</p>
                  </div>
              </div>
          ))}
        </div>

    </section>
  )
}

export default DailyForecastCard
