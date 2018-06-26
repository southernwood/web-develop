import {NgModule} from "@angular/core";
import {Routes,  RouterModule} from "@angular/router"

import { AppComponent } from './app.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingShowComponent } from './booking-list/booking-show/booking-show.component';
import { BookingNewComponent } from './booking-list/booking-new/booking-new.component';
import { TableListComponent } from './table-list/table-list.component';
import { BookingIndexComponent} from "./booking-list/booking-index/booking-index.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {AboutComponent} from "./about/about.component"
import {MainComponent} from "./main/main.component"

const appRoutes: Routes = [
  {path: '', redirectTo: '/bookings/new', pathMatch:'full'},
  {path:'bookings', component: BookingListComponent, children:[
    {path: 'new', component: BookingNewComponent},
    {path:'', component: BookingIndexComponent, canActivate:[AuthGuardService]},
    {path: ':id', component: BookingShowComponent},
    {path: ':id/edit', component: BookingNewComponent}
  ]},
  {path:'tables', component:TableListComponent, canActivate:[AuthGuardService]},
  {path:'contacts', component:ContactsComponent, canActivate:[AuthGuardService]},
  {path:"login", component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path:'about', component:AboutComponent},
  {path:'main', component:MainComponent}
]

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})

export class AppRoutingModule{

}
