import type { DailyForescastProps } from "../types/dailyForecastItem.interface"

function DailyForecastCard({daily}: DailyForescastProps ) {

  return (
    <section>
        <h3>Daily Forecast</h3>
        {daily?.map((day, i) => (
            <div key={i}>
                <h5>{day.day}</h5>
                <p>{day.weatherCode}</p>
                <div>
                    <p>{day.tempMin}˚</p>
                    <p>{day.tempMax}˚</p>
                </div>
            </div>
        ))}

    </section>
  )
}

export default DailyForecastCard
