import { Component, Input, OnInit } from '@angular/core';
import {
  IWeatherFiveDays,
  IWeatherItem,
} from '../shared/model/fiveDaysWeather.model';
import { IWeather } from '../shared/model/weather.model';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
})
export class FiveDayForecastComponent implements OnInit {
  @Input()
  fiveDaysWeather!: IWeatherFiveDays;
  dailyWeather: IWeatherItem[] = [];
  hourlyWeather!: IWeatherItem[];
  date: string = '';
  day: string = '';
  selected!: IWeatherItem;
  constructor() {}

  ngOnInit(): void {
    this.getDailyWeather(this.fiveDaysWeather);
  }
  getDailyWeather(fiveDaysWeather: IWeatherFiveDays) {
    let firstDay = this.getHour(fiveDaysWeather.list[0].dt); //21
    this.dailyWeather = fiveDaysWeather.list.filter((list) => {
      return this.getHour(list.dt) === firstDay;
    });
    console.log(this.dailyWeather);
  }
  getHour(ms: number) {
    let date = new Date(ms * 1000);
    return date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  }
  getIcon(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }
  getTemp(temp: number) {
    return Math.round(temp);
  }
  getHourlyWeather(
    ms: number,
    weather: IWeatherItem,
    fiveDaysWeather: IWeatherFiveDays = this.fiveDaysWeather
  ) {
    this.selected = weather;
    function getDay(ms: number) {
      let date = new Date(ms * 1000);
      return date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    }
    let day = getDay(ms);
    this.hourlyWeather = fiveDaysWeather.list.filter((list) => {
      return getDay(list.dt) === day;
    });
    if (this.hourlyWeather.length > 1) {
      this.hourlyWeather.shift();
      if (this.hourlyWeather.length > 5) {
        this.hourlyWeather.splice(5, this.hourlyWeather.length - 1);
      }
    }
  }
  getHoursMin(ms: number) {
    let date = new Date(ms * 1000);
    this.getDate(ms);
    if (date.getHours() < 10) {
      return `0${date.getHours()}:0${date.getMinutes()}`;
    } else {
      return `${date.getHours()}:0${date.getMinutes()}`;
    }
  }
  getDate(ms: number) {
    let date = new Date(ms * 1000);
    this.date = `${date.getDate()}:${
      date.getMonth() + 1
    }:${date.getFullYear()}`;
    switch (date.getDay()) {
      case 0:
        this.day = 'Sun';
        break;
      case 1:
        this.day = 'Mon';
        break;
      case 2:
        this.day = 'Tue';
        break;
      case 3:
        this.day = 'Wed';
        break;
      case 4:
        this.day = 'Thu';
        break;
      case 5:
        this.day = 'Fri';
        break;
      case 6:
        this.day = 'Sat';
        break;
    }
  }
}
