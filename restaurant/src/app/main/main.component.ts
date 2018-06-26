import { Component, OnInit, trigger, state, style, transition, animate,
  HostListener} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        height:'300px'
      })),
      state('middle', style({
        height: '100px'
      })),
      state('inactive', style({
        height: '100px'
      })),
      transition('active => middle', animate('3s ease-out')),
      transition('middle=>active',  animate('3s ease-in')),
      transition('inactive => middle', animate('3s ease-in')),
      transition('middle => inactive', animate('3s ease-in'))
    ])
  ]
})
export class MainComponent implements OnInit {
  flip:string;
  constructor() { }

  ngOnInit() {
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {

    if (window.scrollY > 30){
      this.flip = 'inactive';
    }else if(window.scrollY > 10){
      this.flip = 'middle';
    }else{
      this.flip = 'active';
    }
  }

}
