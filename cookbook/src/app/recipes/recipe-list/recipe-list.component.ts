import { Component, OnInit, Output,  OnDestroy} from '@angular/core';
import {　Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
  				private router: Router,
  				private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
        (recipes: Recipe[])=>{
            this.recipes = recipes;
        }
    
    );
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  onAddNewRecipe(){
  	this.router.navigate(['new'], {relativeTo: this.route});

  }
}
