import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  city: string = '';
  weatherData: any;
  favorites: string[] = [];

  apiKey: string = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFavorites();
  }

  getWeather(cityName?: string) {
    const queryCity = cityName || this.city;
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${this.apiKey}&units=metric`)
      .subscribe(data => {
        this.weatherData = data;
      }, err => {
        alert('City not found.');
        this.weatherData = null;
      });
  }

  saveToFavorites() {
    if (!this.weatherData?.name) return;

    if (!this.favorites.includes(this.weatherData.name)) {
      this.favorites.push(this.weatherData.name);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  loadFavorites() {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      this.favorites = JSON.parse(stored);
    }
  }
}
