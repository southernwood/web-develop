import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {TableModel} from "../table-model";
import {BookingModel} from "../../booking-list/booking-model"
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";

import {dateFormat} from '../../shared/utilities';
import {TableService} from "../table.service";
import {BookingService} from "../../booking-list/booking-service"
import {AF} from "../../shared/af"

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})

export class TableItemComponent implements OnInit, OnDestroy{
  @Input() table: TableModel;
  @Input() timeChange: Subject<Date>;
  @Input() defaultTime;
  name: string;
  reserveTime;
  reserved = false;
  reserveList: BookingModel[];
  showDialog = false;
  subscription: Subscription;
  username: string;
  telephone:string;
  key: string;
  showForm = true;
  showTable = false;

  constructor(private tableService: TableService,
              private af: AF,
              private bookingService: BookingService) {

  }

  ngOnInit() {
    switch (this.table.size){
      case 2: this.name = 'Gryffindo';
        break;
      case 4: this.name = 'Hufflepuff';
        break;
      case 6: this.name = 'Ravenclaw';
        break;
      case 8: this.name ='Slytherin';
        break;
      default: this.name = 'Great Hall';
    }

    this.subscription = this.timeChange.subscribe(
      time =>{
        this.filterList(time);
        this.reserveTime = dateFormat(new Date(time)).substring(0, 16);
      }
    )
    this.reserveTime = dateFormat(new Date(this.defaultTime)).substring(0, 16);
    this.filterList(this.defaultTime);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onOver(){
    this.name = `${this.table.size} people`;
  }
  onLeave(){
    switch (this.table.size){
      case 2: this.name = 'Gryffindo';
        break;
      case 4: this.name = 'Hufflepuff';
        break;
      case 6: this.name = 'Ravenclaw';
        break;
      case 8: this.name ='Slytherin';
        break;
      default: this.name = 'Great Hall';
    }
  }
  onSubmit(){
    const booking = new BookingModel();
    booking.time = this.reserveTime;
    booking.name = this.username;
    booking.telephone = this.telephone;
    booking.size = this.table.size;
    this.af.bookings.push(this.bookingService.quickBookById(booking, this.table.id)).then(
      data =>{
        console.log(data.key);
        this.showForm = false;
        this.key = data.key;
        this.filterList(this.defaultTime);
      }
    );
  }
  filterList(time){
    this.reserveList = this.table.bookinglist.filter(booking =>{
      if(!booking) return;

      return new Date(booking.startTime).getDate() === time.getDate() && new Date(booking.endTime) >= time;
    });
    this.reserved = !(this.reserveList.length === 0);
  }

}
