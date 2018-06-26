import {BookingModel} from "../booking-list/booking-model"
export class TableModel{
  public size: number;
  public id: number;
  public bookinglist: BookingModel[];
  constructor(size: number, id: number){
    this.id = id;
    this.size = size;
    this.bookinglist = [];
  }
}


export class Interval{
  startTime: number;
  endTime: number;
  constructor(startTime, endTime){
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
