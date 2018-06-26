import {Injectable} from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Http, Response} from "@angular/http";
import {TableModel} from "../table-list/table-model"
import 'rxjs/Rx';

import {BookingModel} from "../booking-list/booking-model";
import {RestaurantModel} from "../about/restaurant.model";
import {TableService} from "../table-list/table.service";
import {AuthService} from "../auth/auth.service";

const TABLE_URL = 'https://restaurant-1defc.firebaseio.com/tables.json';
const USERS_URL = 'https://restaurant-1defc.firebaseio.com/users.json';

@Injectable()
export class AF {
  public bookings: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase,
              private tableService: TableService,
              private http: Http,
              private authService: AuthService) {
    this.bookings = this.db.list('/bookings');
    this.getTablesFromDB();
  }
  queryBooking(key: string){
    return this.db.object('/bookings/'+key);
  }
  storeTablesOnDB(){
    console.log("af serve: try to store tables on serves");
    this.http.put(TABLE_URL, JSON.stringify(this.tableService.getTables())).subscribe();
  }
  getTablesFromDB(){
    this.http.get(TABLE_URL).map(
      (res: Response) =>{
        const tables: TableModel[] = res.json();
        for (let table of tables){
          if(!table['bookinglist']){
            table['bookinglist'] = []
          }
        }
        return tables
      }
    ).subscribe(tables =>{
      console.log("successfully query the tables from DB");
      this.tableService.setTables(tables);
    })
  };
  queryAllBooking(){
    return this.bookings.map(res =>{
      const bookings: BookingModel[] =[];
      res.map(data =>{
        data.key = data.$key;
        bookings.push(data);
      })
      return bookings;
    });
  }
  getUserInfo(){
    return this.http.get(USERS_URL);
  }
  storeUserInfo(info: RestaurantModel){
    const token = this.authService.getToken();
    this.http.put(USERS_URL+"?auth="+token, JSON.stringify(info)).subscribe(res=>{
    });
  }

}
