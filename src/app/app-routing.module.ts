import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { UserGuard } from './components/user.guard';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';

const routes: Routes = [
  { path: 'hotels/:ca', component: HotelsComponent},
  { path : 'login' , component : LoginoutComponent},
  { path : 'hotel-form', component: HotelFormComponent, canActivate : [UserGuard] },
    { path : 'hotel-form/:id', component: HotelFormComponent, canActivate : [UserGuard] },
  { path : 'hotel/:id' , component : HotelComponent},
  { path : '' , redirectTo : 'hotels/0', pathMatch : 'full' },
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
