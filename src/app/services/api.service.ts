import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { Hotel } from '../model/hotel.model';
import { environment } from 'src/environments/environment';
import { City } from '../model/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient, private auth : AuthenticateService) { }

  public getHotels() {
    return this.http.get<Hotel[]>(environment.host+"/hotels");
  }

  public getCities() {
    return this.http.get<City[]>(environment.host + "/cities");
  }

  public getHotelsByCity(idCity: number) {
    return this.http.get<Hotel[]>(environment.host + "/cities/" + idCity + "/hotels");
  }

  public deleteHotel(hotel: Hotel) {
    return this.http.delete(environment.host + "/hotels/" + hotel.id, { headers: new HttpHeaders({ 'Authorization': this.auth.getToken() }) });
  }

  public uploadPhoto(file:File, id:number):Observable<HttpEvent<{}>>{
    let formData:FormData = new FormData();
    formData.append('file',file);
    const req = new HttpRequest('POST',environment.host+'/photo/' + id , formData , 
      {
        reportProgress : true,
        responseType : 'text',
        headers:new HttpHeaders({'Authorization': this.auth.getToken()})
      } );
    return this.http.request(req);
  }

  public getHotelById(id: number) {
    return this.http.get<Hotel>(environment.host+"/hotel/" + id);
  }

}
