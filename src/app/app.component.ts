import { Component, OnInit } from '@angular/core';
import { IWeatherFiveDays } from './shared/model/fiveDaysWeather.model';
import { IData } from './shared/model/weather.model';
import { WeatherService } from './shared/service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  cityName!: string;
  oneDayWeather!: IData;
  fiveDaysWeather!: IWeatherFiveDays;

  isShowOneDayWeather: boolean = false;
  isShowFiveDaysWeather: boolean = false;
  getWeather(city: string) {
    if (this.cityName) {
      this.weatherService.getWeatherByCityName(city).subscribe((data) => {
        this.oneDayWeather = data;
      });
      this.weatherService.getFiveDaysWeather(city).subscribe((data) => {
        this.fiveDaysWeather = data;
      });
      this.isShowFiveDaysWeather = false;
      this.isShowOneDayWeather = true;
    } else {
      alert('Enter city name');
    }
  }
  showWeather() {
    if (!this.oneDayWeather) {
      alert('Enter city name');
    } else {
      this.isShowOneDayWeather = !this.isShowOneDayWeather;
      this.isShowFiveDaysWeather = !this.isShowFiveDaysWeather;
    }
  }
  ngOnInit() {}
}
