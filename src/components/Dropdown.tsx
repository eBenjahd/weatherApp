import { useContext } from "react";
import { MetricContext } from "../context/MetricsContext";

function Dropdown() {
    const { metric, toggleMetric } = useContext(MetricContext)!;
  return (
    <div>
            <button onClick={toggleMetric}>
            { `Switch to ${metric === "metric" ? "Imperial" : "Metric"}`}
            </button>
            <div>
                <h3>Temperature</h3>
                <div>
                    <p className={metric === 'metric' ? 'selected' : ''}>Celsius(˚C)</p>
                    <p className={metric === 'imperial' ? 'selected' : ''}>Fahrenheit(˚F)</p>
                </div>
            </div>
            <div>
                <h3>Wind speed</h3>
                <div>
                    <p className={metric === 'metric' ? 'selected' : ''}>km/h</p>
                    <p className={metric === 'imperial' ? 'selected' : ''}>mph</p>
                </div>
            </div>
            <div>
                <h3>Precipitation</h3>
                <div>
                    <p className={metric === 'metric' ? 'selected' : ''}>Milimeters(mm)</p>
                    <p className={metric === 'imperial' ? 'selected' : ''}>Inches(in)</p>
                </div>
            </div>
        </div>
      
    
  )
}

export default Dropdown
