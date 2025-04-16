


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({

  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  city: string = '';
  weatherData: any;
  favorites: string[] = [];

  apiKey: string = 'b1b15e88fa797225412429c1c50c122a1'; // Replace with your OpenWeatherMap API key

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
  clearFavorites() {
    localStorage.removeItem('favorites');
    this.favorites = [];
  }
  
  
}
