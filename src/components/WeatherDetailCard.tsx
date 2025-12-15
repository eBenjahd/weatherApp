import { useContext, type JSX } from "react"
import type { WeatherDetail } from "../types/weatherDetail.interface"
import { MetricContext } from "../context/MetricsContext"

function WeatherDetailCard({feelsLike, humidity, wind, precipitation} : WeatherDetail) :JSX.Element{

    const {metric} = useContext(MetricContext)!;
  return (
    <section className="detail-card">
      <div className="card">
        <h2>Feels like</h2>
        <p>{feelsLike.toFixed()}˚</p>
      </div>
      <div className="card">
        <h2>Humidity</h2>
        <p>{humidity} %</p>
      </div>
      <div className="card">
        <h2>Wind</h2>
        <p>{wind.toFixed()} {metric === 'metric' ? 'km/h' : 'mph'} </p>
      </div>
      <div className="card">
        <h2>Precipitation</h2>
        <p>{precipitation} {metric === 'metric' ? 'mm' : 'in'}</p>
      </div>
    </section>
  )
}

export default WeatherDetailCard
