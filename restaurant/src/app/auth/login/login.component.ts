import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {FlashMessagesService} from "angular2-flash-messages"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorTip: string;

  constructor(private authService: AuthService,
              private  flashMessageService: FlashMessagesService) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    this.authService.signinUser(form.value.email, form.value.password).catch(
      (error)=>{
        this.errorTip = error.message;
      }
    ).then(()=>this.flashMessageService.show("Successfully login", {cssClass:'alert alert-success', timeout:1000}));
  }

}
