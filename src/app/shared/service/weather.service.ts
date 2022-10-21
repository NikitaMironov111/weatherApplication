import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherFiveDays } from '../model/fiveDaysWeather.model';
import { IData, IWeather } from '../model/weather.model';
const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'ad8e4400baaccb6ceb4b0829f149ef4a';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}
  getWeatherByCityName(city: string): Observable<IData> {
    return this.httpClient.get<IData>(
      `${API_URL}weather?q=${city}&units=metric&appid=${API_KEY}`
    );
  }
  getFiveDaysWeather(city: string): Observable<IWeatherFiveDays> {
    return this.httpClient.get<IWeatherFiveDays>(
      `${API_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
  }
}
