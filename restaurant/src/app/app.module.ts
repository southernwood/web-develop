import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DateTimePickerModule } from 'ng-pick-datetime';
import {NgxPaginationModule} from "ngx-pagination";
import {FlashMessagesModule} from "angular2-flash-messages";

import {AppRoutingModule} from "./app-routing-module"
import {AF} from "./shared/af";
import {BookingService} from "./booking-list/booking-service"
import {TableService} from "./table-list/table.service";
import {ContactService} from "./contacts/contact.service";
import {AuthService} from "./auth/auth.service";
import {AuthGuardService} from "./auth/auth-guard.service"

import { AppComponent } from './app.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingShowComponent } from './booking-list/booking-show/booking-show.component';
import { BookingNewComponent } from './booking-list/booking-new/booking-new.component';
import { TableListComponent } from './table-list/table-list.component';
import { BookingIndexComponent } from './booking-list/booking-index/booking-index.component';
import { HeaderComponent } from './header/header.component';
import { TableItemComponent } from './table-list/table-item/table-item.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';


import {TelephonePipe,
  CapitalizePipe,
  RomanizePipe,
  FilterListPipe,
  SearchNamePipe,
  SortByTimePipe,
  SortByNamePipe,
} from "./shared/pipes.pipe";
import {DropdownDirective} from "./shared/dropdown.directive";
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './booking-list/booking-show/menu/menu.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { MainComponent } from './main/main.component'


export const  firebaseConfig = {
  apiKey: "AIzaSyDQkDR3HVhW1W5pIVyvMPKx8PwwsnsSzcA",
  authDomain: "restaurant-1defc.firebaseapp.com",
  databaseURL: "https://restaurant-1defc.firebaseio.com",
  projectId: "restaurant-1defc",
  storageBucket: "restaurant-1defc.appspot.com",
  messagingSenderId: "817836867484"
};


@NgModule({
  declarations: [
    AppComponent,
    BookingListComponent,
    BookingShowComponent,
    BookingNewComponent,
    TableListComponent,
    BookingIndexComponent,
    HeaderComponent,
    TelephonePipe,
    CapitalizePipe,
    RomanizePipe,
    TableItemComponent,
    ModalComponent,
    ContactsComponent,
    ContactItemComponent,
    FilterListPipe,
    SearchNamePipe,
    SortByTimePipe,
    SignupComponent,
    LoginComponent,
    DropdownDirective,
    AboutComponent,
    MenuComponent,
    LoadingComponent,
    MainComponent,
    SortByNamePipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DateTimePickerModule,
    NgxPaginationModule,
    FlashMessagesModule,
  ],
  providers: [AF, BookingService, TableService, ContactService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
