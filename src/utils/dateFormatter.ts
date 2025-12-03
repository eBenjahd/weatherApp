export function formatDate(dateString: string, locale: string = "en-US"): string {
    if (!dateString) return "";
  
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    return new Intl.DateTimeFormat(locale, options).format(date);
}