import { Injectable, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {ContactModel} from "./contact.model";
import {BookingModel} from "../booking-list/booking-model"

import {BookingService} from "../booking-list/booking-service"
@Injectable()
export class ContactService{
  bookingLists: BookingModel[];

  contacts = new Map<string, ContactModel>();
  constructor(private bookingService: BookingService) {
    this.bookingService.getALLBookings().subscribe(
      data =>{
        this.bookingLists = data;
        this.bookingLists.map(booking =>{
          if (this.contacts.has(booking.telephone)){
            this.contacts.get(booking.telephone).bookings.push(booking);
          }else{
            const contact = new ContactModel(booking.name, booking.telephone);
            contact.bookings.push(booking);
            this.contacts.set(booking.telephone, contact);
          }
        });
      });
  }
  getContacts(){
    return new Map(this.contacts);
  }

}
