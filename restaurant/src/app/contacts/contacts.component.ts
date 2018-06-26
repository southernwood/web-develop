import { Component, OnInit } from '@angular/core';

import {ContactModel} from "./contact.model";
import {BookingModel} from "../booking-list/booking-model"
import {BookingService} from "../booking-list/booking-service"


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts = new Map<string, ContactModel>();
  bookingLists: BookingModel[];
  contactList: ContactModel[];
  selectedContact: ContactModel;
  searchWord: string;

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
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
        this.contactList = Array.from(this.contacts.values());
      });
  }
  onSelected(contact: ContactModel){
    if(this.selectedContact === contact){
      this.selectedContact = null;
    }else{
      this.selectedContact = contact;
    }
  }


}
