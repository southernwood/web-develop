import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

import {TableModel, Interval} from "./table-model"
import {BookingModel} from "../booking-list/booking-model";

@Injectable()

export class TableService {
  tablesChanged = new Subject<TableModel[]>();

  private tables: TableModel[] = [];
  constructor() {
    // for(let i = 1; i < 6; ++i){
    //   this.tables.push(new TableModel(2, i));
    // }
    // for(let i = 6; i < 16; ++i){
    //   this.tables.push(new TableModel(4, i));
    // }
    // for(let i = 16; i < 22; ++i){
    //   this.tables.push(new TableModel(6, i));
    // }
    // for(let i = 22; i < 29; ++i){
    //   this.tables.push(new TableModel(8, i));
    // }
    // for(let i = 29; i <= 30; ++i){
    //   this.tables.push(new TableModel(99, i));
    // }
  }
  getTables(){
    return this.tables.slice();
  }
  setTables(tables: TableModel[]){
     this.tables = tables;
     this.tablesChanged.next(this.tables.slice());
  }

  bookATable(booking: BookingModel){
    const table = this.findATable(booking.size, booking.startTime, booking.endTime);
    if (table){
      console.log("Table service: find a table for this reservation: " + table.id);
      this.bookTableByTableId(booking, table.id);
      return table.id;
    }else{
      console.log("cannot find an available table");
      return false;
    }

  }
  findATable(size: number, startTime: number, endTime){
    let table = this.tables.find(table => {
      if (table.size < size){
        return false;
      }else{
        return table.bookinglist.every(timeTable =>{
          return timeTable.startTime > endTime || timeTable.endTime < startTime;
        })
      }
    });
    return table;
  }
  findAvailableTime(table: TableModel, date: Date): Interval[]{
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    let hours = 3600*1000;
    let open = Math.max(day+ 11*hours, Date.now());
    let close = day + 23*hours;
    const availableTime = [];
    table.bookinglist.map(booking =>{
      if (booking.startTime > close|| booking.endTime < open) return;
      availableTime.push(new Interval(open, Math.max(open, booking.startTime-2*hours)));
      open = booking.endTime;
    });
    availableTime.push(new Interval(open, close));
    // console.log('table: ', table.id);
    // console.log(availableTime);
    return availableTime;
  }
  mergeInterval(availableTimelist: Interval[]): Interval[]{
    if (availableTimelist.length === 0) return availableTimelist;
    availableTimelist.sort((a, b)=>{
      return a.startTime - b.startTime;
    });
    const res = [];
    availableTimelist.map(availableTime=>{
      if (res.length === 0 || availableTime.startTime > res[res.length-1].endTime){
        res.push(availableTime);
      }else{
        res[res.length-1].endTime = Math.max(availableTime.endTime, res[res.length-1].endTime);
      }
    });
    return res;
  }
  findAvailableTimeSlots(size: number, date: Date){
    let availableTimeList = [];
    this.tables.filter(table => table.size >= size).map(table =>{
      availableTimeList = availableTimeList.concat(this.findAvailableTime(table, date));
    });
   // console.log(availableTimeList);
    availableTimeList = this.mergeInterval(availableTimeList);
    // console.log(availableTimeList);
    return availableTimeList;
  }

  bookTableByTableId(booking: BookingModel, tableId: number){
    let idx = 0;
    let table = this.tables[tableId-1];
    while (idx < table.bookinglist.length && table.bookinglist[idx] && table.bookinglist[idx].endTime < booking.startTime){
      idx++;
    }
    table.bookinglist.splice(idx, 0, booking);
    this.tablesChanged.next(this.tables.slice());
  }

  cancelTheTableByIdAndTime(time: number, id: number) {
    let index = this.tables[id-1].bookinglist.findIndex(e =>{
      return e.startTime === time;
    });
    if (index === -1) return;
    this.tables[id-1].bookinglist.splice(index, 1);
    this.tablesChanged.next(this.tables.slice());
  }


}
