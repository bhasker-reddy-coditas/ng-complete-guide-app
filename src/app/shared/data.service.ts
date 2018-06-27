import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import 'rxjs/Rx'
import { Recipe } from "../recipes/recipes.model";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataService {
    constructor(private http: Http,
        private recipeService: RecipeService,
        private slService: ShoppingListService,
        private authSrvc :AuthService
    ) { }

    saveData() {
        const token = this.authSrvc.getToken();
        const recipes = this.recipeService.getRecipes();
        const ingredients = this.slService.getIngredients();

        const recipeBookaData = {
            'recipes': recipes,
            'ingredients': ingredients
        };

        const objHeaders = new Headers({ 'Content-Type': 'application/json' })
        return this.http.put('https://ng-shop-recipe-book.firebaseio.com/recipeBookData.json?auth='+token,
            recipeBookaData,
            { headers: objHeaders });
    }

    fetchData() {
        const token = this.authSrvc.getToken();
        return this.http.get('https://ng-shop-recipe-book.firebaseio.com/recipeBookData.json?auth='+token)
            .subscribe(
                (response: Response) => {
                    const data = response.json();
                    this.recipeService.setRecipes(data['recipes']);
                }
            );
    }
}