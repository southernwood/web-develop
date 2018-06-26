import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

 	private recipes: Recipe[] = [
    	new Recipe('A Test Recipe', 
    		'This is simply a test', 
    		'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    		[new Ingredient('Meat', 1),
    		 new Ingredient('French Fires', 20)]),
    	new Recipe('Another Test Recipe', 
    		'This is simply a test', 
    		'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    		[ 
    			new Ingredient('Buns', 2),
    			new Ingredient('Meat', 1)
    		])
  	];
  	constructor(private shoppingListService : ShoppingListService) {}

  	getRecipes() {
  		return this.recipes.slice();
  	}
  	addIngredeintsToShoppingList(ingredients: Ingredient[]){
  		this.shoppingListService.ingrdeintsListAdded(ingredients);
  	}
    getRecipe(index: number) {
      return this.recipes[index];
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}