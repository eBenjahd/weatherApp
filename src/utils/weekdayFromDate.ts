export function getWeekdayFromDateTime(dateTime: string) {
    const date = new Date(dateTime); 
    return date.toLocaleDateString("en-US", { weekday: "long" });
}