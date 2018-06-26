import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,
  NgForm,
  Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router"
import {FlashMessagesService} from "angular2-flash-messages"
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorTip: string;
  successTip: string;
  constructor(private authService: AuthService,
              private router: Router,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.successTip = "";
  }
  onSubmit(f:NgForm){
    console.log(f.value);
    const email = f.value.email;
    const password = f.value.password;
    const confirm = f.value.confirm;
    if (password !== confirm){
      this.errorTip = "password does not match";
      return;
    }
    this.authService.signupUser(email, password).then(
      res=> {
        this.successTip = "successfully create a new account, please login in";
        this.errorTip = "";
        this.flashMessagesService.show("successfully create a new account, please login in", {cssClass:'alert alert-success'})
        this.router.navigate(['/login']);
      }
    ).catch(
      error=>{
        this.errorTip = error.message;
      }
    )
  }
}
