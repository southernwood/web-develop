import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Output
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
      this.subscription = this.shoppingListService.startedEditing
          .subscribe((index: number) =>{
            this.editMode = true;
            this.editedItemIndex = index;
            this.editedItem = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
            })
      });
      
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  onClear() {
      this.slForm.reset();
      this.editMode = false;
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode){
        this.shoppingListService.ingredientAdded(newIngredient);
    }else{
        this.shoppingListService.updateIngredient(newIngredient, this.editedItemIndex);

    }
    this.slForm.reset();
    this.editMode = false;  
  }
  onDelete() {
      this.shoppingListService.deteleIngredient(this.editedItemIndex);
      this.slForm.reset();
      this.editMode = false;
  }
}
