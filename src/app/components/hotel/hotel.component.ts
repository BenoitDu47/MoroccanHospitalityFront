import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  hotel: Hotel | undefined;
  error: string | undefined;
  host : string = "";
  cities : City[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public authService: AuthenticateService
  ) {this.getAllCities()}


  getAllCities() {
    this.apiService.getCities().subscribe({
      next : (data) => this.cities = data,
      error : (err) => this.error = "Pb de chargement",
      complete : () => this.error = ""
    })
  }

  ngOnInit(): void {
    this.host = environment.host;
    let id = this.route.snapshot.params['id'];
    this.getHotelDetails(id);
  }

  getHotelDetails(id: number): void {
    this.apiService.getHotelById(id).subscribe({
      next: (data) => {
        this.hotel = data;
      },
      error: (err) => {
        this.error = "Pb de chargement des détails de l'hôtel";
      },
      complete: () => {
        this.error = "";
      }
    });
  }

  getStars(stars: number): number[] {
    return Array(stars).fill(0);
  }
  

  onDeleteHotel(hotel: Hotel) {
    if (confirm("Vous êtes sûr de vouloir supprimer cet hôtel ?")) {
      this.apiService.deleteHotel(hotel).subscribe({
        next: (data) => console.log(data),
        error: (err) => this.error = err.error.cause.localizedMessage, // ToDo : personnaliser le traitement des erreurs côté serveur
        complete: () => {
          this.router.navigateByUrl('/'); // Redirection vers la page d'accueil après suppression
        }
      });
    }
  }

}
