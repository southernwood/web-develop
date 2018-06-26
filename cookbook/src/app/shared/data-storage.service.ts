import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe} from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, 
                 private recipeService: RecipeService,
                private authService: AuthService){}
    
    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put(''+token, this.recipeService.getRecipes());
    }
    
    getRecipes() {
        const token = this.authService.getToken();

        this.http.get(''+token)
            .map(
            (response: Response) =>{
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes){
                    if (!recipe['ingredients']){
                        recipe['ingredients']=[];
                    }
                }
                return recipes;
            }

        ).subscribe(
            (recipes) =>{
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
