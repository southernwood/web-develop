import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientAdded (ingredient: Ingredient) {
  	this.ingredients.push(ingredient);
  	this.ingredientsChanged.next(this.ingredients.slice());
  }
  ingrdeintsListAdded(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  getIngredients() {
  	return this.ingredients.slice();
  }
  getIngredient(index: number) {
      return this.ingredients[index];
  }
  
  updateIngredient(ingredient:Ingredient, index: number) {
      this.ingredients[index] = ingredient;
      this.ingredientsChanged.next(this.ingredients.slice());
  }
  deteleIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
  }
}