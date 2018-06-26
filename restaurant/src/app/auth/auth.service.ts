import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages"
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;
  constructor(private router: Router, private flashMessageService: FlashMessagesService) { }
  signupUser(email: string, password: string){
    console.log("try to sign up a new user")
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  signinUser(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password).then(
      res=>{
        this.router.navigate(['/bookings']);
        firebase.auth().currentUser.getToken().then(
          (token:string) =>{
            this.token = token;
          }
        )
      }
    )
  }
  isAuthenticated(){
    return this.token != null;
  }
  logout(){
    firebase.auth().signOut();
    this.flashMessageService.show("Log out", {cssClass:'alert alert-success', timeout: 1000});
    this.token = null;
  }
  getToken(){
    firebase.auth().currentUser.getToken().then(token=>{
      this.token = token;
    });
    return this.token;
  }
}
