import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {BookingService} from "../booking-service"
import {Location} from "@angular/common";
import {BookingModel} from "../booking-model";

@Component({
  selector: 'app-booking-show',
  templateUrl: './booking-show.component.html',
  styleUrls: ['./booking-show.component.css']
})
export class BookingShowComponent implements OnInit {
  booking: BookingModel;
  successMode = false;
  searchMode = true;
  updateMode = false;
  showDialog = false;
  key: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookingService: BookingService,
              private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.key = params['id'];
        this.bookingService.getAbooking(this.key).subscribe(
          (data) =>{
            if (data.$value !== null){
              this.booking = data;
            }else{
              console.log("sorry, can't find your reservation, please ");
            }
          }, error =>{
            console.log("server down, please try again later");
          }
        );
      }
    );
    this.route.queryParams.subscribe(
      (queryParams) =>{
        if (queryParams['type'] === "new"){
          this.successMode = true;
          this.searchMode = false;
          this.updateMode = false;
        }else if(queryParams['type'] === 'search'){
          this.searchMode = true;
          this.successMode = false;
          this.updateMode = false;
        }else if(queryParams['type'] === 'update'){
          this.updateMode = true;
          this.searchMode = false;
          this.successMode = false;
        }
      }
    );
    window.scrollTo(0, 0)
  }

  copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';

    textArea.style.width = '2em';
    textArea.style.height = '2em';

    textArea.style.padding = '0';

    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  }
  onDelete(key: string){
    this.bookingService.cancelBookingByKey(key);
    this.showDialog = false;
    this.router.navigate(['../'], {relativeTo: this.route});

  }
  onEdit(key: string){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onShowDialog(){
    this.showDialog = true;
  }
  onCancel(){
    this.location.back();
  }
}
