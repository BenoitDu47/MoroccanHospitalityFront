import { Component } from '@angular/core';
import { City } from './model/city.model';
import { AuthenticateService } from './services/authenticate.service';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isFirstVisit: boolean = true;
  showMessage: boolean = true;
  title = 'moroccanhospitality-front-app';
  listCity: City[] | undefined;
  currentCity: City | undefined;
  error = null;
  
  constructor(public authService: AuthenticateService, public apiService: ApiService, public router: Router) {
  }
  
  ngOnInit(): void {
    this.getAllCities();
    if (this.isFirstVisit) {
      setTimeout(() => {
        this.showMessage = false;
      }, 10000); // 10 secondes
      this.isFirstVisit = false;
    }
  }
  
  getAllCities() {
    this.apiService.getCities().subscribe({
      next: (data) => this.listCity = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    });
  }
  
  getHotelsByCity(city: City) {
    this.currentCity = city;
    this.router.navigateByUrl("/hotels/" + city.id);
  }
  
  listHotels() {
    this.currentCity = undefined;
    this.router.navigateByUrl("/hotels/0");
  }
  
}
