import { useState } from "react";
import type { HourlyForecastProps } from "../types/hourlyForecastProps.interface";
import { getWeekdayFromDateTime } from "../utils/weekdayFromDate";

// NOTA: Debido a inconsistencias en los horarios devueltos por la API,
// no podemos filtrar dinámicamente las horas del día actual sin riesgo
// de que el array esté vacío o incompleto. Por eso mostramos todas las horas disponibles.


function HourlyForecast({ weatherDate, hourlyByDay }: HourlyForecastProps) {
  const [currentDate] = weatherDate.split("T");
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const dates = Object.keys(hourlyByDay);

  const onChange = (day: string) => setSelectedDay(day);

  const displayedHours = hourlyByDay[selectedDay] ?? [];

  return (
    <aside>
      <h2>Hourly forecast</h2>

      <select value={selectedDay} onChange={(e) => onChange(e.target.value)}>
        {dates.map((date) => (
          <option key={date} value={date}>
            {getWeekdayFromDateTime(date)}
          </option>
        ))}
      </select>

      {displayedHours.map((hourData, i) => (
        <div key={i}>
          <p>{hourData.weatherCode}</p>
          <p>{hourData.hour}</p>
          <p>{hourData.temperature}˚</p>
        </div>
      ))}
    </aside>
  );
}

export default HourlyForecast;