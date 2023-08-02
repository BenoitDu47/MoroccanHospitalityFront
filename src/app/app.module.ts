import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    HotelComponent,
    HotelFormComponent,
    CityFormComponent,
    NotFoundComponent,
    LoginoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
