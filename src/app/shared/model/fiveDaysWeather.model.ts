import { IWeather } from './weather.model';

export interface IWeatherFiveDays {
  city: {
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  ctn: number;
  code: string;
  list: IWeatherItem[];
  message: number;
}
export interface IWeatherItem {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: IWeather[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}
