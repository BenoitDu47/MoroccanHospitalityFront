import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {
  myForm!: FormGroup;
  cities: City[] | undefined;
  hotel: Hotel | undefined;
  error: string | undefined;
  status: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      numberOfRoom: ['', Validators.required],
      price: ['', Validators.required],
      stars: ['', Validators.required],
      city: [null, Validators.required]
    });

    this.getAllCities();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.apiService.getHotelById(id).subscribe({
        next: (data) => {
          this.hotel = data;
          this.myForm.setValue({
            id: this.hotel.id,
            name: this.hotel.name,
            address: this.hotel.address,
            phone: this.hotel.phone,
            numberOfRoom: this.hotel.numberOfRoom,
            price: this.hotel.price,
            stars: this.hotel.stars,
            city: this.hotel.city
          });
          this.status = true; // Activer le mode de mise à jour
        },
        error: (err) => (this.error = err.message)
      });
    } else {
      this.status = false; // Désactiver le mode de mise à jour
    }
  }

  getAllCities() {
    this.apiService.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => (this.error = "Pb de chargement"),
      complete: () => (this.error = "")
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const hotelData = this.myForm.value;
      if (hotelData.id) {
        // Modification d'un hôtel existant
        this.apiService.updateHotel(hotelData).subscribe({
          next: (data) => console.log(data),
          error: (err) => (this.error = err.message),
          complete: () => this.router.navigateByUrl('/hotels/0')
        });
      } else {
        // Création d'un nouvel hôtel
        this.apiService.createHotel(hotelData).subscribe({
          next: (data) => console.log(data),
          error: (err) => (this.error = err.message),
          complete: () => this.router.navigateByUrl('/hotels/0')
        });
      }
    }
  }
}
