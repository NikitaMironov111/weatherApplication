import { Component, Input, OnInit } from '@angular/core';
import {
  IWeatherFiveDays,
  IWeatherItem,
} from '../shared/model/fiveDaysWeather.model';
import { IData, IWeather } from '../shared/model/weather.model';

const IMG_URL = 'http://openweathermap.org/img/wn/';
@Component({
  selector: 'app-one-day-weather',
  templateUrl: './one-day-weather.component.html',
  styleUrls: ['./one-day-weather.component.scss'],
})
export class OneDayWeatherComponent implements OnInit {
  @Input()
  oneDayWeather!: IData;
  @Input()
  fiveDaysWeather!: IWeatherFiveDays;

  hourlyWeather!: IWeatherItem[];

  constructor() {}

  ngOnInit(): void {}
  getCurrentDate(ms: number) {
    let date = new Date(ms * 1000);
    return `${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}`;
  }
  getDate(ms: number) {
    let date = new Date(ms * 1000);
    if (date.getHours() < 10) {
      return `0${date.getHours()}:${date.getMinutes()}`;
    } else if (date.getMinutes() < 10) {
      return `${date.getHours()}:0${date.getMinutes()}`;
    } else if (date.getHours() < 10 && date.getMinutes() < 10) {
      return `0${date.getHours()}:0${date.getMinutes()}`;
    } else {
      return `${date.getHours()}:${date.getMinutes()}`;
    }
  }
  getIcon(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }
  getTemp(temp: number) {
    return Math.round(temp);
  }
  getTodayHourlyWeather(fiveDaysWeather: IWeatherFiveDays) {
    function getTomorrowDate() {
      let today = new Date();
      let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      return `${tomorrow.getFullYear()}-${
        tomorrow.getMonth() + 1
      }-${tomorrow.getDate()}`;
    }
    let tomorrowDate = Date.parse(`${getTomorrowDate()} 00:00:00`);
    let hourlyWeather = fiveDaysWeather.list.filter((list) => {
      return list.dt * 1000 < tomorrowDate;
    });
    if (hourlyWeather.length > 6) {
      hourlyWeather = hourlyWeather.slice(0, 5);
    }
    this.hourlyWeather = hourlyWeather;
  }
  getHoursMin(ms: number) {
    let date = new Date(ms * 1000);
    if (date.getHours() < 10) {
      return `0${date.getHours()}:0${date.getMinutes()}`;
    } else {
      return `${date.getHours()}:0${date.getMinutes()}`;
    }
  }
}
