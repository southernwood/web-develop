import {Component, Input, OnInit} from '@angular/core';
import {BookingModel} from "../../booking-list/booking-model";
import {ContactModel} from "../contact.model";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

export class ContactItemComponent implements OnInit {
 @Input() contact:ContactModel;
  constructor() { }

  ngOnInit() {
  }

}
