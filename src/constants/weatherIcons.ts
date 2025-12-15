import iconDrizzle from '../assets/svg/weather-svgs/Drizzle.svg';
import iconFog from '../assets/svg/weather-svgs/Fog.svg';
import iconOvercast from '../assets/svg/weather-svgs/Overcast.svg';
import iconPartlyCloudy from '../assets/svg/weather-svgs/PartlyCloudy.svg';
import iconRain from '../assets/svg/weather-svgs/Rain.svg';
import iconSnow from '../assets/svg/weather-svgs/Snow.svg';
import iconStorm from '../assets/svg/weather-svgs/Thunderstorms.svg';
import iconSunny from '../assets/svg/weather-svgs/Clear-sunny.svg';

export type WeatherCategory = {
  codes: number[];
  label: string;
  icon: string;
};

export const DEFAULT_WEATHER: WeatherCategory = {
    codes: [],
    label: 'Unknown',
    icon: iconPartlyCloudy,
};

export const WEATHER_CATEGORIES: WeatherCategory[] = [
    { codes: [0], label: 'Clear', icon: iconSunny },
    { codes: [1, 2], label: 'Partly cloudy', icon: iconPartlyCloudy },
    { codes: [3], label: 'Overcast', icon: iconOvercast },
    { codes: [45, 48], label: 'Fog', icon: iconFog },
    { codes: [51, 53, 55, 56, 57, 61, 80], label: 'Drizzle', icon: iconDrizzle },
    { codes: [63, 65, 66, 67, 81, 82], label: 'Rain', icon: iconRain },
    { codes: [71, 73, 75, 77, 85, 86], label: 'Snow', icon: iconSnow },
    { codes: [95, 96, 99], label: 'Thunderstorm', icon: iconStorm },
];