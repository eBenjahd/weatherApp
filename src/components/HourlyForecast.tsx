import { useState } from "react";
import type { HourlyForecastProps } from "../types/hourlyForecastProps.interface";
import { getWeekdayFromDateTime } from "../utils/weekdayFromDate";
import { getWeatherCode } from "../utils/getWeatherCode";

function HourlyForecast({ hourlyByDay }: HourlyForecastProps) {
  const dates = Object.keys(hourlyByDay);
  
  const [selectedDay, setSelectedDay] = useState(dates[0]);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const displayedHours = hourlyByDay[selectedDay] ?? [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 < dates.length ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : prev
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const selected = dates[highlightedIndex];
      setSelectedDay(selected);
      setOpen(false);
    }
  };

  return (
    <aside>
      <h2>Hourly forecast</h2>

      <div
        className="custom-select"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
      >
        <span>{getWeekdayFromDateTime(selectedDay)}</span>

        <svg width="12" height="18" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.37891 6.60938L0.175781 1.44141C0 1.30078 0 1.01953 0.175781 0.84375L0.878906 0.175781C1.05469 0 1.30078 0 1.47656 0.175781L5.69531 4.32422L9.87891 0.175781C10.0547 0 10.3359 0 10.4766 0.175781L11.1797 0.84375C11.3555 1.01953 11.3555 1.30078 11.1797 1.44141L5.97656 6.60938C5.80078 6.78516 5.55469 6.78516 5.37891 6.60938Z" fill="white"/>
        </svg>

        <ul className={open ? "open" : ""}>
          {dates.map((date, i) => (
            <li
              key={date}
              className={i === highlightedIndex ? "highlighted" : ""}
              onClick={() => {
                setSelectedDay(date);
                setOpen(false);
                setHighlightedIndex(i);
              }}
            >
              {getWeekdayFromDateTime(date)}
            </li>
          ))}
        </ul>
      </div>

      <div className="scroll">
        {displayedHours.map((hourData, i) => (
          <div key={i}>
            <img src={getWeatherCode(hourData.weatherCode).icon} alt={getWeatherCode(hourData.weatherCode).label} />
            <p>{hourData.hour}</p>
            <p>{hourData.temperature.toFixed()}˚</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default HourlyForecast;