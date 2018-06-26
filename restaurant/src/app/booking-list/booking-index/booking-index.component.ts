import { Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";

import {BookingService} from "../booking-service";
import {BookingModel} from "../booking-model";


@Component({
  selector: 'app-booking-index',
  templateUrl: './booking-index.component.html',
  styleUrls: ['./booking-index.component.css']
})
export class BookingIndexComponent implements OnInit, OnDestroy {
  bookings: BookingModel[];
  option = 'unfinished';
  searchWord: string;
  p = 1;
  selectedBooking: BookingModel;
  showDialog = false;
  constructor(private bookingService: BookingService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
   this.bookingService.getALLBookings().subscribe(data =>{
     this.bookings = data;
   });
  }
  onDelete(key: string){
    console.log("try to delete a booking");
    this.bookingService.cancelBookingByKey(key);
    this.showDialog = false;
    this.selectedBooking = null;
  }
  onEdit(key: string){
    console.log("try to edit a booking");
    this.router.navigate([key + '/edit'], {relativeTo: this.route});
  }
  onChange(change){
    this.option = change;
  }
  onShowDialog(booking: BookingModel){
    this.showDialog = true;
    this.selectedBooking = booking;
  }
  ngOnDestroy(){
 }


}
