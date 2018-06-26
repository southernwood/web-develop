import {BookingModel} from "../booking-list/booking-model";

export class  ContactModel{
  name: string;
  telephone: string;
  bookings: BookingModel[];
  constructor(name: string, telephone: string){
    this.name = name;
    this.telephone = telephone;
    this.bookings = [];
  }
}
