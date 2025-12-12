import type { HourData } from "./hourData.interface";

export interface HourlyByDay {
    [date: string]: HourData[]; // key = "2025-12-08"
}