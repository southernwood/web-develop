import {BookingModel} from "./booking-model";
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";

import {TableService} from "../table-list/table.service"
import {AF} from '../shared/af';
import {FlashMessagesService} from "angular2-flash-messages"

@Injectable()

export class BookingService{

  constructor(private  af: AF,
              private tableService: TableService,
              private flashMessageService: FlashMessagesService){
  };

  addABooking(booking: BookingModel){
    booking.startTime = (new Date(booking.time)).getTime();
    booking.endTime = booking.startTime + 2*3600*1000;
    let tableId = this.tableService.bookATable(booking);
    if (tableId){
      booking.tableId = tableId;
      this.af.storeTablesOnDB();
      return booking;
    }else{
      // this.flashMessageService.show("Sorry we can't find a table for you, please try another time",{cssClass: 'alert alert-danger', timeout: 5000});
      // console.log("booking-service: can't find a table for you, please try another time");
      return null;
    }
  }
  findAvailabeTimeSlots(size: number, date: Date){
    return this.tableService.findAvailableTimeSlots(size, date).filter(slot=>{
      return slot.endTime -  slot.startTime > 2*3600*1000;
    });
  }
  getAbooking(key: string){
    return this.af.queryBooking(key);
  }
  getALLBookings(){
    return this.af.queryAllBooking();
  }
  cancelBookingByKey(code: string){
    let key = code;
    let booking = this.af.queryBooking(key).subscribe(
      (data) =>{
        if (data.$value !== null){
          let time = data.startTime;
          let id = data.tableId;
          this.tableService.cancelTheTableByIdAndTime(time, id);
          this.af.bookings.remove(key).then(
            res=>{
              this.flashMessageService.show("successfully delete the reservation",{cssClass: 'alert alert-info', timeout: 3000});
              console.log("bookingService: successfully delete the reservation");
              this.af.storeTablesOnDB();
            }
          );
        }
      }, error =>{
        this.flashMessageService.show("Serve Down!! please try later",{cssClass: 'alert alert-danger', timeout: 3000});
      }
    );
  }
  updateBookingByTimeAndId(time: number, id: number, newBooking: BookingModel){
    this.tableService.cancelTheTableByIdAndTime(time, id);
    return this.addABooking(newBooking);
  }
  quickBookById(booking: BookingModel, tableId: number){
    booking.startTime = (new Date(booking.time)).getTime();
    booking.endTime = booking.startTime + 2*3600*1000;
    this.tableService.bookTableByTableId(booking, tableId);
    booking.tableId = tableId;
    this.af.storeTablesOnDB();
    return booking;
  }

}
