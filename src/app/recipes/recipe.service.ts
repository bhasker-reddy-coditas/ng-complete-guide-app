import { Recipe } from './recipes.model';
import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { DataService} from '../shared/data.service'
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService implements OnInit {

    recipeChanged = new Subject<Recipe[]>();
    constructor(private slService: ShoppingListService) { }

    ngOnInit(){
    
    }
    private recipes: Recipe[] = [
        new Recipe('Test Recipe',
            'This is a Test',
            'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F200609-r-xl-chocolate-truffle-layer-cake.jpg%3Fitok%3D7yyQdS_3&w=800&q=85',
            [
                new Ingredient('Bread', 1),
                new Ingredient('Meat', 2),
            ]),
        new Recipe('Test Recipe 1',
            'This is a Test Recipe',
            'https://www.howtocookthat.net/public_html/wp-content/uploads/2013/07/IMG_5481-550x412.jpg?x19907',
            [
                new Ingredient('Bun', 2),
                new Ingredient('French Fries', 20),
            ])
    ];

    setRecipes(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
     
    getRecipes() {
        return this.recipes.slice(); //will return a copy
    }
    getRecipeById(index: number): Recipe {
        return this.recipes.slice()[index];
    }

    addIngredients(ingredients: Ingredient[]) {
        this.slService.addMultipleIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index :number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}