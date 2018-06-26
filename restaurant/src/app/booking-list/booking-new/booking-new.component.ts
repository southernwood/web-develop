import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup,
  FormControl,
  FormArray,
  Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router"

import {BookingService} from "../booking-service";
import {AF} from "../../shared/af";
import {validateTime} from "../time-validator"
import {dateFormat} from '../../shared/utilities';
import {Interval} from "../../table-list/table-model";
import {BookingModel} from "../booking-model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-booking-new',
  templateUrl: './booking-new.component.html',
  styleUrls: ['./booking-new.component.css']
})
export class BookingNewComponent implements OnInit, OnDestroy {
  id: string;
  bookingForm: FormGroup;
  editMode = false;
  timeSlots: Interval[];
  infoTips:string;
  oldBooking: BookingModel;
  constructor(private bookingService: BookingService,
              private af: AF,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
  ngOnDestroy(){}

  onSubmit(){
    if (this.editMode){
      let newBooking = this.bookingService.updateBookingByTimeAndId(this.oldBooking.startTime, this.oldBooking.tableId, this.bookingForm.value);
      if (newBooking){
        this.af.bookings.update(this.id, newBooking).then(
          data =>{
            // console.log("update your reservation");
            // console.log(data);
            this.router.navigate(['../../', this.id], {relativeTo: this.route, queryParams:{type: 'update'}});
          }
        )
      }else{
        this.infoTips = "Sorry for the inconvenience, we're full at that time. You may pick the time in the following ranges or cancel your reservation";
        this.bookingService.quickBookById(this.oldBooking, this.oldBooking.tableId);
        this.findAvailableTimeSlots();
      }
    }else{
     // console.log("booking-new: try to add a booking");
      let booking = this.bookingService.addABooking(this.bookingForm.value);
      if (booking){
        this.af.bookings.push(booking).then(data =>{
        //  console.log("successfully store the data on the firebase");
        //  console.log("the key is "+ data.key);
          booking.key = data.key;
          this.router.navigate(['../', booking.key], {relativeTo: this.route, queryParams:{type: 'new'}});
        })
      }else{
        this.infoTips = "Sorry for the inconvenience, we're full at that time. You may pick the time in the following ranges or choose another date.";
        this.findAvailableTimeSlots();
      }
    }
  }
  onCancel(){
    this.location.back();
  }
  private initForm() {
    let name = '';
    let startTime = dateFormat(new Date(Date.now()+1000*3600*0.5)).substring(0, 16);
    console.log(startTime);
    let endTime = '';
    let size = '';
    let telephone = '';
    this.bookingForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'time': new FormControl(startTime, [Validators.required, validateTime]),
      'size': new FormControl(size, [Validators.required, Validators.min(1)]),
      'telephone': new FormControl(telephone, [Validators.required, Validators.pattern("^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$")]),
    });
    if (this.editMode) {
      this.bookingService.getAbooking(this.id).subscribe(
        data =>{
          this.oldBooking = data;
          this.bookingForm.patchValue(data);
        }
      )
    }
  }

  findAvailableTimeSlots(){
    this.timeSlots = null;
    if (this.bookingForm.controls['time'].valid && this.bookingForm.controls['size'].valid){
      let size = this.bookingForm.controls['size'].value;
      let date = new Date(this.bookingForm.controls['time'].value);
      this.timeSlots = this.bookingService.findAvailabeTimeSlots(size, date);
    }
  }
}
