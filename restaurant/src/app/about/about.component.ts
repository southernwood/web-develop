import { Component, ElementRef,OnInit } from '@angular/core';
import {HostListener} from "@angular/core";
import {RestaurantModel} from "./restaurant.model";
import {AF} from "../shared/af";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private elementRef: ElementRef,
              private af: AF,
              private authService: AuthService) { }
  sliderImages: any[];
  restaurant: RestaurantModel;
  editMode = false;
  authenticated = false;
  loading = true;
  ngOnInit() {
    this.sliderImages = this.elementRef.nativeElement.querySelectorAll('.slide-in');
    this.restaurant = new RestaurantModel;
    this.restaurant.name = 'Magical House';
    this.restaurant.owners = 'Ellie';
    this.restaurant.telephone = '3142343412';
    this.restaurant.locations = "Platform 9¾, King's Cross Station" ;
    this.authenticated = this.authService.isAuthenticated();
    this.af.getUserInfo().subscribe(
        data=>{
          this.restaurant = data.json();
          this.loading = false;
        }
    )
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.checkSlide();
  }
  onEdit(){
    this.editMode = true;
  }
  onSave(){
    this.editMode = false;
    if(this.authenticated){
      this.af.storeUserInfo(this.restaurant);
    }
  }

  checkSlide() {
   this.sliderImages.forEach(sliderImage => {
      // half way through the image
      const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
      // bottom of the image
      const imageBottom = sliderImage.offsetTop + sliderImage.height;
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active');
      } else {
        sliderImage.classList.remove('active');
      }
    });
  }
}
