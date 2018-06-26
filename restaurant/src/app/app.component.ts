import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){
  }
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDQkDR3HVhW1W5pIVyvMPKx8PwwsnsSzcA",
      authDomain: "restaurant-1defc.firebaseapp.com",
        databaseURL: "https://restaurant-1defc.firebaseio.com",
        projectId: "restaurant-1defc",
        storageBucket: "restaurant-1defc.appspot.com",
        messagingSenderId: "817836867484"
    }
    )
  }
}
