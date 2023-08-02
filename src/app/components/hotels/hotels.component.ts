import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  listHotels : Hotel[] | undefined;
  error : string | undefined;
  editPhoto : boolean | undefined;
  host : string = "";
  currentHotel : any;
  selectedFiles : any;
  progress : number | undefined;
  currentFileUpload : any;
  idCity : number = 0;
  cities : City[] = [];

  constructor(private router : Router, 
    private apiService : ApiService, public authService : AuthenticateService, 
    public route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.host = environment.host;
    this.router.events.subscribe( nav => {    //on observe chaque évènement sur le routeur qui redirige vers le composant trainings
      if(nav instanceof NavigationEnd) {      //on vérifie si la navigation s'est finalisé correctement
        this.idCity = this.route.snapshot.params['ca']; //on récupère l'id de la catégorie positionné dans le composant principal
        this.refreshScreen();
      }
    })
    this.getAllHotels();   //par défaut, on affiche toutes les formations
    this.getAllCities();  
  }
 
  getAllHotels() {
    this.apiService.getHotels().subscribe({
      next : (data) => this.listHotels = data,
      error : (err) => this.error = "Pb de chargement",
      complete : () => this.error = ""
    })
  }

  getAllCities() {
    this.apiService.getCities().subscribe({
      next : (data) => this.cities = data,
      error : (err) => this.error = "Pb de chargement",
      complete : () => this.error = ""
    })
  }

  onUpdateHotel(hotel: Hotel) {
    this.router.navigateByUrl('hotel/' + hotel.id);
  }
  
  onHotelDetail(hotel: Hotel) {
    this.router.navigateByUrl('hotel-zoom/' + hotel.id); // ToDo afficher l'image associée pour modification
  }
  
  onEditPhoto(hotel: Hotel) {
    this.currentHotel = hotel;
    this.editPhoto = true;
  }
  
  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  getAllHotelsByCity(idCat : number) {
    this.apiService.getHotelsByCity(idCat).subscribe({
      next : (data) => this.listHotels = data,
      error : (err) => this.error = "Pb de chargement",
      complete : () => this.error = ""
    })
  }

  refreshScreen(){
    if(this.idCity > 0) this.getAllHotelsByCity(this.idCity); //on affiche toutes les formations d'une catégorie
    else this.getAllHotels();  //ou toutes les formations
  }

  onDeleteHotel(hotel: Hotel) {
    if (confirm("Vous êtes sûr de vouloir supprimer cet hôtel ?")) {
      this.apiService.deleteHotel(hotel).subscribe({
        next: (data) => console.log(data),
        error: (err) => this.error = err.error.cause.localizedMessage, // ToDo : personnaliser le traitement des erreurs côté serveur
        complete: () => this.refreshScreen()
      });
    }
  }
  
  
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0); // on peut uploader le 1er fichier sélectionné
    this.apiService.uploadPhoto(this.currentFileUpload, this.currentHotel.id).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else {
            console.log("handle illegal state");
          }
        } else if (event instanceof HttpResponse) { // lorsque tout s'est bien déroulé
          this.refreshScreen();
        }
      },
      error: (err) => this.error = "pb de transfert d'image",
      complete: () => this.error = ""
    });
  }
  
  getStars(stars: number): number[] {
    return Array(stars).fill(0);
  }
}
