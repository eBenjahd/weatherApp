import { useContext } from "react";
import { MetricContext } from "../context/MetricsContext";
import { METRIC_SECTIONS } from "../constants/metrics";
import CheckIcon from "./CheckIcon";

function Dropdown() {
    const { metric, toggleMetric } = useContext(MetricContext)!;
  return (
    <div className="dropdown">
      <button onClick={toggleMetric}>
        Switch to {metric === "metric" ? "Imperial" : "Metric"}
      </button>

      {METRIC_SECTIONS.map(section => (
        <div className="metric-wrapper" key={section.title}>
          <h3>{section.title}</h3>

          <div className="metric">
            {section.options.map(option => {
              const isSelected = metric === option.value;

              return (
                <p
                  key={option.label}
                  className={isSelected ? "selected" : ""}
                >
                  <span>{option.label}</span>
                  {isSelected && <CheckIcon />}
                </p>
              );
            })}
          </div>
        </div>
      ))}
    </div>
      
    
  )
}

export default Dropdown
