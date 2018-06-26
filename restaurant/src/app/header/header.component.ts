import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  key: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.router.navigate(['../bookings', `-K${this.key}`], {relativeTo: this.route, queryParams:{type: 'search'}});
  }
  onLogOut(){
    this.authService.logout();
    this.router.navigate(['']);
  }


}
