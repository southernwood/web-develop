import { Pipe, PipeTransform } from '@angular/core';
import {BookingModel} from "../booking-list/booking-model";

@Pipe({name: 'telephone'})
export class TelephonePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    if (value.length === 10) {
      return "("+value.substring(0,3)+") "+value.substring(3, 6)+'-'+value.substring(6);
    }
    return value[0]+ "("+value.substring(1,3)+") "+value.substring(4, 7)+'-'+value.substring(7);
  }
}

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    return value.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
@Pipe({name: 'roman'})

export class RomanizePipe implements PipeTransform{
  transform(value: number, args: string[]): any {
    if (!value)
      return false;
    var digits = String(value).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
        "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
        "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }
}

@Pipe ({name: 'filterList'})
export class FilterListPipe implements PipeTransform{
  transform(bookings: BookingModel[], arg: string): any{
    if (!bookings) return;
    if (arg === 'all'){
      return bookings;
    }
    const time = new Date();
    if (arg === 'today'){

      return bookings.filter(booking =>{
        return new Date(booking.startTime).getDate() === time.getDate() && new Date(booking.endTime) >= time;
      });
    }
    return bookings.filter(booking =>{
      return booking.endTime > time.getTime();
    });
  }
}

@Pipe({name: 'searchName'})
export class SearchNamePipe implements PipeTransform{
  transform(items: any[], arg: string): any{
    if(!items || !arg) return items;
    return items.filter( item =>{
      return item.name.toUpperCase().indexOf(arg.toUpperCase()) !== -1;
    })
  }
}

@Pipe({name:'sortByTime'})
export class SortByTimePipe implements PipeTransform{
  transform(items: any[]):any{
    if(!items) return items;
    return items.sort((a, b)=> a.startTime - b.startTime);
  }
}

@Pipe({name: 'sortByName'})
export class SortByNamePipe implements PipeTransform{
  transform(items: any[]): any[]{
    if (!items) return items;
    return items.sort((a, b)=> {
      return a.name.toUpperCase() > b.name.toUpperCase()? 1:-1;
    });
  }
}
