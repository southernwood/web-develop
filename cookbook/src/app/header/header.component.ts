import { Component, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
    
   constructor(private dataStorageService: DataStorageService,
               private authService: AuthService) {}
   onSave(){
       this.dataStorageService.storeRecipes().subscribe(
           (resonse: Response) => {
                console.log(resonse);
           }
       
       );
   }
  onGet() {
      this.dataStorageService.getRecipes();
  }
  onLogOut(){
      this.authService.logout();
  }
}
