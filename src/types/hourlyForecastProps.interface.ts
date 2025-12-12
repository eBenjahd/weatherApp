import type { HourlyByDay } from "./hourlyByDay.interface";

export interface HourlyForecastProps {
    weatherDate: string;
    hourlyByDay: HourlyByDay;
}