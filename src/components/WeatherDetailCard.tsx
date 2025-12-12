import { useContext, type JSX } from "react"
import type { WeatherDetail } from "../types/weatherDetail.interface"
import { MetricContext } from "../context/MetricsContext"

function WeatherDetailCard({feelsLike, humidity, wind, precipitation} : WeatherDetail) :JSX.Element{

    const {metric} = useContext(MetricContext)!;
  return (
    <section>
      <div>
        <h2>Feels like</h2>
        <p>{feelsLike}˚</p>
      </div>
      <div>
        <h2>Humidity</h2>
        <p>{humidity} %</p>
      </div>
      <div>
        <h2>Wind</h2>
        <p>{wind} {metric === 'metric' ? 'km/h' : 'mph'} </p>
      </div>
      <div>
        <h2>Precipitation</h2>
        <p>{precipitation} {metric === 'metric' ? 'mm' : 'in'}</p>
      </div>
    </section>
  )
}

export default WeatherDetailCard
